"use client";

import { useContext, useState, useEffect } from 'react';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import axios from 'axios';
import Completo from './Completo/page';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  return (
    <ProtectedRoute>
      <Completo />
    </ProtectedRoute>
  );
};

export default Home;