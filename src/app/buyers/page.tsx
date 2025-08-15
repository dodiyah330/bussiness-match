'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  TrendingUp,
  Heart,
  X,
  Eye,
  Filter,
  Grid,
  List,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface BuyerProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  investment_range: string
  experience_level: string
  preferred_industries: string[]
  timeline: string
  business_size: string
  location_preference: string
  liquid_capital: string
  risk_tolerance: string
  bio: string
  status: 'pending' | 'accepted' | 'rejected'
  profileImage?: string
}

const mockBuyers: BuyerProfile[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    investment_range: '1m-5m',
    experience_level: 'intermediate',
    preferred_industries: ['technology', 'healthcare'],
    timeline: '6-12 months',
    business_size: '10-50 employees',
    location_preference: 'United States',
    liquid_capital: '2m-5m',
    risk_tolerance: 'moderate',
    bio: 'Experienced entrepreneur looking to acquire a technology or healthcare business with strong growth potential.',
    status: 'pending',
    profileImage: '/images/profiles/john-smith.jpg'
  },
  {
    id: 2,
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@example.com',
    investment_range: '500k-1m',
    experience_level: 'beginner',
    preferred_industries: ['retail', 'food'],
    timeline: '3-6 months',
    business_size: '5-20 employees',
    location_preference: 'California',
    liquid_capital: '500k-1m',
    risk_tolerance: 'conservative',
    bio: 'First-time buyer seeking a stable retail or food business with established customer base.',
    status: 'pending',
    profileImage: '/images/profiles/sarah-johnson.jpg'
  },
  {
    id: 3,
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@example.com',
    investment_range: '5m-10m',
    experience_level: 'advanced',
    preferred_industries: ['manufacturing', 'logistics'],
    timeline: '12-18 months',
    business_size: '50-200 employees',
    location_preference: 'Texas',
    liquid_capital: '5m-10m',
    risk_tolerance: 'aggressive',
    bio: 'Serial entrepreneur with 15+ years experience in manufacturing. Looking for scalable operations.',
    status: 'pending',
    profileImage: '/images/profiles/michael-chen.jpg'
  },
  {
    id: 4,
    first_name: 'Emily',
    last_name: 'Davis',
    email: 'emily.davis@example.com',
    investment_range: '100k-500k',
    experience_level: 'beginner',
    preferred_industries: ['services', 'consulting'],
    timeline: '3-6 months',
    business_size: '1-10 employees',
    location_preference: 'New York',
    liquid_capital: '200k-500k',
    risk_tolerance: 'moderate',
    bio: 'Marketing professional looking to acquire a service-based business to leverage my expertise.',
    status: 'pending',
    profileImage: '/images/profiles/emily-davis.jpg'
  },
  {
    id: 5,
    first_name: 'David',
    last_name: 'Wilson',
    email: 'david.wilson@example.com',
    investment_range: '10m+',
    experience_level: 'advanced',
    preferred_industries: ['finance', 'real-estate'],
    timeline: '6-12 months',
    business_size: '200+ employees',
    location_preference: 'Florida',
    liquid_capital: '10m+',
    risk_tolerance: 'aggressive',
    bio: 'Private equity investor seeking large-scale opportunities in finance or real estate sectors.',
    status: 'pending',
    profileImage: '/images/profiles/david-wilson.jpg'
  }
]

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<BuyerProfile[]>([])
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerProfile | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')
  const [filterIndustry, setFilterIndustry] = useState<string>('all')
  const [filterRange, setFilterRange] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch buyer profiles from backend
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        
        if (!token) {
          setError('Authentication required')
          setLoading(false)
          return
        }

        const response = await fetch('http://localhost:5000/api/buyers', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          if (response.status === 403) {
            setError('Only sellers can view buyer profiles')
          } else {
            setError('Failed to fetch buyer profiles')
          }
          setLoading(false)
          return
        }

        const data = await response.json()
        // Add status field to each buyer (default to pending)
        const buyersWithStatus = data.map((buyer: any) => ({
          ...buyer,
          status: 'pending' as const
        }))
        setBuyers(buyersWithStatus)
        setError(null)
      } catch (err) {
        setError('Failed to fetch buyer profiles')
        console.error('Error fetching buyers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBuyers()
  }, [])

  const handleAccept = (buyerId: number) => {
    setBuyers(prev => prev.map(buyer => 
      buyer.id === buyerId ? { ...buyer, status: 'accepted' as const } : buyer
    ))
  }

  const handleReject = (buyerId: number) => {
    setBuyers(prev => prev.map(buyer => 
      buyer.id === buyerId ? { ...buyer, status: 'rejected' as const } : buyer
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-50'
      case 'rejected': return 'text-red-600 bg-red-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const filteredBuyers = buyers.filter(buyer => {
    if (filterStatus !== 'all' && buyer.status !== filterStatus) return false
    if (filterIndustry !== 'all' && !buyer.preferred_industries.includes(filterIndustry)) return false
    if (filterRange !== 'all' && buyer.investment_range !== filterRange) return false
    return true
  })

  const getProfileImage = (buyer: BuyerProfile) => {
    // Generate a placeholder image based on name
    const initials = `${buyer.first_name[0]}${buyer.last_name[0]}`
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
    const colorIndex = buyer.id % colors.length
    
    return (
      <div className={`w-16 h-16 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-lg`}>
        {initials}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buyer Profiles</h1>
              <p className="text-gray-600 mt-1">Review and connect with qualified buyers</p>
            </div>
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Industries</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="retail">Retail</option>
              <option value="food">Food</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="consulting">Consulting</option>
              <option value="finance">Finance</option>
              <option value="real-estate">Real Estate</option>
            </select>

            <select
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Ranges</option>
              <option value="100k-500k">$100K - $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-5m">$1M - $5M</option>
              <option value="5m-10m">$5M - $10M</option>
              <option value="10m+">$10M+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading buyer profiles...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-8 max-w-md mx-auto">
              <p className="text-red-800 text-lg font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuyers.map((buyer) => (
              <motion.div
                key={buyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    {getProfileImage(buyer)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {buyer.first_name} {buyer.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{buyer.email}</p>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(buyer.status)}`}>
                        {getStatusIcon(buyer.status)}
                        <span className="capitalize">{buyer.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{buyer.investment_range}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{buyer.locationPreference}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span>{buyer.businessSize}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {buyer.preferredIndustries.map((industry) => (
                      <span
                        key={industry}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">{buyer.bio}</p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedBuyer(buyer)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    {buyer.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(buyer.id)}
                          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(buyer.id)}
                          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBuyers.map((buyer) => (
              <motion.div
                key={buyer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-6">
                  {getProfileImage(buyer)}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {buyer.firstName} {buyer.lastName}
                        </h3>
                        <p className="text-gray-500">{buyer.email}</p>
                      </div>
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(buyer.status)}`}>
                        {getStatusIcon(buyer.status)}
                        <span className="capitalize">{buyer.status}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{buyer.investmentRange}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{buyer.locationPreference}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span>{buyer.businessSize}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{buyer.experienceLevel}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {buyer.preferredIndustries.map((industry) => (
                        <span
                          key={industry}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-gray-600">{buyer.bio}</p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => setSelectedBuyer(buyer)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    {buyer.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAccept(buyer.id)}
                          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(buyer.id)}
                          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredBuyers.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buyers found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>

      {/* Buyer Profile Modal */}
      <AnimatePresence>
        {selectedBuyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBuyer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedBuyer.firstName} {selectedBuyer.lastName}
                  </h2>
                  <button
                    onClick={() => setSelectedBuyer(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {getProfileImage(selectedBuyer)}
                    <div>
                      <p className="text-gray-600">{selectedBuyer.email}</p>
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedBuyer.status)}`}>
                        {getStatusIcon(selectedBuyer.status)}
                        <span className="capitalize">{selectedBuyer.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Investment Range</label>
                      <p className="text-gray-900">{selectedBuyer.investmentRange}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Experience Level</label>
                      <p className="text-gray-900">{selectedBuyer.experienceLevel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timeline</label>
                      <p className="text-gray-900">{selectedBuyer.timeline}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Business Size</label>
                      <p className="text-gray-900">{selectedBuyer.businessSize}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location Preference</label>
                      <p className="text-gray-900">{selectedBuyer.locationPreference}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Liquid Capital</label>
                      <p className="text-gray-900">{selectedBuyer.liquidCapital}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Risk Tolerance</label>
                      <p className="text-gray-900 capitalize">{selectedBuyer.riskTolerance}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Industries</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedBuyer.preferredIndustries.map((industry) => (
                        <span
                          key={industry}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <p className="text-gray-900 mt-2">{selectedBuyer.bio}</p>
                  </div>

                  {selectedBuyer.status === 'pending' && (
                    <div className="flex space-x-4 pt-6 border-t">
                      <button
                        onClick={() => {
                          handleAccept(selectedBuyer.id)
                          setSelectedBuyer(null)
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Accept Buyer</span>
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedBuyer.id)
                          setSelectedBuyer(null)
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                        <span>Reject Buyer</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
