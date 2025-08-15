'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Building2, DollarSign, Target, Users, TrendingUp, FileText, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

interface SellerFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  
  // Business Overview
  industry: string
  businessAge: string
  employeeCount: string
  annualRevenue: string
  profitMargin: string
  
  // Business Details
  businessDescription: string
  keyAssets: string[]
  location: string
  reasonForSelling: string
  timeline: string
  
  // Financial Information
  askingPrice: string
  cashFlow: string
  growthRate: string
  customerBase: string
}

const initialFormData: SellerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
  industry: '',
  businessAge: '',
  employeeCount: '',
  annualRevenue: '',
  profitMargin: '',
  businessDescription: '',
  keyAssets: [],
  location: '',
  reasonForSelling: '',
  timeline: '',
  askingPrice: '',
  cashFlow: '',
  growthRate: '',
  customerBase: ''
}

export default function SellerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SellerFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 1, title: 'Personal Info', icon: <Users className="w-5 h-5" /> },
    { id: 2, title: 'Business Overview', icon: <Building2 className="w-5 h-5" /> },
    { id: 3, title: 'Business Details', icon: <FileText className="w-5 h-5" /> },
    { id: 4, title: 'Financial Info', icon: <DollarSign className="w-5 h-5" /> }
  ]

  const handleInputChange = (field: keyof SellerFormData, value: string | string[]) => {
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
        investmentRange: formData.askingPrice, // Map asking price to investment range
        experienceLevel: formData.businessAge, // Map business age to experience level
        preferredIndustries: [formData.industry], // Map industry to preferred industries
        timeline: formData.timeline,
        businessSize: formData.employeeCount, // Map employee count to business size
        locationPreference: formData.location,
        liquidCapital: formData.cashFlow, // Map cash flow to liquid capital
        riskTolerance: 'moderate', // Default for sellers
        bio: `${formData.businessDescription}. Located in ${formData.location}. Reason for selling: ${formData.reasonForSelling}.`
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
              <p className="text-gray-600">Let's start with your personal information and company details.</p>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="input-field"
                placeholder="Enter your company name"
              />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Overview</h2>
              <p className="text-gray-600">Help us understand your business better.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Age</label>
                <select
                  value={formData.businessAge}
                  onChange={(e) => handleInputChange('businessAge', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select business age</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-20">11-20 years</option>
                  <option value="20+">20+ years</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select employee count</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-10">6-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue</label>
                <select
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select annual revenue</option>
                  <option value="0-100k">$0 - $100K</option>
                  <option value="100k-500k">$100K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m-10m">$5M - $10M</option>
                  <option value="10m+">$10M+</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profit Margin</label>
              <select
                value={formData.profitMargin}
                onChange={(e) => handleInputChange('profitMargin', e.target.value)}
                className="input-field"
              >
                <option value="">Select profit margin</option>
                <option value="0-10">0-10%</option>
                <option value="10-20">10-20%</option>
                <option value="20-30">20-30%</option>
                <option value="30-40">30-40%</option>
                <option value="40+">40%+</option>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Details</h2>
              <p className="text-gray-600">Tell us more about your business and why you're selling.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
              <textarea
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                className="input-field min-h-[120px] resize-none"
                placeholder="Describe your business, what it does, and what makes it unique..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Assets</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Intellectual Property', 'Real Estate', 'Equipment', 'Customer Database', 'Brand Recognition', 'Patents', 'Trademarks', 'Software', 'Inventory', 'Contracts'].map((asset) => (
                  <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.keyAssets.includes(asset)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('keyAssets', [...formData.keyAssets, asset])
                        } else {
                          handleInputChange('keyAssets', formData.keyAssets.filter(a => a !== asset))
                        }
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{asset}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="input-field"
                  placeholder="City, State or Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Selling</label>
                <select
                  value={formData.reasonForSelling}
                  onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select reason</option>
                  <option value="retirement">Retirement</option>
                  <option value="new-opportunity">New opportunity</option>
                  <option value="health-reasons">Health reasons</option>
                  <option value="relocation">Relocation</option>
                  <option value="partnership-issues">Partnership issues</option>
                  <option value="market-conditions">Market conditions</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline to Sell</label>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Information</h2>
              <p className="text-gray-600">Help buyers understand the financial health of your business.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asking Price</label>
                <select
                  value={formData.askingPrice}
                  onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select asking price</option>
                  <option value="100k-500k">$100K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m-10m">$5M - $10M</option>
                  <option value="10m+">$10M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Cash Flow</label>
                <select
                  value={formData.cashFlow}
                  onChange={(e) => handleInputChange('cashFlow', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select monthly cash flow</option>
                  <option value="0-10k">$0 - $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Growth Rate</label>
                <select
                  value={formData.growthRate}
                  onChange={(e) => handleInputChange('growthRate', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select growth rate</option>
                  <option value="0-10">0-10%</option>
                  <option value="10-25">10-25%</option>
                  <option value="25-50">25-50%</option>
                  <option value="50-100">50-100%</option>
                  <option value="100+">100%+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Base</label>
                <select
                  value={formData.customerBase}
                  onChange={(e) => handleInputChange('customerBase', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select customer base</option>
                  <option value="0-100">0-100 customers</option>
                  <option value="100-500">100-500 customers</option>
                  <option value="500-1000">500-1,000 customers</option>
                  <option value="1000-5000">1,000-5,000 customers</option>
                  <option value="5000+">5,000+ customers</option>
                </select>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-purple-600" />
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
                    ? 'bg-purple-600 border-purple-600 text-white' 
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
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
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
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Next Step</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
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
