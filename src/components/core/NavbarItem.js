import React from "react";
import Link from "gatsby-link";

import NavbarItemMenu from "./NavbarItemMenu";
import NavbarCaret from "./NavbarCaret";
import { slugify } from "../functions/util";

class NavbarItem extends React.Component {
  state = {
    navActive: false,
  };

  onMouseEnter(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: true });
      document.body.classList.add(`nav--hover-active`);
    }
  }

  onMouseLeave(e, hasSubpage) {
    if (hasSubpage) {
      this.setState({ navActive: false });
      document.body.classList.remove(`nav--hover-active`);
    }
  }

  render() {
    const { path, subpages, noHoverMenu } = this.props;

    const pageSlug = path ? `${slugify(path)}-nav` : null;
    const pageFooterSlug = path ? `${slugify(path)}-footer` : null;
    const isActive = this.state.navActive ? "nav--item-active" : "";

    let onMouseEnter = null;
    let onMouseLeave = null;

    if (!noHoverMenu) {
      onMouseEnter = (e) => this.onMouseEnter(e, subpages);
      onMouseLeave = (e) => this.onMouseLeave(e, subpages);
    }

    return (
      <div className={`nav--item ${isActive}`}>
        {this.props.externalPath ? (
          <a href={this.props.path} target="_blank" rel="noopener noreferrer">
            {this.props.name}
            <NavbarCaret noHoverMenu={noHoverMenu} subpages={subpages} />
          </a>
        ) : (
          <Link
            id={noHoverMenu ? pageFooterSlug : pageSlug}
            to={path}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {this.props.name}
            <NavbarCaret noHoverMenu={noHoverMenu} subpages={subpages} />
          </Link>
        )}
        <NavbarItemMenu
          noHoverMenu={noHoverMenu}
          subpages={subpages}
          onMouseEnter={(e) => this.onMouseEnter(e, subpages)}
          onMouseLeave={(e) => this.onMouseLeave(e, subpages)}
        />
      </div>
    );
  }
}

export default NavbarItem;
