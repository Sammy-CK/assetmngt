import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Employees from './pages/Employees';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Workflows from './pages/Workflows';
import Admin from './pages/Admin';
import AssetDetail from './pages/AssetDetail';
import EmployeeDetail from './pages/EmployeeDetail';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="lg:pl-64">
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/assets/:id" element={<AssetDetail />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/:id" element={<EmployeeDetail />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;