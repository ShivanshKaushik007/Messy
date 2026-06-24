'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, UtensilsCrossed, TrendingDown, BellRing } from 'lucide-react';

export default function AdminDashboard() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (role !== 'admin') {
    return <div className="text-center mt-20 text-xl font-semibold">Access Denied</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of mess operations and daily statistics.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="h-6 w-6 text-sky-500" />}
          title="Total Students"
          value="450"
          trend="+5 this month"
        />
        <StatCard 
          icon={<UtensilsCrossed className="h-6 w-6 text-primary" />}
          title="Expected Dinner"
          value="385"
          trend="85% opt-in rate"
        />
        <StatCard 
          icon={<TrendingDown className="h-6 w-6 text-emerald-500" />}
          title="Food Wastage"
          value="-12%"
          trend="Compared to last week"
        />
        <StatCard 
          icon={<BellRing className="h-6 w-6 text-amber-500" />}
          title="Active Complaints"
          value="3"
          trend="2 resolved today"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Today's Poll Results</h3>
          <div className="space-y-4">
            <PollBar meal="Breakfast" opted={310} total={450} color="bg-sky-500" />
            <PollBar meal="Lunch" opted={420} total={450} color="bg-emerald-500" />
            <PollBar meal="Dinner" opted={385} total={450} color="bg-primary" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Recent Complaints</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-background/50 border border-border flex justify-between items-start">
                <div>
                  <div className="font-semibold text-sm mb-1">Food too spicy in Lunch</div>
                  <div className="text-xs text-muted-foreground">Submitted by Room 20{i} • 2 hours ago</div>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-1 rounded-md font-medium">Pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string, trend: string }) {
  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-background rounded-xl shadow-sm">
          {icon}
        </div>
        <div className="text-sm font-semibold text-muted-foreground">{title}</div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{trend}</div>
    </div>
  );
}

function PollBar({ meal, opted, total, color }: { meal: string, opted: number, total: number, color: string }) {
  const percentage = Math.round((opted / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold">{meal}</span>
        <span className="text-muted-foreground">{opted} / {total} ({percentage}%)</span>
      </div>
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
