import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Package, 
  Users, 
  History, 
  FileText, 
  GitBranch,
  Shield,
  Settings
} from 'lucide-react';
import RoleIndicator from './RoleIndicator';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Assets', href: '/assets', icon: Package },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Transactions', href: '/transactions', icon: History },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Workflows', href: '/workflows', icon: GitBranch },
  { name: 'Admin', href: '/admin', icon: Settings },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">PSSF</h1>
              <p className="text-xs text-gray-500">Asset Management</p>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">ICT Department</p>
            </div>
          </div>
          <RoleIndicator role="ICT Supervisor" className="w-full justify-center" />
        </div>
      </div>
    </>
  );
}