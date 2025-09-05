import StringText from "@/components/StringText";
import { handleEvent } from "@/utils/events";
import Headline from "@components/Headline";
import Text from "@components/Paragraph";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicRichText } from "@prismicio/react";

export const LongformRichText = ({ field, paragraphSize = "large" }: any) => (
  <PrismicRichText
    field={field}
    components={{
      heading1: ({ children, key }) => (
        <Headline
          key={key}
          size={"xl"}
          className="mb-4 mt-14 block border-b-2 border-white pb-4"
          disableMotion
        >
          {children}
        </Headline>
      ),
      heading2: ({ children, key }) => (
        <Headline
          key={key}
          size={"sm"}
          className="mb-4 mt-14 block border-b-2 border-white pb-4"
          disableMotion
        >
          {children}
        </Headline>
      ),
      heading3: ({ children, key }) => (
        <StringText key={key} size={"large"} className="mb-4" bold uppercase>
          {children}
        </StringText>
      ),
      heading4: ({ children, key }) => (
        <StringText key={key} size={"default"} className="mb-4" bold uppercase>
          {children}
        </StringText>
      ),
      heading5: ({ children, key }) => (
        <StringText key={key} size={"small"} className="mb-4" bold uppercase>
          {children}
        </StringText>
      ),
      heading6: ({ children, key }) => (
        <StringText key={key} size={"small"} className="mb-4" uppercase>
          {children}
        </StringText>
      ),
      paragraph: ({ children, key }) => (
        <Text
          key={key}
          as="p"
          size={paragraphSize}
          className=" mb-4 leading-[1.75]"
        >
          {children}
        </Text>
      ),
      preformatted: ({ children, key }) => <pre key={key}>{children}</pre>,
      strong: ({ children, key }) => <strong key={key}>{children}</strong>,
      em: ({ children, key }) => (
        <span key={key} className={"pr-[.2em] italic"}>
          {children}
        </span>
      ),
      listItem: ({ children, key }) => (
        <li key={key} className="mb-2">
          <Text size={paragraphSize} as="span">
            {children}
          </Text>
        </li>
      ),
      oListItem: ({ children, key }) => (
        <li key={key} className="mb-2">
          <Text size={paragraphSize} as="span">
            {children}
          </Text>
        </li>
      ),
      list: ({ children, key }) => (
        <ul key={key} className="mb-4 list-outside list-disc pl-4">
          {children}
        </ul>
      ),
      oList: ({ children, key }) => (
        <ol key={key} className="mb-4 list-outside list-decimal pl-4">
          {children}
        </ol>
      ),
      image: ({ children, key, node, ...rest }) => {
        return (
          <div className={"relative w-full"}>
            <PrismicNextImage
              field={node as any}
              fill
              className="relative w-full"
              key={key}
            />
          </div>
        );
      },
      embed: ({ node, key }) => (
        <div
          key={key}
          data-oembed={node.oembed.embed_url}
          data-oembed-type={node.oembed.type}
          data-oembed-provider={node.oembed.provider_name}
          dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }}
        />
      ),
      hyperlink: ({ text, node: { data } }) => {
        return (
          <PrismicLink
            field={data as any}
            onClick={() => {
              handleEvent({
                action: "click",
                category: `rich_text_link`,
                label: `text_url`,
                value: `${text}: ${data?.url}`,
              });
            }}
          >
            {text}
          </PrismicLink>
        );
      },
      label: ({ node, children, key }) => (
        <span key={key} className={node.data.label}>
          {children}
        </span>
      ),
    }}
  />
);
