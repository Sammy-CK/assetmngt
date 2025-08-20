import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Package,
  User,
  Building,
  X
} from 'lucide-react';

const employees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    employeeId: 'EMP001',
    department: 'HR',
    position: 'HR Specialist',
    email: 'sarah.johnson@pssf.gov',
    phone: '+1 (555) 123-4567',
    assetsCount: 3,
    supervisor: 'David Wilson',
    joinDate: '2022-03-15',
    status: 'Active',
    assets: [
      { name: 'Dell Laptop', serialNumber: 'DL2023001', status: 'Assigned' },
      { name: 'Wireless Mouse', serialNumber: 'WM2023002', status: 'Assigned' },
      { name: 'Monitor Stand', serialNumber: 'MS2023003', status: 'Assigned' }
    ]
  },
  {
    id: '2',
    name: 'Alex Rivera',
    employeeId: 'EMP002',
    department: 'Marketing',
    position: 'Marketing Manager',
    email: 'alex.rivera@pssf.gov',
    phone: '+1 (555) 234-5678',
    assetsCount: 2,
    supervisor: 'Maria Garcia',
    joinDate: '2021-08-22',
    status: 'Active',
    assets: [
      { name: 'MacBook Pro', serialNumber: 'MB2023012', status: 'Assigned' },
      { name: 'iPad Pro', serialNumber: 'IP2023013', status: 'Assigned' }
    ]
  },
  {
    id: '3',
    name: 'Mike Chen',
    employeeId: 'EMP003',
    department: 'HR',
    position: 'HR Specialist',
    email: 'mike.chen@pssf.gov',
    phone: '+1 (555) 345-6789',
    assetsCount: 1,
    supervisor: 'Jennifer Lee',
    joinDate: '2023-01-10',
    status: 'Active',
    assets: [
      { name: 'Logitech Keyboard', serialNumber: 'KB2023156', status: 'Assigned' }
    ]
  },
  {
    id: '4',
    name: 'Lisa Park',
    employeeId: 'EMP004',
    department: 'IT',
    position: 'Software Developer',
    email: 'lisa.park@pssf.gov',
    phone: '+1 (555) 456-7890',
    assetsCount: 4,
    supervisor: 'John Doe',
    joinDate: '2022-11-03',
    status: 'Active',
    assets: [
      { name: 'Development Laptop', serialNumber: 'DV2023014', status: 'Assigned' },
      { name: 'External Monitor', serialNumber: 'EM2023015', status: 'Assigned' },
      { name: 'Mechanical Keyboard', serialNumber: 'MK2023016', status: 'Assigned' },
      { name: 'Graphics Tablet', serialNumber: 'GT2023017', status: 'Assigned' }
    ]
  },
  {
    id: '5',
    name: 'Robert Brown',
    employeeId: 'EMP005',
    department: 'Operations',
    position: 'Operations Coordinator',
    email: 'robert.brown@pssf.gov',
    phone: '+1 (555) 567-8901',
    assetsCount: 0,
    supervisor: 'Carol Smith',
    joinDate: '2023-06-15',
    status: 'Inactive',
    assets: []
  }
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'
      : 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage employee profiles and their asset assignments</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, employee ID, or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employee Directory</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEmployees.map((employee) => (
            <Link 
              key={employee.id} 
              to={`/employees/${employee.id}`}
              className="p-6 hover:bg-gray-50 transition-colors duration-200 block"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{employee.employeeId}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        {employee.department}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Package className="h-3 w-3 mr-1" />
                        {employee.assetsCount} assets
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={getStatusBadge(employee.status)}>
                    {employee.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter employee ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter position" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>HR</option>
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email" />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Employee
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}