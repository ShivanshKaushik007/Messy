'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowRight, ChefHat, QrCode, ClipboardList, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role) {
      router.push(`/${role}/dashboard`);
    }
  }, [role, isLoading, router]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <ChefHat className="h-16 w-16 text-primary" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
        Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-400">Hostel Mess</span> Management
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-12">
        A premium platform to reduce food wastage, streamline attendances via QR scanning, and manage billing effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
        <FeatureCard 
          icon={<QrCode className="h-8 w-8 text-sky-500" />}
          title="Smart Attendance"
          description="Scan QR codes for seamless entry and automated billing calculation."
        />
        <FeatureCard 
          icon={<TrendingUp className="h-8 w-8 text-primary" />}
          title="Wastage Prevention"
          description="Daily polls let you notify the mess staff if you're eating, ensuring accurate cooking amounts."
        />
        <FeatureCard 
          icon={<ClipboardList className="h-8 w-8 text-emerald-500" />}
          title="Digital Menu & Complaints"
          description="View the weekly menu, submit suggestions, and raise issues directly through the portal."
        />
      </div>
      
      <div className="flex gap-4">
        <p className="text-sm text-muted-foreground">Select a role from the navigation bar to get started.</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
      <div className="bg-background rounded-2xl p-4 shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
