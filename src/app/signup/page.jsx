"use client";
import { useState } from 'react';
import Link from 'next/link';
import { users } from '../users';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    document.cookie = `auth=${JSON.stringify({ id: newUser.id, username: newUser.username })}; path=/`;
    window.location.href = '/completo';  // Use window.location.href for navigation
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit">Signup</button>
      <div>
        <Link href="/login">Already have an account? Login here</Link>
      </div>
    </form>
  );
}
