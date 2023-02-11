import React from "react";
import Scrollchor from "react-scrollchor";
import styled from "styled-components";

import { slugify } from "./functions/util";
import { RichText } from "prismic-reactjs";

function formatCurrency(num) {
  num = num.toFixed(2);
  return `$${num}`;
}

function MenuItem({
  data: { title, description, price_per, price_min, price_max },
}) {
  return (
    <MenuItemWrapper className="table--row menu--table--item">
      <div className="table--division menu--table--item--main">
        <h4 className="h4">{title.text}</h4>
        <RichText render={description.raw} />
      </div>
      {price_min && (
        <div className="table--division menu--table--item--price">
          <p>
            {price_min && <span>{formatCurrency(price_min)}</span>}
            {price_max && <span> / {formatCurrency(price_max)}</span>}
            {price_per && (
              <>
                <em>—</em>
                <em>{price_per}</em>
              </>
            )}
          </p>
        </div>
      )}
    </MenuItemWrapper>
  );
}

const MenuItemWrapper = styled.div`
  .menu--table--item--main p {
    font-size: 1rem;
  }
  ul {
    font-size: 1rem;

    a {
      color: inherit;
    }
  }
`;

const MenuTable = ({ data }) => {
  return (
    <>
      {data.group.map(({ menu_link }, i) => {
        const group = menu_link.document?.data;
        return (
          <div
            key={i}
            id={group.page_title && slugify(group.page_title)}
            className="menu--wrap sm-col-8 sm-offset-2"
          >
            {group.page_title && (
              <>
                <div className="menu--header ">
                  {i > 0 ? (
                    <div className="menu--scrolltop no-print">
                      <Scrollchor
                        to={`#menutop`}
                        animate={{ offset: -150, duration: 600 }}
                      >
                        Top
                      </Scrollchor>
                    </div>
                  ) : null}
                  <h2 className="display h3">
                    <Scrollchor
                      to={`#${group.page_title && slugify(group.page_title)}`}
                      animate={{ offset: -100, duration: 300 }}
                    >
                      {group.page_title}
                    </Scrollchor>
                  </h2>
                  <RichText render={group.page_description.raw} />
                </div>
                <div className="xs-my5 divider-bar divider-bar--top" />
              </>
            )}
            {group.body.map(({ items, primary }, i) => {
              return (
                <div key={i} className="menu--section">
                  {primary && (
                    <div
                      id={primary.title.text && slugify(primary.title.text)}
                      className="menu--section--header"
                    >
                      {primary.title.text && (
                        <h3 className="h1">
                          <Scrollchor
                            to={`#${
                              primary.title.text && slugify(primary.title.text)
                            }`}
                            animate={{ offset: -100, duration: 300 }}
                          >
                            {primary.title.text}
                          </Scrollchor>
                        </h3>
                      )}
                      {primary.description.raw && (
                        <RichText render={primary.description.raw} />
                      )}
                    </div>
                  )}
                  {items &&
                    items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="table--group  menu--table"
                      >
                        <MenuItem key={itemIndex} data={item} />
                      </div>
                    ))}
                  {primary.caption.raw && (
                    <div className="menu--footer">
                      <RichText render={primary.caption.raw} />
                    </div>
                  )}
                </div>
              );
            })}
            <RichText render={group.page_disclaimer.raw} />
          </div>
        );
      })}
    </>
  );
};

export default MenuTable;
