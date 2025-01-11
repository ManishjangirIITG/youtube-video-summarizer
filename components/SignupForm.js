import React, { useState } from 'react';
import {nhost} from '@/lib/nhost'
import { v4 as uuidv4 } from 'uuid';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { error, session } = await nhost.auth.signUp({
        id: uuidv4(),
        email,
        password,
      });
      if (error) {
        setMessage(`Signup error: ${error.message}`);
      } else {
        setMessage('Signup successful!');
        console.log('User session:', session);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('An error occurred during signup.');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignupForm;
