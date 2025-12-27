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
    "description": "AI-powered restaurant assistant for automated customer service, reservations, and menu inquiries",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "186",
      "highPrice": "2799",
      "priceCurrency": "MYR",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50"
    },
    "featureList": [
      "24/7 AI Voice Agent",
      "WhatsApp Integration",
      "Automated Reservations",
      "Menu Q&A",
      "CRM Integration",
      "Review Management"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is NorWeb FnB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NorWeb FnB is an AI-powered restaurant assistant that handles customer inquiries, reservations, and menu questions 24/7 via WhatsApp, voice calls, and web chat."
        }
      },
      {
        "@type": "Question",
        "name": "How long does setup take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your NorWeb system will have a working framework within 48 hours and be fully live in less than 2 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How much does NorWeb cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NorWeb offers three plans: Starter at RM186/month, Growth at RM499/month, and Enterprise with custom pricing. Setup fee starts at RM3,299 with 15% early bird discount for the first 50 restaurants."
        }
      },
      {
        "@type": "Question",
        "name": "What's the 3-Month ROI Guarantee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If NorWeb doesn't generate at least 50 bookings or orders in your first 3 months, we'll refund your entire setup fee. No questions asked."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'AI Voice Agent' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's like having a receptionist who never sleeps. When customers call your restaurant, our AI answers in a natural voice, handles reservations, answers menu questions, provides operating hours, and can even take orders. Available in English and Bahasa Malaysia."
        }
      },
      {
        "@type": "Question",
        "name": "Are there hidden fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No hidden fees, ever. Your subscription includes everything listed. The only variable cost is AI usage (voice minutes and messages), which is billed based on actual consumption — and for most restaurants, this is under RM50/month."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NorWeb FnB - AI Restaurant Assistant",
    "description": "Transform your restaurant with AI-powered WhatsApp, voice, and web chat. Handle reservations, answer menu questions, and capture leads automatically.",
    "url": "https://norweb-fnb.norvan.io",
    "publisher": {
      "@type": "Organization",
      "name": "Norvan Intelligence"
    },
    "mainEntity": {
      "@type": "Product",
      "name": "NorWeb FnB",
      "description": "AI-powered restaurant assistant"
    }
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
    </>
  );
}

