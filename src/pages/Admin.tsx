import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  Shield, 
  RotateCcw, 
  Eye, 
  Edit, 
  Trash2,
  X,
  UserPlus,
  Settings
} from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@pssf.gov',
    role: 'ICT Supervisor',
    department: 'IT',
    status: 'Active',
    createdBy: 'Admin',
    createdDate: '2023-01-15',
    lastLogin: '2024-01-15 09:30'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@pssf.gov',
    role: 'ICT Officer',
    department: 'IT',
    status: 'Active',
    createdBy: 'John Doe',
    createdDate: '2023-03-20',
    lastLogin: '2024-01-14 14:22'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.wilson@pssf.gov',
    role: 'ICT Officer',
    department: 'IT',
    status: 'Inactive',
    createdBy: 'John Doe',
    createdDate: '2023-06-10',
    lastLogin: '2023-12-20 11:45'
  }
];

const reversalRequests = [
  {
    id: '1',
    transactionId: 'TXN001',
    type: 'Asset Assignment',
    asset: 'Dell Laptop - DL2023001',
    employee: 'Alex Rivera',
    originalApprover: 'David Wilson',
    reason: 'Incorrect employee assignment',
    requestedBy: 'John Doe',
    requestDate: '2024-01-15',
    status: 'Pending'
  },
  {
    id: '2',
    transactionId: 'TXN002',
    type: 'Asset Surrender',
    asset: 'HP Printer - HP2023045',
    employee: 'Lisa Park',
    originalApprover: 'Jennifer Lee',
    reason: 'Asset was not actually surrendered',
    requestedBy: 'Sarah Johnson',
    requestDate: '2024-01-14',
    status: 'Approved'
  }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showRoleAssignModal, setShowRoleAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'
      : 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
  };

  const getRoleBadge = (role: string) => {
    return role === 'ICT Supervisor'
      ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'
      : 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-1">Manage users, roles, and system operations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 mr-2 inline" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab('reversals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reversals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <RotateCcw className="h-4 w-4 mr-2 inline" />
              Transaction Reversals
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-4 w-4 mr-2 inline" />
              Role Assignment
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">System Users</h2>
                <button 
                  onClick={() => setShowCreateUserModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getRoleBadge(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(user.status)}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transaction Reversals Tab */}
          {activeTab === 'reversals' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Transaction Reversal Requests</h2>
              </div>

              <div className="space-y-4">
                {reversalRequests.map((request) => (
                  <div key={request.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <RotateCcw className="h-5 w-5 text-orange-600" />
                          <h3 className="text-lg font-semibold text-gray-900">{request.type} Reversal</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><span className="font-medium">Transaction ID:</span> {request.transactionId}</p>
                            <p><span className="font-medium">Asset:</span> {request.asset}</p>
                            <p><span className="font-medium">Employee:</span> {request.employee}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Original Approver:</span> {request.originalApprover}</p>
                            <p><span className="font-medium">Requested By:</span> {request.requestedBy}</p>
                            <p><span className="font-medium">Request Date:</span> {request.requestDate}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm"><span className="font-medium">Reason:</span> {request.reason}</p>
                        </div>
                      </div>
                      {request.status === 'Pending' && (
                        <div className="flex space-x-2 ml-4">
                          <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                            Approve
                          </button>
                          <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Assignment Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Role Assignment</h2>
                <button 
                  onClick={() => setShowRoleAssignModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Assign Role
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ICT Supervisor</h3>
                      <p className="text-sm text-gray-600">Full system access and approval authority</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {users.filter(u => u.role === 'ICT Supervisor').map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className={getStatusBadge(user.status)}>{user.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ICT Officer</h3>
                      <p className="text-sm text-gray-600">Asset management and workflow initiation</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {users.filter(u => u.role === 'ICT Officer').map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className={getStatusBadge(user.status)}>{user.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
                <button 
                  onClick={() => setShowCreateUserModal(false)}
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
                  <input 
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="user@pssf.gov"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>ICT Officer</option>
                    <option>ICT Supervisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>IT</option>
                    <option>HR</option>
                    <option>Operations</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
                  <input 
                    type="password" 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter temporary password"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create User
                </button>
                <button 
                  onClick={() => setShowCreateUserModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Modal */}
      {showRoleAssignModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Assign Role</h3>
                <button 
                  onClick={() => setShowRoleAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select User</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name} - {user.email}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Role</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>ICT Officer</option>
                    <option>ICT Supervisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason for Change</label>
                  <textarea 
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    rows={3}
                    placeholder="Enter reason for role change..."
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowRoleAssignModal(false)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Assign Role
                </button>
                <button 
                  onClick={() => setShowRoleAssignModal(false)}
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