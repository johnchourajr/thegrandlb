import React from 'react';
import Link from 'gatsby-link';

const NavbarItemMenu = (props) => {
  if (props.subpages && !props.noHoverMenu) {
    return (
      <div
        role="menuitem"
        className="nav--item--menu"
        onMouseEnter={props.onMouseEnter}
        onFocus={props.onMouseEnter}
        onBlur={props.onMouseLeave}
        onMouseLeave={props.onMouseLeave}
        tabIndex="-1"
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
