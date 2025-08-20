import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Package, 
  Building, 
  Mail,
  Phone,
  Calendar,
  Edit,
  Printer,
  History,
  MapPin
} from 'lucide-react';

// Dummy data for employees
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
    location: 'HR Department, Floor 2',
    assetHistory: [
      {
        id: 1,
        assetName: 'Dell Laptop Inspiron 15',
        serialNumber: 'DL2023001',
        status: 'Current',
        assignedDate: '2024-01-15',
        returnedDate: null,
        assignedBy: 'David Wilson'
      },
      {
        id: 2,
        assetName: 'Wireless Mouse',
        serialNumber: 'WM2023002',
        status: 'Current',
        assignedDate: '2024-01-15',
        returnedDate: null,
        assignedBy: 'David Wilson'
      },
      {
        id: 3,
        assetName: 'Monitor Stand',
        serialNumber: 'MS2023003',
        status: 'Current',
        assignedDate: '2024-01-15',
        returnedDate: null,
        assignedBy: 'David Wilson'
      },
      {
        id: 4,
        assetName: 'HP Printer',
        serialNumber: 'HP2023045',
        status: 'Returned',
        assignedDate: '2023-06-10',
        returnedDate: '2024-01-14',
        assignedBy: 'Jennifer Lee'
      }
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
    location: 'Marketing Department, Floor 3',
    assetHistory: [
      {
        id: 1,
        assetName: 'MacBook Pro 13"',
        serialNumber: 'MB2023012',
        status: 'Current',
        assignedDate: '2023-01-10',
        returnedDate: null,
        assignedBy: 'Maria Garcia'
      },
      {
        id: 2,
        assetName: 'iPad Pro',
        serialNumber: 'IP2023013',
        status: 'Current',
        assignedDate: '2023-01-10',
        returnedDate: null,
        assignedBy: 'Maria Garcia'
      }
    ]
  },
  {
    id: '3',
    name: 'Mike Chen',
    employeeId: 'EMP003',
    department: 'IT',
    position: 'Software Developer',
    email: 'mike.chen@pssf.gov',
    phone: '+1 (555) 345-6789',
    assetsCount: 1,
    supervisor: 'Jennifer Lee',
    joinDate: '2023-01-10',
    status: 'Active',
    location: 'IT Department, Floor 1',
    assetHistory: [
      {
        id: 1,
        assetName: 'Logitech Wireless Keyboard',
        serialNumber: 'KB2023156',
        status: 'Current',
        assignedDate: '2023-09-12',
        returnedDate: null,
        assignedBy: 'Jennifer Lee'
      }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    case 'Inactive':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  }
};

export default function EmployeeDetail() {
  const { id } = useParams();
  const employee = employees.find(e => e.id === id);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Employee not found</h3>
        <p className="mt-1 text-sm text-gray-500">The employee you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/employees"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/employees"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-sm text-gray-900">{employee.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <p className="text-sm text-gray-900">{employee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={getStatusBadge(employee.status)}>
                      {employee.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Supervisor</label>
                  <p className="text-sm text-gray-900">{employee.supervisor}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-sm text-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Join Date</label>
                  <p className="text-sm text-gray-900">{employee.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{employee.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset History */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Asset History</h2>
              <History className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {employee.assetHistory.map((asset, index) => (
                <div key={asset.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{asset.assetName}</p>
                    <p className="text-xs text-gray-500">Serial: {asset.serialNumber}</p>
                    <p className="text-xs text-gray-500">
                      {asset.assignedDate} - {asset.returnedDate || 'Present'}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      asset.status === 'Current' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {asset.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Edit className="mr-2 h-4 w-4" />
                Edit Employee
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Printer className="mr-2 h-4 w-4" />
                Print Details
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Package className="mr-2 h-4 w-4" />
                Assign Asset
              </button>
            </div>
          </div>

          {/* Employee Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Current Assets</span>
                <span className="text-sm font-medium text-gray-900">
                  {employee.assetHistory.filter(a => a.status === 'Current').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Assets Assigned</span>
                <span className="text-sm font-medium text-gray-900">{employee.assetHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Days Employed</span>
                <span className="text-sm font-medium text-gray-900">285 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
