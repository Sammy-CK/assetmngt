import React, { useState } from 'react';
import { 
  Plus, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  Package, 
  FileText, 
  Upload,
  Download,
  Eye
} from 'lucide-react';

const workflowTypes = [
  {
    id: 'new-asset',
    title: 'New Asset Registration',
    description: 'Register a new ICT asset and assign initial ownership',
    icon: Package,
    color: 'blue',
    steps: ['Asset Details', 'Initial Assignment', 'Document Upload', 'Approval']
  },
  {
    id: 'assignment',
    title: 'Asset Assignment',
    description: 'Assign an unassigned asset from ICT Store to an employee',
    icon: ArrowRight,
    color: 'green',
    steps: ['Select Asset', 'Choose Employee', 'Generate Form', 'Approval']
  },
  {
    id: 'surrender',
    title: 'Asset Surrender',
    description: 'Return an assigned asset back to ICT Store',
    icon: User,
    color: 'orange',
    steps: ['Asset Selection', 'Condition Check', 'Documentation', 'Approval']
  },
  {
    id: 'ownership-change',
    title: 'Change of Ownership',
    description: 'Transfer asset ownership from one employee to another',
    icon: User,
    color: 'purple',
    steps: ['Asset Selection', 'New Owner', 'Transfer Form', 'Dual Approval']
  }
];

const activeWorkflows = [
  {
    id: '1',
    type: 'Asset Assignment',
    asset: 'Dell Laptop - DL2024001',
    employee: 'John Smith',
    initiatedBy: 'John Doe',
    currentStep: 'Supervisor Approval',
    progress: 75,
    date: '2024-01-15',
    status: 'Pending Approval',
    approver: 'David Wilson'
  },
  {
    id: '2',
    type: 'Asset Surrender',
    asset: 'HP Printer - HP2023045',
    employee: 'Sarah Johnson',
    initiatedBy: 'Sarah Johnson',
    currentStep: 'ICT Review',
    progress: 50,
    date: '2024-01-14',
    status: 'In Progress',
    approver: 'John Doe'
  },
  {
    id: '3',
    type: 'Change of Ownership',
    asset: 'MacBook Pro - MB2023012',
    employee: 'Alex Rivera → Lisa Park',
    initiatedBy: 'John Doe',
    currentStep: 'Document Generation',
    progress: 25,
    date: '2024-01-13',
    status: 'In Progress',
    approver: 'Maria Garcia'
  }
];

export default function Workflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [showNewWorkflow, setShowNewWorkflow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      'Pending Approval': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600';
  };

  const startNewWorkflow = (workflow: any) => {
    setSelectedType(workflow);
    setShowNewWorkflow(true);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Asset Movement Workflows</h1>
        <p className="text-gray-600 mt-1">Manage asset assignments, surrenders, and ownership changes with automated workflows</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowTypes.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getColorClasses(workflow.color)}`}>
                <workflow.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workflow.title}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
            <button 
              onClick={() => startNewWorkflow(workflow)}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start Workflow
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Workflows */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Active Workflows</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {activeWorkflows.map((workflow) => (
                <div 
                  key={workflow.id} 
                  className={`p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                    selectedWorkflow?.id === workflow.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{workflow.type}</h3>
                      <p className="text-sm text-gray-600">{workflow.asset}</p>
                      <p className="text-xs text-gray-500 mt-1">Employee: {workflow.employee}</p>
                    </div>
                    <span className={getStatusBadge(workflow.status)}>
                      {workflow.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Current Step: {workflow.currentStep}</span>
                      <span>{workflow.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${workflow.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Initiated by {workflow.initiatedBy} on {workflow.date}</span>
                    <span>Approver: {workflow.approver}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Details */}
        <div>
          {selectedWorkflow ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedWorkflow.type}</h3>
                  <span className={getStatusBadge(selectedWorkflow.status)}>
                    {selectedWorkflow.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset</label>
                  <p className="text-sm text-gray-900">{selectedWorkflow.asset}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Employee</label>
                  <p className="text-sm text-gray-900">{selectedWorkflow.employee}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Step</label>
                  <p className="text-sm text-gray-900">{selectedWorkflow.currentStep}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Progress</label>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${selectedWorkflow.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{selectedWorkflow.progress}% Complete</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Approver</label>
                  <p className="text-sm text-gray-900">{selectedWorkflow.approver}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                
                {selectedWorkflow.status === 'Pending Approval' && (
                  <>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Workflow</h3>
                <p className="text-gray-600">Choose an active workflow to view its details and take necessary actions.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Workflow Modal */}
      {showNewWorkflow && selectedType && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getColorClasses(selectedType.color)}`}>
                    <selectedType.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedType.title}</h3>
                    <p className="text-sm text-gray-600">Step {currentStep + 1} of {selectedType.steps.length}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNewWorkflow(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Progress Steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {selectedType.steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStep 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      {index < selectedType.steps.length - 1 && (
                        <div className={`h-1 w-16 mx-2 ${
                          index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {selectedType.steps.map((step, index) => (
                    <span key={index} className="text-xs text-gray-500 text-center w-24">
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Step Content */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedType.steps[currentStep]}
                </h4>
                
                {currentStep === 0 && selectedType.id === 'assignment' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Select Asset</label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option>Dell Laptop - DL2024001 (ICT Store)</option>
                        <option>HP Monitor - HP2024002 (ICT Store)</option>
                        <option>Logitech Keyboard - LG2024003 (ICT Store)</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 1 && selectedType.id === 'assignment' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Select Employee</label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                        <option>John Smith - Finance Department</option>
                        <option>Alice Brown - HR Department</option>
                        <option>Mike Wilson - IT Department</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assignment Reason</label>
                      <textarea 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        rows={3}
                        placeholder="Enter reason for asset assignment..."
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Generated Assignment Form</label>
                      <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">Asset Assignment Form</p>
                              <p className="text-sm text-gray-500">Generated for John Smith - Dell Laptop DL2024001</p>
                            </div>
                          </div>
                          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Signed Form</label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              Upload a file
                            </span>
                            <span className="pl-1">or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-500">PDF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Approval</h3>
                    <p className="text-gray-600">
                      The workflow is complete and ready for supervisor approval. 
                      The approver will be notified automatically.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentStep < selectedType.steps.length - 1 ? (
                  <button 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowNewWorkflow(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Submit for Approval
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}