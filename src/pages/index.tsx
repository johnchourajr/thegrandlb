import Link from "@components/Link";
import React from "react";

const Page = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/tour">Tour</Link>
        </li>
        <li>
          <Link href="/menus">Menus</Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
