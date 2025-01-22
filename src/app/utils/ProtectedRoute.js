// utils/ProtectedRoute.jsx
"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    }
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
