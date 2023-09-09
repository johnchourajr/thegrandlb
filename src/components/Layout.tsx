import clsx from "clsx";
import dynamic from "next/dynamic";

const DynamicHead = dynamic(() => import("./LayoutHead"), {
  loading: () => <></>,
});
const DynamicFooter = dynamic(() => import("./Footer"), {
  loading: () => <></>,
});

const Layout = ({
  settings,
  navigation,
  headContent,
  children,
  page,
  hidePageUid = false,
  className,
  wrapperClassName,
}: any) => {
  return (
    <div
      id="page"
      className={clsx(
        "relative z-0 mx-auto w-full max-w-[100vw] bg-bg text-black 4xl:max-w-[2500px]",
        wrapperClassName
      )}
    >
      {page && !hidePageUid && <pre>uid: {page?.uid}</pre>}
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
