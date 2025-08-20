import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Package,
  Users,
  Clock
} from 'lucide-react';

const reportTemplates = [
  {
    id: '1',
    name: 'Asset Inventory Report',
    description: 'Complete listing of all ICT assets with current status and ownership',
    category: 'Inventory',
    lastGenerated: '2024-01-15',
    icon: Package,
    color: 'blue'
  },
  {
    id: '2',
    name: 'Asset Assignment History',
    description: 'Historical view of asset assignments and ownership changes',
    category: 'Audit',
    lastGenerated: '2024-01-14',
    icon: Clock,
    color: 'green'
  },
  {
    id: '3',
    name: 'Employee Asset Summary',
    description: 'Assets currently assigned to each employee',
    category: 'Personnel',
    lastGenerated: '2024-01-13',
    icon: Users,
    color: 'purple'
  },
  {
    id: '4',
    name: 'Asset Utilization Analysis',
    description: 'Analysis of asset usage patterns and efficiency metrics',
    category: 'Analytics',
    lastGenerated: '2024-01-12',
    icon: TrendingUp,
    color: 'orange'
  },
];

const recentReports = [
  {
    id: '1',
    name: 'Monthly Asset Inventory - January 2024',
    type: 'Asset Inventory Report',
    generatedBy: 'John Doe',
    date: '2024-01-15',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'Q4 2023 Asset Utilization Analysis',
    type: 'Asset Utilization Analysis',
    generatedBy: 'Sarah Johnson',
    date: '2024-01-14',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: '3',
    name: 'Employee Asset Assignments - Current',
    type: 'Employee Asset Summary',
    generatedBy: 'John Doe',
    date: '2024-01-13',
    size: '956 KB',
    format: 'PDF'
  }
];

const quickStats = [
  { label: 'Reports Generated', value: '47', change: '+12%', trend: 'up' },
  { label: 'Active Templates', value: '4', change: '0%', trend: 'neutral' },
  { label: 'Assets Tracked', value: '1,247', change: '+5%', trend: 'up' },
  { label: 'Employees', value: '156', change: '+2%', trend: 'up' }
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const categories = ['All', 'Inventory', 'Audit', 'Personnel', 'Analytics', 'Compliance', 'Planning'];

  const filteredTemplates = reportTemplates.filter(template => 
    selectedCategory === 'All' || template.category === selectedCategory
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
      red: 'bg-red-50 text-red-600',
      indigo: 'bg-indigo-50 text-indigo-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive reports for asset management and compliance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Report Templates</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {filteredTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedTemplate?.id === template.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconColorClasses(template.color)}`}>
                          <template.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(template.color)}`}>
                              {template.category}
                            </span>
                            <span className="text-xs text-gray-500">Last generated: {template.lastGenerated}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowGenerateModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                        <p className="text-xs text-gray-500">{report.type}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>By {report.generatedBy}</span>
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {report.format}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Preview/Config */}
        <div>
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconColorClasses(selectedTemplate.color)}`}>
                  <selectedTemplate.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTemplate.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(selectedTemplate.color)}`}>
                    {selectedTemplate.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedTemplate.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Generated</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedTemplate.lastGenerated}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Report Parameters</label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Date Range</label>
                      <select className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Format</label>
                      <select className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Include</label>
                      <div className="mt-1 space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Asset details</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Ownership history</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                          <span className="ml-2 text-sm text-gray-700">Financial data</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowGenerateModal(true)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report Template</h3>
                <p className="text-gray-600">Choose a report template from the list to configure and generate reports for asset management and compliance.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Asset Inventory Report</h4>
                  <p className="text-sm text-gray-600">PDF format • Last 30 days</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This report will include all ICT assets with current status and ownership information. 
                The report will be generated and stored in the EDMS for secure access.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowGenerateModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Generate
                </button>
                <button 
                  onClick={() => setShowGenerateModal(false)}
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