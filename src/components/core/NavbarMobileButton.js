import React from "react";

const NavbarMobileButton = (props) => (
  <button
    id="nav--mobile-menu"
    onClick={props.onClick}
    className="nav--mobile-menu"
    aria-label="Open/Close Mobile Menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
);

export default NavbarMobileButton;
