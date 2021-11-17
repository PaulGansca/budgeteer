import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/LayoutPage/LayoutPage';
import HomePage from './pages/HomePage/HomePage';
import BudgetPage from './pages/BudgetPage/BudgetPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
