import React from 'react';
import { Shield, User } from 'lucide-react';

interface RoleIndicatorProps {
  role: 'ICT Officer' | 'ICT Supervisor';
  className?: string;
}

export default function RoleIndicator({ role, className = '' }: RoleIndicatorProps) {
  const isSuper = role === 'ICT Supervisor';
  
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      isSuper 
        ? 'bg-purple-100 text-purple-800' 
        : 'bg-blue-100 text-blue-800'
    } ${className}`}>
      {isSuper ? (
        <Shield className="h-3 w-3 mr-1" />
      ) : (
        <User className="h-3 w-3 mr-1" />
      )}
      {role}
    </div>
  );
}