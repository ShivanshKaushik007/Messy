'use client';

import React from 'react';
import { Receipt, Search, Download, FileText } from 'lucide-react';

// Mock student data
const students = [
  { id: 'STU001', name: 'Aarav Patel', room: '101', meals: 42, bill: 2100 },
  { id: 'STU002', name: 'Riya Sharma', room: '102', meals: 38, bill: 1900 },
  { id: 'STU003', name: 'Kabir Singh', room: '105', meals: 45, bill: 2250 },
  { id: 'STU004', name: 'Ananya Gupta', room: '201', meals: 30, bill: 1500 },
  { id: 'STU005', name: 'Arjun Verma', room: '204', meals: 40, bill: 2000 },
];

export default function AdminBilling() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance & Billing</h1>
          <p className="text-muted-foreground mt-2">Manage student attendance and generate monthly bills.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Receipt className="w-4 h-4" /> Generate All Bills
          </button>
        </div>
      </header>

      <div className="glass-panel rounded-2xl overflow-hidden border border-border/50 shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-4 bg-muted/30">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search student by name or ID..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <div className="text-sm text-muted-foreground ml-auto">
            Showing {students.length} records
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Student ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Room</th>
                <th className="p-4 font-semibold text-right">Meals Attended</th>
                <th className="p-4 font-semibold text-right">Estimated Bill (₹)</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="p-4 font-mono text-sm">{student.id}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4">{student.room}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center justify-center bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                      {student.meals}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold">
                    ₹{student.bill.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
