import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  UserCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  User,
  History
} from 'lucide-react';

const transactions = [
  {
    id: '1',
    type: 'Assignment',
    asset: {
      name: 'Dell Laptop Inspiron 15',
      serialNumber: 'DL2023001'
    },
    employee: {
      name: 'Sarah Johnson',
      id: 'EMP001'
    },
    initiatedBy: 'John Doe',
    date: '2024-01-15',
    status: 'Completed',
    approver: 'David Wilson',
    notes: 'Standard laptop assignment for new hire'
  },
  {
    id: '2',
    type: 'Surrender',
    asset: {
      name: 'HP LaserJet Pro M404n',
      serialNumber: 'HP2023045'
    },
    employee: {
      name: 'Mike Chen',
      id: 'EMP003'
    },
    initiatedBy: 'Mike Chen',
    date: '2024-01-14',
    status: 'Completed',
    approver: 'Jennifer Lee',
    notes: 'Employee resignation - asset return'
  },
  {
    id: '3',
    type: 'Redeployment',
    asset: {
      name: 'MacBook Pro 13"',
      serialNumber: 'MB2023012'
    },
    employee: {
      name: 'Alex Rivera',
      id: 'EMP002'
    },
    initiatedBy: 'John Doe',
    date: '2024-01-13',
    status: 'Completed',
    approver: 'Maria Garcia',
    notes: 'Upgraded from previous laptop model'
  },
  {
    id: '4',
    type: 'Assignment',
    asset: {
      name: 'Samsung Monitor 24"',
      serialNumber: 'MN2023089'
    },
    employee: {
      name: 'Lisa Park',
      id: 'EMP004'
    },
    initiatedBy: 'John Doe',
    date: '2024-01-12',
    status: 'Completed',
    approver: 'John Doe',
    notes: 'Additional monitor for development work'
  },
  {
    id: '5',
    type: 'Change of Ownership',
    asset: {
      name: 'Logitech Wireless Keyboard',
      serialNumber: 'KB2023156'
    },
    employee: {
      name: 'Robert Brown',
      id: 'EMP005'
    },
    initiatedBy: 'Carol Smith',
    date: '2024-01-10',
    status: 'Rejected',
    approver: 'Carol Smith',
    notes: 'Employee already has similar equipment'
  }
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || transaction.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || transaction.status === selectedStatus;
    const isCompleted = transaction.status === 'Completed' || transaction.status === 'Rejected';
    
    return matchesSearch && matchesType && matchesStatus && isCompleted;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending Approval':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'In Progress':
        return <RefreshCw className="h-5 w-5 text-blue-600" />;
      case 'Rejected':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending Approval': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Assignment':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'Surrender':
        return <ArrowDownLeft className="h-4 w-4 text-red-600" />;
      case 'Redeployment':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case 'Change of Ownership':
        return <UserCheck className="h-4 w-4 text-purple-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transaction Audit Logs</h1>
        <p className="text-gray-600 mt-1">Track all asset movements and changes with complete audit trails</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by asset, serial number, or employee..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Assignment">Assignment</option>
              <option value="Surrender">Surrender</option>
              <option value="Redeployment">Redeployment</option>
              <option value="Change of Ownership">Change of Ownership</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className={`p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                    selectedTransaction?.id === transaction.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(transaction.type)}
                          <h3 className="text-sm font-semibold text-gray-900">{transaction.type}</h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{transaction.asset.name}</p>
                        <p className="text-xs text-gray-500">{transaction.asset.serialNumber}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {transaction.employee.name}
                          </span>
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div>
          {selectedTransaction ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                {getStatusIcon(selectedTransaction.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTransaction.type}</h3>
                  <span className={getStatusBadge(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.asset.name}</p>
                  <p className="text-xs text-gray-500">{selectedTransaction.asset.serialNumber}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Employee</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.employee.name}</p>
                  <p className="text-xs text-gray-500">{selectedTransaction.employee.id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Initiated By</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.initiatedBy}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.date}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Approver</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.approver}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.notes}</p>
                </div>
              </div>

              {selectedTransaction.status === 'Pending Approval' && (
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-8">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Transaction</h3>
                <p className="text-gray-600">Click on a transaction from the list to view detailed information and audit trail.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}