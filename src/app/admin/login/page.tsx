'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Save token to localStorage
      localStorage.setItem('admin_token', data.accessToken);
      // Save user details
      localStorage.setItem('admin_user', JSON.stringify(data.data));

      router.replace('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF5E9] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-700/10 blur-[120px] pointer-events-none" />

      {/* Luxury Cream Card with subtle border glow */}
      <div className="w-full max-w-md bg-[#FAF4E8] border border-amber-700/15 rounded-[32px] p-8 md:p-10 shadow-[0_12px_40px_rgba(155,101,0,0.06)] relative z-10">
        
        {/* Pulsing Logo & Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 rounded-full border border-amber-700/30 flex items-center justify-center bg-white shadow-[0_0_15px_rgba(155,101,0,0.08)] mb-4 animate-logo-pulse">
            <span className="font-display text-2xl font-bold text-amber-700 tracking-tighter">AN</span>
            <div className="absolute inset-0 rounded-full border border-amber-700/10 animate-ping opacity-25" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-[#111111] text-center tracking-tight">
            Amazing Natures
          </h1>
          <p className="font-heading text-[10px] uppercase tracking-[0.35em] text-amber-700/80 mt-1 font-semibold">
            Admin Console
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <label className="block text-xs font-heading uppercase tracking-wider text-[#3D3D3D] mb-2 pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-amber-700 transition-colors" />
              <input
                type="email"
                required
                placeholder="admin@amazingnatures.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full h-13 rounded-2xl bg-white border border-amber-700/10 pl-12 pr-6 text-[#111111] placeholder-zinc-400 focus:outline-none focus:border-amber-700/50 shadow-sm transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-xs font-heading uppercase tracking-wider text-[#3D3D3D] mb-2 pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-amber-700 transition-colors" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full h-13 rounded-2xl bg-white border border-amber-700/10 pl-12 pr-6 text-[#111111] placeholder-zinc-400 focus:outline-none focus:border-amber-700/50 shadow-sm transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 rounded-2xl font-heading font-semibold text-white bg-gradient-to-r from-amber-700 to-amber-900 shadow-[0_4px_15px_rgba(120,78,0,0.15)] hover:shadow-[0_4px_25px_rgba(120,78,0,0.3)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-8 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <span>Sign In Securely</span>
            )}
          </button>
        </form>

        {/* Security Footer */}
        <p className="text-center text-[9px] text-[#6B6B6B] font-heading tracking-wider mt-8 uppercase font-medium">
          Authorized Personnel Only • Secure 256-bit Connection
        </p>
      </div>
    </div>
  );
}
