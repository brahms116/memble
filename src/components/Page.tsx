import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { dataContext } from "../context/DataContext";
import useAuthGuard from "../hooks/useAuthGuard";

export interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps) {
  const appData = useContext(dataContext);
  const guard = useAuthGuard(appData.state.navigation.selectionStage);
  useEffect(() => {
    guard();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {props.children}
    </motion.div>
  );
}
