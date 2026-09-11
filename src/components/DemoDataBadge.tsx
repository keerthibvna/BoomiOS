import React from 'react';
import { Database, Info } from 'lucide-react';

interface DemoDataBadgeProps {
  label?: string;
  className?: string;
}

export const DemoDataBadge: React.FC<DemoDataBadgeProps> = ({ 
  label = "Demonstration Dataset", 
  className = "" 
}) => {
  return (
    <span 
      id="demo-data-indicator-badge"
      title="Sample data for demonstration and simulation purposes under SIH guidelines. Not official government publication."
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs select-none ${className}`}
    >
      <Database className="w-3 h-3 text-amber-600" />
      <span>{label}</span>
      <Info className="w-3 h-3 text-amber-500 opacity-80" />
    </span>
  );
};
