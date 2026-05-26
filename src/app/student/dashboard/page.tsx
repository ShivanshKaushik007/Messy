'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface MealStatus {
  time: string;
  label: string;
  deadline: string;
}

const meals: Record<MealType, MealStatus> = {
  breakfast: { label: 'Breakfast', time: '08:00 AM', deadline: '07:00 AM' },
  lunch: { label: 'Lunch', time: '01:00 PM', deadline: '12:00 PM' },
  dinner: { label: 'Dinner', time: '08:00 PM', deadline: '07:00 PM' },
};

export default function StudentDashboard() {
  const { role } = useAuth();
  
  // Mock state for poll choices
  const [choices, setChoices] = useState<Record<MealType, boolean | null>>({
    breakfast: null,
    lunch: null,
    dinner: null,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (role !== 'student') {
    return <div className="text-center mt-20 text-xl font-semibold">Access Denied</div>;
  }

  const handlePoll = (meal: MealType, willEat: boolean) => {
    setChoices(prev => ({ ...prev, [meal]: willEat }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your daily meals and avoid food wastage.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {(Object.keys(meals) as MealType[]).map((meal) => (
          <MealPollCard 
            key={meal}
            meal={meal}
            status={meals[meal]}
            choice={choices[meal]}
            onChoose={(willEat) => handlePoll(meal, willEat)}
            currentTime={currentTime}
          />
        ))}
      </div>
    </div>
  );
}

function MealPollCard({
  meal,
  status,
  choice,
  onChoose,
  currentTime,
}: {
  meal: MealType;
  status: MealStatus;
  choice: boolean | null;
  onChoose: (willEat: boolean) => void;
  currentTime: Date;
}) {
  // Parse deadline (very basic parser for demo)
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const d = new Date(currentTime);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const deadlineDate = parseTime(status.deadline);
  const isPastDeadline = currentTime > deadlineDate;

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden">
      {isPastDeadline && (
        <div className="absolute top-0 right-0 bg-red-500/10 text-red-500 px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Locked
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold capitalize">{status.label}</h3>
        <div className="flex items-center text-sm text-muted-foreground gap-1 bg-muted px-2 py-1 rounded-md">
          <Clock className="w-4 h-4" />
          {status.time}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6 flex-1">
        Please confirm your attendance by {status.deadline} to help us prepare the right amount of food.
      </p>

      <div className="flex gap-3 mt-auto">
        <button
          disabled={isPastDeadline}
          onClick={() => onChoose(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
            choice === true
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : isPastDeadline
              ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
              : 'bg-muted hover:bg-emerald-500/20 text-foreground'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> Yes
        </button>
        <button
          disabled={isPastDeadline}
          onClick={() => onChoose(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
            choice === false
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : isPastDeadline
              ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
              : 'bg-muted hover:bg-red-500/20 text-foreground'
          }`}
        >
          <XCircle className="w-4 h-4" /> No
        </button>
      </div>
    </div>
  );
}
