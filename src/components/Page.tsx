import { motion } from "framer-motion";

export interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {props.children}
    </motion.div>
  );
}
