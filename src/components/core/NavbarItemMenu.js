import React from "react";
import Link from "gatsby-link";

const NavbarItemMenu = props => {
  if (props.subpages && !props.noHoverMenu) {
    return (
      <div
        className="nav--item--menu"
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      >
        {props.subpages.map((item, i) => (
          <div key={i}>
            {item.externalPath ? (
              <a
                href={item.path}
                className="nav--item--menu--item"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ) : (
              <Link to={item.path} className="nav--item--menu--item">
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  } else return null;
};

export default NavbarItemMenu;
