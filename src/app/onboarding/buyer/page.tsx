'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Building2, DollarSign, Target, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface BuyerFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Investment Profile
  investmentRange: string
  experienceLevel: string
  preferredIndustries: string[]
  timeline: string
  
  // Business Preferences
  businessSize: string
  locationPreference: string
  dealStructure: string[]
  
  // Financial Capacity
  liquidCapital: string
  financingPreference: string
  riskTolerance: string
}

const initialFormData: BuyerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  investmentRange: '',
  experienceLevel: '',
  preferredIndustries: [],
  timeline: '',
  businessSize: '',
  locationPreference: '',
  dealStructure: [],
  liquidCapital: '',
  financingPreference: '',
  riskTolerance: ''
}

export default function BuyerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BuyerFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 1, title: 'Personal Info', icon: <Users className="w-5 h-5" /> },
    { id: 2, title: 'Investment Profile', icon: <DollarSign className="w-5 h-5" /> },
    { id: 3, title: 'Business Preferences', icon: <Building2 className="w-5 h-5" /> },
    { id: 4, title: 'Financial Capacity', icon: <TrendingUp className="w-5 h-5" /> }
  ]

  const handleInputChange = (field: keyof BuyerFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please log in again')
        return
      }

      // Prepare the data for the API
      const profileData = {
        investmentRange: formData.investmentRange,
        experienceLevel: formData.experienceLevel,
        preferredIndustries: formData.preferredIndustries,
        timeline: formData.timeline,
        businessSize: formData.businessSize,
        locationPreference: formData.locationPreference,
        liquidCapital: formData.liquidCapital,
        riskTolerance: formData.riskTolerance,
        bio: `Looking to acquire a business in ${formData.preferredIndustries.join(', ')} with ${formData.investmentRange} investment range.`
      }

      // Submit to the profile API
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        // Success! Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to save profile')
      }
    } catch (error) {
      console.error('Profile submission error:', error)
      alert('Failed to save profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Let's start with some basic information to personalize your experience.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="input-field"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="input-field"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Investment Profile</h2>
              <p className="text-gray-600">Help us understand your investment goals and experience.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Range</label>
              <select
                value={formData.investmentRange}
                onChange={(e) => handleInputChange('investmentRange', e.target.value)}
                className="input-field"
              >
                <option value="">Select investment range</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="10m+">$10M+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className="input-field"
              >
                <option value="">Select experience level</option>
                <option value="first-time">First-time business buyer</option>
                <option value="experienced">Experienced business owner</option>
                <option value="investor">Serial investor</option>
                <option value="corporate">Corporate executive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Industries</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 'Food & Beverage', 'Real Estate', 'Finance', 'Education'].map((industry) => (
                  <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredIndustries.includes(industry)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('preferredIndustries', [...formData.preferredIndustries, industry])
                        } else {
                          handleInputChange('preferredIndustries', formData.preferredIndustries.filter(i => i !== industry))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline to Purchase</label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="input-field"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediate (0-3 months)</option>
                <option value="short-term">Short-term (3-6 months)</option>
                <option value="medium-term">Medium-term (6-12 months)</option>
                <option value="long-term">Long-term (1+ years)</option>
              </select>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Preferences</h2>
              <p className="text-gray-600">What type of business are you looking for?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Size</label>
              <select
                value={formData.businessSize}
                onChange={(e) => handleInputChange('businessSize', e.target.value)}
                className="input-field"
              >
                <option value="">Select business size</option>
                <option value="startup">Startup (0-10 employees)</option>
                <option value="small">Small (10-50 employees)</option>
                <option value="medium">Medium (50-200 employees)</option>
                <option value="large">Large (200+ employees)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Preference</label>
              <select
                value={formData.locationPreference}
                onChange={(e) => handleInputChange('locationPreference', e.target.value)}
                className="input-field"
              >
                <option value="">Select location preference</option>
                <option value="local">Local/Regional</option>
                <option value="national">National</option>
                <option value="international">International</option>
                <option value="remote">Remote/Online</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deal Structure Preferences</label>
              <div className="grid grid-cols-2 gap-3">
                {['Asset Purchase', 'Stock Purchase', 'Merger', 'Joint Venture', 'Management Buyout', 'Earnout Structure'].map((structure) => (
                  <label key={structure} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.dealStructure.includes(structure)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('dealStructure', [...formData.dealStructure, structure])
                        } else {
                          handleInputChange('dealStructure', formData.dealStructure.filter(s => s !== structure))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{structure}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Capacity</h2>
              <p className="text-gray-600">Help us understand your financial readiness for acquisition.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Liquid Capital Available</label>
              <select
                value={formData.liquidCapital}
                onChange={(e) => handleInputChange('liquidCapital', e.target.value)}
                className="input-field"
              >
                <option value="">Select available capital</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m+">$5M+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Financing Preference</label>
              <select
                value={formData.financingPreference}
                onChange={(e) => handleInputChange('financingPreference', e.target.value)}
                className="input-field"
              >
                <option value="">Select financing preference</option>
                <option value="all-cash">All cash</option>
                <option value="partial-financing">Partial financing</option>
                <option value="full-financing">Full financing</option>
                <option value="seller-financing">Seller financing</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
              <select
                value={formData.riskTolerance}
                onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                className="input-field"
              >
                <option value="">Select risk tolerance</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
                <option value="very-aggressive">Very Aggressive</option>
              </select>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">BusinessMatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
              currentStep === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Next Step</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                <>
                  <span>Complete Profile</span>
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
