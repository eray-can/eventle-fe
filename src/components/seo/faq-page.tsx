interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageProps {
  faqs: FAQItem[];
  pageTitle?: string;
  pageDescription?: string;
}

export function FAQPage({ faqs, pageTitle, pageDescription }: FAQPageProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pageTitle && { name: pageTitle }),
    ...(pageDescription && { description: pageDescription }),
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      key="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

export default FAQPage;