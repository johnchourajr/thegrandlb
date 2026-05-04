import type { Slice } from "content/types";
import { toText } from "@/utils/rich-text";

interface FaqItem {
  question: unknown;
  answer: unknown;
}

export default function JsonLdFaqSlices({ slices }: { slices: Slice[] }) {
  const questions = slices
    .filter((slice) => slice.type === "faq_section")
    .flatMap((slice) => {
      const items = (slice.items ?? []) as FaqItem[];
      return items.map((item) => ({
        question: toText(item.question),
        answer: toText(item.answer),
      }));
    })
    .filter(({ question }) => question.length > 0);

  if (!questions.length) return null;

  const jsonLd = {
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
