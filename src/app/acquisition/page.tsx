'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Calculator, 
  MessageSquare, 
  Upload, 
  Download, 
  Eye,
  Brain,
  TrendingUp,
  Shield,
  Users,
  Building2,
  DollarSign,
  Calendar,
  Target,
  Zap,
  XCircle
} from 'lucide-react'
import Link from 'next/link'

interface DealStage {
  id: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
  tasks: Task[]
}

interface Task {
  id: string
  title: string
  status: 'completed' | 'pending' | 'in-progress'
  assignedTo: 'buyer' | 'seller' | 'both'
  priority: 'high' | 'medium' | 'low'
}

const dealStages: DealStage[] = [
  {
    id: '1',
    title: 'Initial Agreement',
    description: 'Establish mutual interest and basic terms',
    status: 'completed',
    tasks: [
      { id: '1-1', title: 'Sign Letter of Intent', status: 'completed', assignedTo: 'both', priority: 'high' },
      { id: '1-2', title: 'Set Timeline', status: 'completed', assignedTo: 'both', priority: 'medium' }
    ]
  },
  {
    id: '2',
    title: 'Due Diligence',
    description: 'Comprehensive review of business and financials',
    status: 'current',
    tasks: [
      { id: '2-1', title: 'Financial Review', status: 'in-progress', assignedTo: 'buyer', priority: 'high' },
      { id: '2-2', title: 'Legal Review', status: 'pending', assignedTo: 'buyer', priority: 'high' },
      { id: '2-3', title: 'Operational Review', status: 'pending', assignedTo: 'buyer', priority: 'medium' }
    ]
  },
  {
    id: '3',
    title: 'Negotiation',
    description: 'Finalize terms and structure',
    status: 'upcoming',
    tasks: [
      { id: '3-1', title: 'Price Negotiation', status: 'pending', assignedTo: 'both', priority: 'high' },
      { id: '3-2', title: 'Structure Agreement', status: 'pending', assignedTo: 'both', priority: 'high' }
    ]
  },
  {
    id: '4',
    title: 'Closing',
    description: 'Execute final documents and transfer ownership',
    status: 'upcoming',
    tasks: [
      { id: '4-1', title: 'Final Documentation', status: 'pending', assignedTo: 'both', priority: 'high' },
      { id: '4-2', title: 'Fund Transfer', status: 'pending', assignedTo: 'buyer', priority: 'high' },
      { id: '4-3', title: 'Ownership Transfer', status: 'pending', assignedTo: 'seller', priority: 'high' }
    ]
  }
]

export default function AcquisitionPage() {
  const [selectedStage, setSelectedStage] = useState<string>('2')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const currentStage = dealStages.find(stage => stage.id === selectedStage)
  const completedTasks = dealStages.flatMap(stage => stage.tasks).filter(task => task.status === 'completed').length
  const totalTasks = dealStages.flatMap(stage => stage.tasks).length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming': return 'bg-gray-100 text-gray-600 border-gray-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Acquisition Process</h1>
              <p className="text-gray-600 mt-1">TechFlow Solutions • Sarah Chen</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="btn-secondary">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Deal Progress</h2>
              <p className="text-gray-600">Overall completion: {completedTasks} of {totalTasks} tasks</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Deal Stages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Deal Stages</h3>
              
              <div className="space-y-6">
                {dealStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${index < dealStages.length - 1 ? 'pb-8' : ''}`}
                  >
                    {/* Stage Header */}
                    <div 
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedStage === stage.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedStage(stage.id)}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                        stage.status === 'current' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {stage.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{stage.title}</h4>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(stage.status)}`}>
                            {stage.status === 'completed' ? 'Completed' :
                             stage.status === 'current' ? 'In Progress' :
                             'Upcoming'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {stage.tasks.filter(t => t.status === 'completed').length} of {stage.tasks.length} tasks
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stage Tasks */}
                    {selectedStage === stage.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 ml-16 space-y-3"
                      >
                        {stage.tasks.map((task) => (
                          <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h5 className="font-medium text-gray-900">{task.title}</h5>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                                    {task.status === 'completed' ? 'Completed' :
                                     task.status === 'in-progress' ? 'In Progress' :
                                     'Pending'}
                                  </span>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {task.priority} priority
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Assigned to: {task.assignedTo}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {task.status === 'pending' && (
                                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                                    Start
                                  </button>
                                )}
                                {task.status === 'in-progress' && (
                                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                                    Complete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Connector Line */}
                    {index < dealStages.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-200" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Tools */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Tools</h3>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Financial Analyzer</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Document Summarizer</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Valuation Model</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Risk Assessment</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Upload Document</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Send Message</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
                </button>
              </div>
            </div>

            {/* Deal Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Company:</span>
                  <span className="font-medium">TechFlow Solutions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asking Price:</span>
                  <span className="font-medium">$2.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">$4.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">Q2 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="financial">Financial</option>
                    <option value="legal">Legal</option>
                    <option value="operational">Operational</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS up to 10MB</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
