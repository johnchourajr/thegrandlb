import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Buttons from "../components/Buttons";
import PageImage from "./PageImage";

// Component
const PageCta = ({
  img,
  accent,
  heading,
  headingClassName,
  headingTag: HeadingTag = "p",
  subHead,
  subHeadClassName,
  subHeadTag: SubHeadingTag = "p",
  caption,
  captionClassName,
  buttons,
}) => {
  return (
    <PageImage img={img} className={`page-cta page-cta--${accent}`}>
      <div className="page-cta--inner">
        {heading && (
          <ReactMarkdown
            children={heading}
            components={{
              p: ({ node, ...props }) => (
                <HeadingTag
                  className={`h2 clearfix display xs-text-center ${headingClassName}`}
                  {...props}
                />
              ),
            }}
          />
        )}
        {subHead && (
          <ReactMarkdown
            children={subHead}
            components={{
              p: ({ node, ...props }) => (
                <SubHeadingTag
                  className={`clearfix xs-text-center section--head--caption ${subHeadClassName}`}
                  {...props}
                />
              ),
            }}
          />
        )}
        {caption && (
          <ReactMarkdown
            children={caption}
            components={{
              p: ({ node, ...props }) => (
                <p
                  className={`page-header--caption clearfix ${captionClassName}`}
                  {...props}
                />
              ),
            }}
          />
        )}
        {buttons && (
          <Buttons
            className="clearfix xs-mt5 xs-flex xs-flex-justify-center"
            buttons={buttons ? buttons : []}
          />
        )}
      </div>
    </PageImage>
  );
};

export default PageCta;
