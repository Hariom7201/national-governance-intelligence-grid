import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className, title, ...props }: { children: React.ReactNode, className?: string, title?: string, [key: string]: any }) => (
  <div className={cn("bg-white rounded-xl shadow-sm border border-slate-100 p-6", className)} {...props}>
    {title && <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>}
    {children}
  </div>
);

export const RiskBadge = ({ risk }: { risk: string }) => {
  const colors = {
    Low: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    High: "bg-red-100 text-red-700 border-red-200",
    Critical: "bg-red-200 text-red-900 border-red-300",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", colors[risk as keyof typeof colors])}>
      {risk}
    </span>
  );
};

export { cn };
