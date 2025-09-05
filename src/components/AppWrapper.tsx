import { motion } from "framer-motion";

const AppWrapper = ({ children, className }: any) => {
  return (
    <motion.div id="top" className={className}>
      {children}
    </motion.div>
  );
};

export default AppWrapper;
