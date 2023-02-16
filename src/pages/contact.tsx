import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className={"flex gap-1"}>
        <Link href={"/"} className={"underline"}>
          Home
        </Link>
        /
        <Link href={"/contact"} className={""}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Page;
