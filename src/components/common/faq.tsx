'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQ({ faqs, title = "Sık Sorulan Sorular", className = "" }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string | number>>(new Set());

  const toggleItem = (id: string | number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {title}
        </h2>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openItems.has(faq.id);

          return (
            <div
              key={faq.id}
              className="md:border md:border-gray-200 md:dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-4">
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
