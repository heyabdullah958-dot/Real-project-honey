'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FBF5E9] flex items-center justify-center text-[#111111]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-heading text-sm uppercase tracking-wider text-amber-700">Checking session...</p>
      </div>
    </div>
  );
}
