'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { refreshSession } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle();
      
      if (profile && profile.role === 'admin') {
        await refreshSession();
        router.push('/admin/dashboard');
      } else {
        await supabase.auth.signOut();
        setError('Unauthorized: Admin access only.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl shadow-sky-500/5">
        <div className="flex justify-center mb-8">
          <div className="bg-sky-500/10 p-4 rounded-2xl border border-sky-500/20">
            <ShieldCheck className="h-10 w-10 text-sky-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-muted-foreground text-center mb-8">Secure login for mess managers</p>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 ml-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              placeholder="manager@hostel.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-sky-500 text-white hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : <>Access Portal <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Return to Student Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
