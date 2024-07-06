import clsx from "clsx";
import dynamic from "next/dynamic";

const DynamicHead = dynamic(() => import("./LayoutHead"), {
  loading: () => <></>,
});
const DynamicFooter = dynamic(() => import("./Footer"), {
  loading: () => <></>,
});

type LayoutProps = {
  settings?: any;
  navigation?: any;
  headContent?: any;
  children?: any;
  page?: any;
  className?: string;
  wrapperClassName?: string;
  /** @deprecated no longer used */
  hidePageUid?: boolean;
};

const Layout = ({
  settings,
  navigation,
  headContent,
  children,
  page,
  className,
  wrapperClassName,
}: LayoutProps) => {
  return (
    <div
      id="page"
      className={clsx(
        "relative z-0 mx-auto w-full max-w-[100vw] bg-bg text-black 4xl:max-w-[2500px]",
        wrapperClassName
      )}
    >
      {settings && (
        <DynamicHead
          page={page}
          settings={settings}
          headContent={headContent}
        />
      )}
      {/* PAGE CONTENT */}
      <main
        id={page?.uid}
        className={clsx("--min-h-[150vh]", "min-h-[25vh]", className)}
      >
        {children}
      </main>
      {/* FOOTER */}
      {navigation && (
        <DynamicFooter settings={settings} navigation={navigation} />
      )}
    </div>
  );
};

export default Layout;
