/**
 * StructuredData Component
 * Provides JSON-LD schema markup for SEO
 */

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Norvan Intelligence",
    "url": "https://norvan.io",
    "logo": "https://norweb-fnb.norvan.io/images/norvan_logo_only.svg",
    "description": "AI transformation company specializing in restaurant automation",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "UAE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@norvan.io",
      "contactType": "sales"
    },
    "sameAs": [
      "https://www.linkedin.com/company/norvanintel",
      "https://twitter.com/norvanintel"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NorWeb FnB",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, WhatsApp, Voice",
    "description": "Malaysia's first AI marketing department for restaurants. Campaigns, customer nurturing, reputation management — running 24/7. What agencies charge RM5,000-10,000/month for. 90-day ROI guarantee.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "299",
      "highPrice": "799",
      "priceCurrency": "MYR",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50"
    },
    "featureList": [
      "Marketing Automation Engine",
      "Campaign Creation & Scheduling",
      "Social Media Automation",
      "Customer Win-Back Campaigns",
      "Reputation & Review Management",
      "AI-Powered Website (mobile-first)",
      "Voice AI Agents (Nova, Aiman, Marco, Dev)",
      "24/7 Phone Call Answering",
      "WhatsApp Automation",
      "Automated Reservations & Bookings",
      "Advanced Lead Nurturing",
      "Marketing Analytics Dashboard",
      "POS Integration",
      "7-Day Setup"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "I'm not technical at all. Can I actually use this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "That's exactly why we built it this way. You don't operate NorWeb — it operates for you. After setup (which we handle completely), you just check your dashboard occasionally. If you can read a WhatsApp message, you can use NorWeb."
        }
      },
      {
        "@type": "Question",
        "name": "Will this work with my current POS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. NorWeb is POS-agnostic. We don't replace your transaction system — we handle marketing, which your POS doesn't do. They work together, not against each other. Whatever POS you use, NorWeb sits on top."
        }
      },
      {
        "@type": "Question",
        "name": "How long does setup take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "7 days from sign-up to live. We do the heavy lifting: building your website, training the AI on your menu and policies, setting up automations. You just answer some questions about your restaurant and approve the final result."
        }
      },
      {
        "@type": "Question",
        "name": "What if I don't like it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancel anytime. No lock-in contracts. We also offer a 30-day satisfaction guarantee — if you're not seeing value, we'll make it right or refund you. We're not here to trap you. We earn your business every month."
        }
      },
      {
        "@type": "Question",
        "name": "Is the voice AI actually good? Or robotic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Talk to Nova right now. The button is on this page. That's your answer. Our AI uses advanced voice technology trained specifically for restaurant conversations. Most customers don't realize they're talking to AI until the booking is confirmed instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to do anything after setup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check your dashboard. See your bookings. That's it. The AI handles customer inquiries 24/7. If you have menu changes or new promotions, just tell us — we'll update the system. Otherwise, it runs itself."
        }
      },
      {
        "@type": "Question",
        "name": "What about walk-in customers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NorWeb handles digital and phone customers — the ones who would otherwise slip through the cracks. Your staff stays focused on serving people in front of them. If anything, service IMPROVES because they're not running to answer the phone during rush hour."
        }
      },
      {
        "@type": "Question",
        "name": "How much does NorWeb cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NorWeb offers three plans: Starter at RM299/month, Growth at RM499/month (most popular), and Scale at RM799/month. All plans include 7-day setup, no setup fees, month-to-month billing, and 30-day satisfaction guarantee. First 50 restaurants get 15% off for life."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NorWeb-FnB | AI Marketing Department for Restaurants | Malaysia",
    "description": "Malaysia's first AI marketing department for restaurants. Campaigns, customer nurturing, reputation management — running 24/7. What agencies charge RM5,000-10,000/month for. 90-day ROI guarantee.",
    "url": "https://fnb.norweb.app",
    "publisher": {
      "@type": "Organization",
      "name": "Norvan Intelligence"
    },
    "mainEntity": {
      "@type": "Product",
      "name": "NorWeb FnB",
      "description": "Your restaurant's AI marketing department. Open 24/7. AI-powered website, voice AI agents, and automated lead nurturing that works while you sleep."
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://fnb.norweb.app"
        }
      ]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Restaurant Marketing & Automation",
    "provider": {
      "@type": "Organization",
      "name": "Norvan Intelligence"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Malaysia"
    },
    "description": "Malaysia's first AI marketing department for restaurants. Campaigns, customer nurturing, reputation management — running 24/7. What restaurants pay agencies RM5,000-10,000/month for. Now automated.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "price": "299",
        "priceCurrency": "MYR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "299",
          "priceCurrency": "MYR",
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": "Growth Plan",
        "price": "499",
        "priceCurrency": "MYR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "499",
          "priceCurrency": "MYR",
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "799",
        "priceCurrency": "MYR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "799",
          "priceCurrency": "MYR",
          "unitText": "MONTH"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

