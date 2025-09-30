import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;