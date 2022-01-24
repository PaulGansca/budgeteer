import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/LayoutPage/LayoutPage';
import HomePage from './pages/HomePage/HomePage';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import BudgetPage from './pages/BudgetPage/BudgetPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RequireAuth from './components/require-auth/require-auth';
import UserLoggedIn from './components/user-logged-in/user-logged-in';

import './App.css';


const App = ({ currentUser }) => {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<UserLoggedIn currentUser={currentUser}><LoginPage currentUser={currentUser} /></UserLoggedIn>} />
        <Route path="signup" element={<UserLoggedIn currentUser={currentUser}><SignUpPage /></UserLoggedIn>} />
        <Route path="/" element={<Layout />}>
          <Route index element={<RequireAuth currentUser={currentUser}><HomePage /></RequireAuth>} />
          <Route path="transactions" element={<RequireAuth currentUser={currentUser}><TransactionsPage /></RequireAuth>} />
          <Route path="budget" element={<RequireAuth currentUser={currentUser}><BudgetPage /></RequireAuth>} />

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
