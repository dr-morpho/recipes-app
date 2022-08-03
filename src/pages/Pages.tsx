import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Value from './Value';
import Recipes from './Recipes';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Pages: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:cuisine" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Value />} />
        <Route path="/recipes/:id" element={<Recipes />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
