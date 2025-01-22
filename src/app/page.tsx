"use client";

import ProtectedRoute from './utils/ProtectedRoute';
import Completo from './Completo/page';

const Home = () => {
  return (
    <ProtectedRoute>
      <Completo />
    </ProtectedRoute>
  );
};

export default Home;