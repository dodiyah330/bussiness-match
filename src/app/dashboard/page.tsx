'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { 
  Heart, 
  X, 
  User, 
  DollarSign, 
  Building2, 
  MapPin, 
  Clock, 
  Star,
  ArrowLeft,
  MessageCircle,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'

interface BuyerProfile {
  id: string
  firstName: string
  lastName: string
  investmentRange: string
  experienceLevel: string
  preferredIndustries: string[]
  timeline: string
  businessSize: string
  locationPreference: string
  liquidCapital: string
  riskTolerance: string
  bio: string
  matchScore: number
  lastActive: string
  verified: boolean
}

const mockBuyers: BuyerProfile[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Chen',
    investmentRange: '$1M - $5M',
    experienceLevel: 'Experienced business owner',
    preferredIndustries: ['Technology', 'Healthcare'],
    timeline: 'Short-term (3-6 months)',
    businessSize: 'Medium (50-200 employees)',
    locationPreference: 'National',
    liquidCapital: '$1M - $5M',
    riskTolerance: 'Moderate',
    bio: 'Serial entrepreneur with 15+ years experience in tech and healthcare. Looking for established businesses with strong cash flow and growth potential.',
    matchScore: 94,
    lastActive: '2 hours ago',
    verified: true
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    investmentRange: '$500K - $1M',
    experienceLevel: 'Serial investor',
    preferredIndustries: ['Manufacturing', 'Services'],
    timeline: 'Immediate (0-3 months)',
    businessSize: 'Small (10-50 employees)',
    locationPreference: 'Local/Regional',
    liquidCapital: '$500K - $1M',
    riskTolerance: 'Conservative',
    bio: 'Former corporate executive seeking to transition into business ownership. Prefer established businesses with proven track records.',
    matchScore: 87,
    lastActive: '1 day ago',
    verified: true
  },
  {
    id: '3',
    firstName: 'Jennifer',
    lastName: 'Thompson',
    investmentRange: '$5M - $10M',
    experienceLevel: 'Corporate executive',
    preferredIndustries: ['Finance', 'Real Estate'],
    timeline: 'Medium-term (6-12 months)',
    businessSize: 'Large (200+ employees)',
    locationPreference: 'International',
    liquidCapital: '$5M+',
    riskTolerance: 'Conservative',
    bio: 'Private equity professional with deep experience in manufacturing and real estate. Seeking scalable opportunities with strong management teams.',
    matchScore: 91,
    lastActive: '3 hours ago',
    verified: true
  }
]

export default function DashboardPage() {
  const [buyers, setBuyers] = useState<BuyerProfile[]>(mockBuyers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showProfile, setShowProfile] = useState(false)

  const handleAccept = () => {
    setDirection(1)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(0)
    }, 200)
  }

  const handleReject = () => {
    setDirection(-1)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(0)
    }, 200)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      handleAccept()
    } else if (info.offset.x < -swipeThreshold) {
      handleReject()
    }
  }

  const currentBuyer = buyers[currentIndex]

  if (!currentBuyer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No More Profiles</h2>
          <p className="text-gray-600 mb-6">Check back later for new buyer profiles!</p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="btn-primary"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">BusinessMatch</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto pt-8 px-4">
        {/* Profile Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBuyer.id}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: direction * 300
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              x: direction * -300
            }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Profile Image Placeholder */}
            <div className="h-96 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-24 h-24 text-white opacity-50" />
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">{currentBuyer.matchScore}% Match</span>
              </div>
              {currentBuyer.verified && (
                <div className="absolute top-4 left-4 bg-blue-500 rounded-full p-2">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentBuyer.firstName} {currentBuyer.lastName}
                </h2>
                <span className="text-sm text-gray-500">{currentBuyer.lastActive}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{currentBuyer.investmentRange}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{currentBuyer.experienceLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{currentBuyer.locationPreference}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{currentBuyer.timeline}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Interested Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {currentBuyer.preferredIndustries.map((industry, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {currentBuyer.bio}
              </p>

              <button
                onClick={() => setShowProfile(true)}
                className="w-full text-center text-pink-600 font-medium text-sm hover:text-pink-700"
              >
                View Full Profile
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReject}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-red-300"
          >
            <X className="w-8 h-8 text-red-500" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAccept}
            className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white fill-current" />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {buyers.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Full Profile</h2>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Investment Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Range:</span>
                        <p className="font-medium">{currentBuyer.investmentRange}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Liquid Capital:</span>
                        <p className="font-medium">{currentBuyer.liquidCapital}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Risk Tolerance:</span>
                        <p className="font-medium">{currentBuyer.riskTolerance}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Business Size:</span>
                        <p className="font-medium">{currentBuyer.businessSize}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Experience & Timeline</h3>
                    <p className="text-sm text-gray-600 mb-2">{currentBuyer.experienceLevel}</p>
                    <p className="text-sm text-gray-600">{currentBuyer.timeline}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{currentBuyer.bio}</p>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleReject}
                    className="flex-1 btn-secondary"
                  >
                    Pass
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 btn-primary"
                  >
                    Connect
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

