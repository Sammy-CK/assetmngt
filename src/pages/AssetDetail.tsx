import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  Calendar,
  Shield,
  Edit,
  Printer,
  History
} from 'lucide-react';

// Dummy data for assets
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
    supplier: 'Dell Technologies',
    ownershipHistory: [
      {
        id: 1,
        owner: 'Sarah Johnson',
        department: 'HR',
        startDate: '2024-01-15',
        endDate: null,
        status: 'Current',
        assignedBy: 'David Wilson'
      },
      {
        id: 2,
        owner: 'Mike Chen',
        department: 'IT',
        startDate: '2023-06-10',
        endDate: '2024-01-14',
        status: 'Previous',
        assignedBy: 'Jennifer Lee'
      },
      {
        id: 3,
        owner: 'ICT Store',
        department: 'ICT',
        startDate: '2023-03-15',
        endDate: '2023-06-09',
        status: 'Previous',
        assignedBy: 'System'
      }
    ]
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
    supplier: 'HP Inc.',
    ownershipHistory: [
      {
        id: 1,
        owner: 'ICT Store',
        department: 'ICT',
        startDate: '2023-05-22',
        endDate: null,
        status: 'Current',
        assignedBy: 'System'
      }
    ]
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
    supplier: 'Apple Inc.',
    ownershipHistory: [
      {
        id: 1,
        owner: 'Alex Rivera',
        department: 'Marketing',
        startDate: '2023-01-10',
        endDate: null,
        status: 'Current',
        assignedBy: 'Maria Garcia'
      }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Assigned':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    case 'ICT Store':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
    case 'Depreciated':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  }
};

export default function AssetDetail() {
  const { id } = useParams();
  const asset = assets.find(a => a.id === id);

  if (!asset) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Asset not found</h3>
        <p className="mt-1 text-sm text-gray-500">The asset you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/assets"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Assets
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
            to="/assets"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
            <p className="text-sm text-gray-500">Serial: {asset.serialNumber}</p>
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
        {/* Asset Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-sm text-gray-900">{asset.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={getStatusBadge(asset.status)}>
                      {asset.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Owner</label>
                  <p className="text-sm text-gray-900">{asset.owner}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{asset.location}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                  <p className="text-sm text-gray-900">{asset.purchaseDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Warranty</label>
                  <p className="text-sm text-gray-900">{asset.warranty}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Supplier</label>
                  <p className="text-sm text-gray-900">{asset.supplier}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Condition</label>
                  <p className="text-sm text-gray-900">{asset.condition}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-sm text-gray-900 mt-1">{asset.description}</p>
            </div>
          </div>

          {/* Ownership History */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Ownership History</h2>
              <History className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {asset.ownershipHistory.map((history, index) => (
                <div key={history.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{history.owner}</p>
                    <p className="text-xs text-gray-500">{history.department}</p>
                    <p className="text-xs text-gray-500">
                      {history.startDate} - {history.endDate || 'Present'}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      history.status === 'Current' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {history.status}
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
                Edit Asset
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Printer className="mr-2 h-4 w-4" />
                Print Details
              </button>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Package className="mr-2 h-4 w-4" />
                Transfer Asset
              </button>
            </div>
          </div>

          {/* Asset Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Assignments</span>
                <span className="text-sm font-medium text-gray-900">{asset.ownershipHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Current Assignment</span>
                <span className="text-sm font-medium text-gray-900">
                  {asset.ownershipHistory.find(h => h.status === 'Current')?.startDate || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Days in Service</span>
                <span className="text-sm font-medium text-gray-900">285 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
