import React from "react";
import Buttons from "../components/Buttons";
import ReactMarkdown from "react-markdown";

// Component
const SectionHead = ({
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
    <div className="section--head">
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
                className={`page-header--caption clearfix xs-mb5 ${captionClassName}`}
                {...props}
              />
            ),
          }}
        />
      )}
      {buttons && (
        <Buttons
          className="clearfix xs-flex xs-flex-justify-center"
          buttons={buttons ? buttons : []}
        />
      )}
    </div>
  );
};

export default SectionHead;
