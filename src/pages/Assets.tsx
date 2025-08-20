import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Eye, 
  UserPlus,
  Package,
  X
} from 'lucide-react';
const assets = [
  {
    id: '1',
    serialNumber: 'DL2023001',
    name: 'Dell Laptop Inspiron 15',
    category: 'Laptop',
    status: 'Assigned',
    owner: 'Sarah Johnson',
    location: 'HR Department',
    purchaseDate: '2023-03-15',
    condition: 'Good',
    description: 'High-performance laptop for daily office tasks',
    warranty: '3 years',
    supplier: 'Dell Technologies'
  },
  {
    id: '2',
    serialNumber: 'HP2023045',
    name: 'HP LaserJet Pro M404n',
    category: 'Printer',
    status: 'ICT Store',
    owner: '-',
    location: 'ICT Store Room',
    purchaseDate: '2023-05-22',
    condition: 'Excellent',
    description: 'Network printer for office use',
    warranty: '2 years',
    supplier: 'HP Inc.'
  },
  {
    id: '3',
    serialNumber: 'MB2023012',
    name: 'MacBook Pro 13"',
    category: 'Laptop',
    status: 'Assigned',
    owner: 'Alex Rivera',
    location: 'Marketing Department',
    purchaseDate: '2023-01-10',
    condition: 'Excellent',
    description: 'Premium laptop for creative work',
    warranty: '3 years',
    supplier: 'Apple Inc.'
  },
  {
    id: '4',
    serialNumber: 'MN2023089',
    name: 'Samsung Monitor 24"',
    category: 'Monitor',
    status: 'ICT Store',
    owner: '-',
    location: 'ICT Store Room',
    purchaseDate: '2023-07-03',
    condition: 'Good',
    description: '24-inch LED monitor',
    warranty: '2 years',
    supplier: 'Samsung Electronics'
  },
  {
    id: '5',
    serialNumber: 'KB2023156',
    name: 'Logitech Wireless Keyboard',
    category: 'Accessory',
    status: 'Depreciated',
    owner: 'Mike Chen',
    location: 'HR Department',
    purchaseDate: '2023-09-12',
    condition: 'Fair',
    description: 'Wireless keyboard and mouse combo',
    warranty: '1 year',
    supplier: 'Logitech'
  }
];

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || asset.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      'Assigned': 'bg-green-100 text-green-800',
      'ICT Store': 'bg-blue-100 text-blue-800',
      'Depreciated': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-600 mt-1">Manage and track all ICT assets in your organization</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Asset
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
                placeholder="Search by asset name, serial number, or owner..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Assigned">Assigned</option>
              <option value="ICT Store">ICT Store</option>
              <option value="Depreciated">Depreciated</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Monitor">Monitor</option>
              <option value="Printer">Printer</option>
              <option value="Accessory">Accessory</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{asset.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(asset.status)}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link 
                        to={`/assets/${asset.id}`}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <UserPlus className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg">
        <div className="flex items-center text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAssets.length}</span> of{' '}
          <span className="font-medium">{assets.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            Next
          </button>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Asset</h3>
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
                  <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter asset name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter serial number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Laptop</option>
                    <option>Desktop</option>
                    <option>Monitor</option>
                    <option>Printer</option>
                    <option>Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter description"></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Asset
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