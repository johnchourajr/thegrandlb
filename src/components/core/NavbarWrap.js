import React from 'react';

function NavbarWrap(props) {
  React.useEffect(() => {
    if (typeof document !== `undefined`) {
      const navChangeSize = () => {
        const scrollPos = window.pageYOffset;
        const trigger = scrollPos >= 50;

        if (trigger) {
          document.body.classList.add(`nav--min`);
        } else {
          document.body.classList.remove(`nav--min`);
        }
      };

      document.addEventListener('scroll', navChangeSize);
      document.addEventListener('load', navChangeSize);

      return () => {
        document.removeEventListener('scroll', navChangeSize);
        document.removeEventListener('load', navChangeSize);
      };
    }
  });

  return (
    <nav id="nav" className="nav">
      {props.children}
    </nav>
  );
}

export default NavbarWrap;
