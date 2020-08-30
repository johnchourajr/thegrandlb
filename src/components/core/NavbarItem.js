import React from "react";
import Link from "gatsby-link";

import NavbarItemMenu from "./NavbarItemMenu";
import NavbarCaret from "./NavbarCaret";
import { slugify } from "../functions/util";

class NavbarItem extends React.Component {
  state = {
    navActive: false
  };

  onMouseOver(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: true });
      document.body.classList.add(`nav--hover-active`);
    }
  }

  onMouseOut(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: false });
      document.body.classList.remove(`nav--hover-active`);
    }
  }

  render() {
    const { path, subpages, noHoverMenu } = this.props;

    const pageSlug = path ? `${slugify(path)}-nav` : null;
    const isActive = this.state.navActive ? "nav--item-active" : "";

    let onMouseOver = null;
    let onMouseOut = null;

    if (!noHoverMenu) {
      onMouseOver = e => this.onMouseOver(e, subpages);
      onMouseOut = e => this.onMouseOut(e, subpages);
    }

    return (
      <div className={`nav--item ${isActive}`}>
        {this.props.externalPath ? (
          <a href={this.props.path} target="_blank" rel="noopener noreferrer">
            {this.props.name}
          </a>
        ) : (
          <Link
            id={pageSlug}
            to={path}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            {this.props.name}
          </Link>
        )}
        <NavbarCaret noHoverMenu={noHoverMenu} subpages={subpages} />
        <NavbarItemMenu
          noHoverMenu={noHoverMenu}
          subpages={subpages}
          onMouseOver={e => this.onMouseOver(e, subpages)}
          onMouseOut={e => this.onMouseOut(e, subpages)}
        />
      </div>
    );
  }
}

export default NavbarItem;
