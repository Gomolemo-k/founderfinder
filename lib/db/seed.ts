import { getStripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function upsertProductWithPrice({
  name,
  description,
  unitAmount,
  currency = 'usd',
  interval = 'month',
  trialPeriodDays = 7,
}: {
  name: string;
  description: string;
  unitAmount: number;
  currency?: string;
  interval?: 'day' | 'week' | 'month' | 'year';
  trialPeriodDays?: number;
}) {
  const stripe = getStripe();

  // 1. Look up product by name
  const existingProducts = await stripe.products.list({ limit: 100, active: true });
  let product = existingProducts.data.find((p) => p.name === name);

  if (!product) {
    product = await stripe.products.create({ name, description });
    console.log(`✅ Created product: ${name}`);
  } else {
    console.log(`ℹ️ Product already exists: ${name}`);
  }

  // 2. Look up price for this product
  const prices = await stripe.prices.list({ product: product.id, active: true });
  let price = prices.data.find(
    (p) =>
      p.unit_amount === unitAmount &&
      p.currency === currency &&
      p.recurring?.interval === interval
  );

  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency,
      recurring: { interval, trial_period_days: trialPeriodDays },
    });
    console.log(`✅ Created price for product ${name}: $${unitAmount / 100}/${interval}`);
  } else {
    console.log(`ℹ️ Price already exists for ${name}: $${price.unit_amount! / 100}/${interval}`);
  }

  return { product, price };
}

async function seed() {
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  // Ensure test user exists
  const [user] = await db
    .insert(users)
    .values([{ email, passwordHash, role: 'owner' }])
    .onConflictDoNothing()
    .returning();

  if (user) {
    console.log('✅ Initial user created.');
  } else {
    console.log('ℹ️ Initial user already exists.');
  }

  // Ensure test team exists
  const [team] = await db
    .insert(teams)
    .values({ name: 'Test Team' })
    .onConflictDoNothing()
    .returning();

  if (team) {
    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: user.id,
      role: 'owner',
    });
    console.log('✅ Test team created and linked to user.');
  } else {
    console.log('ℹ️ Test team already exists.');
  }

  // Upsert Stripe products + prices
  await upsertProductWithPrice({
    name: 'Base',
    description: 'Base subscription plan',
    unitAmount: 800, // $8
  });

  await upsertProductWithPrice({
    name: 'Plus',
    description: 'Plus subscription plan',
    unitAmount: 1200, // $12
  });

  console.log('🎉 Seed completed successfully.');
}

seed()
  .catch((error) => {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
