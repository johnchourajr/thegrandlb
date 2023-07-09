import { useRouter } from "next/router";
import { GridSection } from "./GridSection";

export default function Footer({ navigation }: any) {
  console.log({ navigation });

  const router = useRouter();

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
        gridSectionType="flex"
        topSpacer="None"
        bottomSpacer="None"
        overflowHidden={false}
        className="bg-[yellow]"
      >
        Footer
      </GridSection>
    </>
  );
}
