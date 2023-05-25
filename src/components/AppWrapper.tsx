import { m } from "framer-motion";

const AppWrapper = ({ children, inquire, className }: any) => {
  return (
    <m.div id="top" className={className}>
      {children}
    </m.div>
  );
};

export default AppWrapper;
