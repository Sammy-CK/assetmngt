import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import RoleIndicator from './RoleIndicator';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="h-6 w-px bg-gray-200 lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search assets, employees, transactions..."
              type="search"
            />
          </div>
          
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">JD</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <div className="flex items-center space-x-2">
                  <RoleIndicator role="ICT Supervisor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}