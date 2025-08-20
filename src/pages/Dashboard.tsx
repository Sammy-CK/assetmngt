import React from 'react';
import { 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Activity
} from 'lucide-react';

const stats = [
  { 
    name: 'Total Assets', 
    value: '1,247', 
    change: '+12%', 
    changeType: 'increase',
    icon: Package,
    description: 'All ICT assets in system'
  },
  { 
    name: 'Assigned Assets', 
    value: '892', 
    change: '+8%', 
    changeType: 'increase',
    icon: Users,
    description: 'Currently with employees'
  },
  { 
    name: 'Available in Store', 
    value: '355', 
    change: '-4%', 
    changeType: 'decrease',
    icon: TrendingUp,
    description: 'Ready for assignment'
  },
  { 
    name: 'completed', 
    value: '23', 
    change: '+15%', 
    changeType: 'increase',
    icon: AlertTriangle,
    description: 'Awaiting supervisor approval'
  },
];

const recentTransactions = [
  {
    id: '1',
    type: 'Assignment',
    asset: 'Dell Laptop - DL2023001',
    employee: 'Sarah Johnson',
    department: 'HR',
    date: '2024-01-15',
    status: 'Completed',
    approver: 'David Wilson'
  },
  {
    id: '2',
    type: 'Surrender',
    asset: 'HP Printer - HP2023045',
    employee: 'Mike Chen',
    department: 'IT',
    date: '2024-01-14',
    status: 'Completed',
    approver: 'Jennifer Lee'
  },
  {
    id: '3',
    type: 'Redeployment',
    asset: 'MacBook Pro - MB2023012',
    employee: 'Alex Rivera',
    department: 'Marketing',
    date: '2024-01-13',
    status: 'Completed',
    approver: 'Maria Garcia'
  },
  {
    id: '4',
    type: 'Assignment',
    asset: 'Monitor - MN2023089',
    employee: 'Lisa Park',
    department: 'IT',
    date: '2024-01-12',
    status: 'Rejected',
    approver: 'John Doe'
  },
];

const quickActions = [
  {
    name: 'Register New Asset',
    description: 'Add a new ICT asset to the system',
    icon: Package,
    color: 'blue',
    href: '/workflows'
  },
  {
    name: 'Assign Asset',
    description: 'Assign an available asset to an employee',
    icon: Users,
    color: 'green',
    href: '/workflows'
  },
  {
    name: 'Generate Report',
    description: 'Create asset inventory or audit reports',
    icon: FileText,
    color: 'purple',
    href: '/reports'
  },
  {
    name: 'View Workflows',
    description: 'Monitor active asset movement workflows',
    icon: Activity,
    color: 'orange',
    href: '/workflows'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of PSSF ICT Asset Management System</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ml-1 ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {transaction.status === 'Completed' ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : transaction.status === 'Pending Approval' ? (
                          <Clock className="h-8 w-8 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.asset}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">Employee: {transaction.employee}</span>
                          <span className="text-xs text-gray-500">Dept: {transaction.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Pending Approval'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Approver: {transaction.approver}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
                >
                  <action.icon className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">{action.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assets Assigned Today</span>
                <span className="text-sm font-medium text-gray-900">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assets Surrendered</span>
                <span className="text-sm font-medium text-gray-900">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Approvals</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  3 pending
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Workflows</span>
                <span className="text-sm font-medium text-gray-900">15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}