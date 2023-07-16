import { handleEvent } from "@/utils/events";
import { stringToCamelCase } from "@/utils/utils";
import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { linkResolver } from "prismicio";
import Button from "./Button";
import { GridSection } from "./GridSection";
import Headline from "./Headline";
import Text from "./Paragraph";
import StringText, { StringTextProps } from "./StringText";
import HeaderLogo from "./svg/HeaderLogo";

const NavLinkItem = ({
  stringTextSize = "default",
  link_source,
  link_title,
  className,
  ...extra
}: {
  stringTextSize?: StringTextProps["size"];
  link_source: any;
  link_title: string;
  className?: string;
  extra?: any;
}): JSX.Element => {
  return (
    <PrismicLink
      linkResolver={linkResolver}
      field={link_source}
      className={clsx("group relative z-10", className)}
      onClick={() =>
        handleEvent({
          category: `FooterItem`,
          label: link_title,
          value: link_source.uid,
        })
      }
      {...extra}
    >
      <StringText
        size={stringTextSize}
        className={clsx(
          "relative inline-flex w-fit py-2",
          "after:absolute after:bottom-0 after:left-0 after:z-20 after:h-[1.5px] after:w-[100%] after:origin-top-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out-expo after:content-['']",
          "group-hover:after:origin-top-left group-hover:after:scale-x-100"
        )}
      >
        {link_title}
      </StringText>
    </PrismicLink>
  );
};

const FooterUpper = ({
  footerColumns,
  footerLinks,
  primary_action,
  primary_action_link,
  facebook_link,
  instagram_link,
  address,
  phone_number,
}: any) => {
  return (
    <div
      className={clsx(
        "col-span-full xl:col-span-12 2xl:col-span-10 2xl:col-start-2",
        "flex flex-col items-center justify-evenly text-center lg:flex-row lg:items-start lg:text-start",
        "gap-y-2 border-y-2 border-white",
        "padding-top-md padding-bottom-md"
      )}
    >
      {footerColumns.map(({ primary, items }: any, index: number) => {
        return (
          <div
            key={index}
            className={clsx(
              "flex w-full flex-col gap-2 px-6",
              "border-l-2 border-white"
            )}
          >
            <NavLinkItem
              link_source={primary.link_source}
              link_title={primary.link_title}
              {...primary}
            />
            {items.map(
              (
                { child_link_source, child_link_title, ...childExtra }: any,
                index: number
              ) => {
                return (
                  <NavLinkItem
                    key={index}
                    link_source={child_link_source}
                    link_title={child_link_title}
                    stringTextSize="small"
                    className="hidden lg:block"
                    {...childExtra}
                  />
                );
              }
            )}
          </div>
        );
      })}
      <div
        className={clsx(
          "flex w-full flex-col gap-2 px-6",
          "border-x-2 border-white"
        )}
      >
        {footerLinks.map(({ primary }: any, index: number) => {
          return (
            <div key={index} className={clsx("flex w-full flex-col gap-2")}>
              <NavLinkItem
                link_source={primary.link_source}
                link_title={primary.link_title}
                {...primary}
              />
            </div>
          );
        })}
        {primary_action && (
          <Button
            field={primary_action_link}
            text={primary_action}
            type="white"
            size="default"
            eventCategory={stringToCamelCase(`footerPriamryCTA`)}
            eventLabel={stringToCamelCase(`PrimaryCTA`)}
            className="my-2 w-fit self-center lg:self-start"
          />
        )}
        {address && (
          <PrismicRichText
            field={address}
            linkResolver={linkResolver}
            components={{
              paragraph: ({ children }) => (
                <Text className="my-2 underline">{children}</Text>
              ),
            }}
          />
        )}
        {phone_number && (
          <PrismicRichText
            field={phone_number}
            linkResolver={linkResolver}
            components={{
              paragraph: ({ children }) => (
                <Text className="my-1 underline">{children}</Text>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

const FooterMiddle = ({ tag_line }: { tag_line: any }): JSX.Element | null => {
  return (
    <div
      className={clsx(
        "col-span-full xl:col-span-12 2xl:col-span-10 2xl:col-start-2",
        "flex flex-row items-start justify-evenly text-center",
        "border-b-2 border-white",
        "padding-top-md padding-bottom-md"
      )}
    >
      <Headline size={"xl"} disableMotion uppercase>
        {prismicH.asText(tag_line)}
      </Headline>
    </div>
  );
};

const FooterLower = ({
  parent_company,
  parent_company_link,
  legal_text,
}: any) => {
  return (
    <div
      className={clsx(
        "col-span-full xl:col-span-12",
        "flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-evenly lg:text-start",
        "padding-top-lg lg:padding-top-md padding-bottom-lg lg:pb-0"
      )}
    >
      <div className="order-3 mb-4 w-full lg:order-[unset] ">
        <StringText size="xsmall" className="">
          © Copyright {new Date().getFullYear()} {parent_company}
        </StringText>
      </div>
      <div className="relative order-1 flex h-full w-full items-center justify-center text-center lg:order-[unset]">
        <div className="bottom-0 flex w-full items-start justify-center overflow-hidden lg:absolute lg:h-20 ">
          <HeaderLogo className="w-44 lg:absolute lg:w-[unset] " />
        </div>
      </div>
      <div className="order-2 mb-4 w-full lg:order-[unset] lg:text-end">
        {legal_text && (
          <PrismicRichText
            field={legal_text}
            linkResolver={linkResolver}
            components={{
              hyperlink: ({ text, node: { data } }) => (
                <PrismicLink
                  linkResolver={linkResolver}
                  field={data}
                  className="underline"
                >
                  {text}
                </PrismicLink>
              ),
              paragraph: ({ children }) => (
                <StringText size="xsmall" className="">
                  {children}
                </StringText>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default function Footer({ settings, navigation }: any) {
  const router = useRouter();

  if (!navigation && !settings) return null;

  const { slices } = navigation.results[0].data;
  const {
    primary_action,
    primary_action_link,
    facebook_link,
    instagram_link,
    address,
    phone_number,
    tag_line,
    parent_company,
    parent_company_link,
    legal_text,
  } = settings?.data;

  const getItemsWithKey = (key: string) => {
    return slices.filter((slice: any) => slice.variation === key);
  };

  const footerColumns = getItemsWithKey("withChildren");
  const footerLinks = getItemsWithKey("default");

  const getFooterState = () => {
    if (router.pathname === "/inquire") {
      return {
        show: false,
      };
    } else if (router.pathname === "/thanks") {
      return {
        show: false,
      };
    } else if (router.pathname === "/map") {
      return {
        show: false,
      };
    } else {
      return {
        show: true,
      };
    }
  };

  if (!getFooterState().show) return null;

  return (
    <>
      <GridSection
        id={"header"}
        topSpacer="Medium"
        bottomSpacer="None"
        overflowHidden={false}
        className="gap-y-0"
      >
        <FooterUpper
          footerColumns={footerColumns}
          footerLinks={footerLinks}
          primary_action={primary_action}
          primary_action_link={primary_action_link}
          facebook_link={facebook_link}
          instagram_link={instagram_link}
          address={address}
          phone_number={phone_number}
        />
        <FooterMiddle tag_line={tag_line} />
        <FooterLower
          parent_company={parent_company}
          parent_company_link={parent_company_link}
          legal_text={legal_text}
        />
      </GridSection>
    </>
  );
}
