'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';
  
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [errMssg, setErrMssg] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    setErrMssg('');
  }, [email, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Attempting login...');
      await login(email, pwd);
      console.log('Login successful, redirecting to dashboard');
      setEmail('');
      setPwd('');
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } };
      if (!axiosError?.response) {
        setErrMssg('No Server Response');
      } else if (axiosError.response?.status === 400) {
        setErrMssg('Missing Username or Password');
      } else if (axiosError.response?.status === 401) {
        setErrMssg('Unauthorized, Contact administration or try again');
      } else {
        setErrMssg('Login Failed, Try again');
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errMssg && (
          <div className="mb-4 text-red-600" ref={errRef}>
            {errMssg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              ref={userRef} 
              value={email} 
              name="email" 
              type="email" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              id="email" 
              placeholder="Enter email" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              onChange={(e) => setPwd(e.target.value)} 
              value={pwd} 
              name="password" 
              type="password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              id="password" 
              placeholder="Password" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 