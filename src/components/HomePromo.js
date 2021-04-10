import React from 'react';

import PageCta from './PageCta';
import ScrollAnimate from './ScrollAnimate';

function HomePromo({ frontmatter: { promo } }) {
  return (
    <ScrollAnimate>
      <PageCta
        accent={promo.accent}
        heading={promo.heading}
        buttons={[
          {
            text: "Let's Talk",
            url: '/contact/',
            event: {
              category: 'ContactAction',
              action: 'Home__PromoAction',
              label: 'Home__PromoAction'
            }
          }
        ]}
        img={promo.img}
      />
    </ScrollAnimate>
  );
}

export default HomePromo;
