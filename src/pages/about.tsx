import Link from "@components/Link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/about"} className={""}>
          About
        </Link>
      </div>
    </div>
  );
};

export default Page;