import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { LandingPageContent } from './types';
import { FAQAccordion } from './FAQAccordion';
import DeveloperAvatars from '../components/DeveloperAvatars';

// Import content
const content: LandingPageContent = require('../data/landingPageContent.json') as LandingPageContent;

if (!content) {
  throw new Error('Content data not found');
}

if (!content.faq) {
  throw new Error('FAQ section not found in content');
}

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

function Page() {
  return (
    <>
      {/* Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between absolute top-0 left-0 z-20">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#181e21"/><path d="M10 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-8v16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="font-bold text-lg text-gray-900">Finwise</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-700 hover:text-black font-medium">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-black font-medium">Pricing</a>
          <a href="#" className="ml-4 px-6 py-2 bg-navy-800 hover:bg-navy-900 rounded-full font-semibold text-white transition">Try it now</a>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-40 pb-0 px-5 min-h-[600px] bg-white overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 -z-10 bg-white" />
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="bg-white/95 rounded-2xl px-4 md:px-12 py-8 md:py-12 shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 mb-4">
              {content.hero.heading}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
              {content.hero.subheading}
            </p>
            <div className="flex justify-center mb-10">
              <a href="#" className="bg-navy-800 hover:bg-navy-900 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-colors">
                Try it now
              </a>
            </div>
          </div>
          <Image
            src={content.hero.centerImage.src}
            width={content.hero.centerImage.width}
            height={content.hero.centerImage.height}
            quality={100}
            sizes="(max-width: 768px) 100vw, 384px"
            unoptimized={true}
            alt={content.hero.centerImage.alt}
            className="relative mt-4 md:mt-8 mx-auto z-10 drop-shadow-xl"
          />
        </div>
      </section>


      {/* Rating Section with Developer Avatars */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
            {/* Developer Avatars - Left Side */}
            <div className="w-full md:w-2/3">
              <DeveloperAvatars />
            </div>
            
            {/* Rating Badge - Right Side */}
            <div className="w-full md:w-1/3 flex justify-end mt-6 md:mt-0">
              <div className="flex items-center">
                {/* Circle with Rating */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                  4.6
                </div>
                
                {/* Rectangle with Stars */}
                <div className="h-16 pl-6 pr-6 -ml-3 flex flex-col justify-center bg-white rounded-r-full shadow-md">
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs">Based on 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.benefits.title}
          </h2>
          <div className="flex flex-col gap-20">
            {content.benefits.features.map((feature: typeof content.benefits.features[0], index: number) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-10 ${feature.side === 'left' && 'md:flex-row-reverse'}`}>
                <div className="flex-1 flex justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-[420px] md:w-[480px] rounded-2xl shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="mb-6 text-lg text-gray-600">{feature.description}</p>
                  <ul className="space-y-4">
                    {feature.subfeatures && feature.subfeatures.map((sub: {title: string; description: string}, subIdx: number) => (
                      <li key={subIdx} className="flex items-start gap-3">
                        <span className="mt-1 text-navy-800">
                          {/* Icon bullet (can be replaced with a better icon) */}
                          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#001f3f" strokeWidth="2" fill="#e6f0ff"/><path d="M7 10.5l2 2 4-4" stroke="#001f3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span>
                          <span className="font-semibold text-base text-gray-900">{sub.title}</span>
                          <br />
                          <span className="text-gray-600 text-sm">{sub.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            {content.pricing.title}
          </h2>
          <p className="text-md text-center mb-12 text-gray-600">
            {content.pricing.description}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.pricing.plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-2 text-left w-full">{plan.name}</h3>
                <div className="flex items-end mb-6 w-full">
                  <span className={`text-4xl font-extrabold mr-1 ${plan.name === 'Starter' ? 'text-blue-600' : 'text-gray-900'}`}>{plan.price.replace('/month','')}</span>
                  <span className="text-lg text-gray-500 mb-1">/mo</span>
                </div>
                <button
                  className={`mb-8 w-full py-3 rounded-full font-semibold transition-all ${plan.name === 'Starter' ? 'bg-navy-800 hover:bg-navy-900 text-white' : 'bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50'}`}
                >
                  Get Started
                </button>
                <div className="text-left w-full">
                  <div className="font-bold text-sm mb-1">FEATURES</div>
                  {index === 1 && (
                    <div className="mb-2 text-xs text-gray-600">Everything in basic, plus...</div>
                  )}
                  <ul className="space-y-3 mt-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-base text-gray-700">
                        <svg className="mr-2 flex-shrink-0" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#001f3f" strokeWidth="2" fill="#e6f0ff"/><path d="M7 10.5l2 2 4-4" stroke="#001f3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {content.stats.stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-lg">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 bg-[radial-gradient(circle,rgba(30,41,59,0.95)_0%,rgba(23,23,23,0.92)_100%)] relative overflow-hidden" style={{backgroundColor:'#181e21'}}>
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{backgroundImage:'linear-gradient(to right,rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.06) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {content.cta.title}
              </h2>
              <p className="text-lg mb-8 text-white">
                {content.cta.description}
              </p>
              <a href="#" className="bg-navy-800 hover:bg-navy-900 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-colors">
                Try it now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Heading and Contact */}
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-bold mb-4">{content.faq.title}</h2>
            </div>
            {/* Right: Accordion */}
            <FAQAccordion faqs={content.faq.questions} />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                {content.footer.menu.products.map((item) => (
                  <li key={item.title}>
                    <Link href={item.link} className="hover:text-gray-400">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <div className="flex space-x-4">
                <a href={content.footer.social.twitter} className="hover:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-600 rounded-full flex-shrink-0"></span>
                    Twitter
                  </div>
                </a>
                <a href={content.footer.social.facebook} className="hover:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-600 rounded-full flex-shrink-0"></span>
                    Facebook
                  </div>
                </a>
                <a href={content.footer.social.linkedin} className="hover:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-600 rounded-full flex-shrink-0"></span>
                    LinkedIn
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            {content.footer.copyright}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Page;
