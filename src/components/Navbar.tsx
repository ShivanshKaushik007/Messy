'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ChefHat, LogOut, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, role, isLoading, signOut } = useAuth();
  const pathname = usePathname();

  if (isLoading) return null;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <ChefHat className="h-6 w-6 text-primary" />
            </div>
            <Link href="/" className="font-bold text-xl tracking-tight">
              HostelMess
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-4">
              {role === 'student' && (
                <>
                  <NavLink href="/student/dashboard" active={pathname === '/student/dashboard'}>Dashboard</NavLink>
                  <NavLink href="/student/menu" active={pathname === '/student/menu'}>Menu & Suggestions</NavLink>
                  <NavLink href="/student/complaints" active={pathname === '/student/complaints'}>Complaints</NavLink>
                  <NavLink href="/student/qr-scanner" active={pathname === '/student/qr-scanner'}>Scan QR</NavLink>
                </>
              )}
              {role === 'admin' && (
                <>
                  <NavLink href="/admin/dashboard" active={pathname === '/admin/dashboard'}>Dashboard</NavLink>
                  <NavLink href="/admin/qr-generator" active={pathname === '/admin/qr-generator'}>Generate QR</NavLink>
                  <NavLink href="/admin/billing" active={pathname === '/admin/billing'}>Attendance & Billing</NavLink>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-6">
              {user ? (
                <button
                  onClick={signOut}
                  className="p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium hover:bg-red-500/10 text-red-500"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
      }`}
    >
      {children}
    </Link>
  );
}
