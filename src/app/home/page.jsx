"use client";
import { useEffect, useState } from 'react';
import Completo from '../completo/page';
import SignUp from '../signup/page';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (!userCookie) {
      window.location.href = '/login';  // Use window.location.href for navigation
    } else {
      setUser(JSON.parse(userCookie.split('=')[1]));
    }
  }, []);

  if (!user) {
    return <SignUp />;
  }

  return < Completo />;
}
