import type { FAQPage, WithContext } from "schema-dts";
import { faqPage } from "@/app/(site)/faq/content";
import type { RtBlock } from "content/types";

type FaqItem = {
  question: RtBlock[];
  answer: RtBlock[];
};

function extractText(richText: RtBlock[]): string {
  return richText.map((block) => block.text).join(" ").trim();
}

export default function JsonLdFaq() {
  const questions = faqPage.data.slices.flatMap((section) => {
    const items = (section.items ?? []) as FaqItem[];
    return items.map((item) => ({
      question: extractText(item.question),
      answer: extractText(item.answer),
    }));
  });

  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
