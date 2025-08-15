'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, UserCheck, Heart, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">BusinessMatch</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Where Business
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {' '}Matches{' '}
              </span>
              Happen
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Like Bumble, but for business. Sellers reach out to qualified buyers, and our platform guides you through every step of the acquisition process.
            </p>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Buyer Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === 'buyer' ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                }`}
                onClick={() => setSelectedRole('buyer')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Buyer</h3>
                  <p className="text-gray-600 mb-4">
                    Looking to acquire a business? Create your profile and let qualified sellers find you.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <span className="text-sm font-medium">Perfect for</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">Entrepreneurs</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">Investors</span>
                  </div>
                </div>
              </motion.div>

              {/* Seller Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === 'seller' ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                }`}
                onClick={() => setSelectedRole('seller')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Seller</h3>
                  <p className="text-gray-600 mb-4">
                    Ready to sell your business? Connect with pre-qualified buyers actively seeking opportunities.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-purple-600">
                    <span className="text-sm font-medium">Perfect for</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">Business Owners</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">Exit Planning</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Continue Button */}
            <AnimatePresence>
              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/onboarding/${selectedRole}`}
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <span>Continue as {selectedRole === 'buyer' ? 'Buyer' : 'Seller'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BusinessMatch?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform revolutionizes the business acquisition process with modern tools and AI-powered insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-pink-50 rounded-2xl p-6 mb-4 inline-block">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered matching algorithm connects compatible buyers and sellers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-blue-50 rounded-2xl p-6 mb-4 inline-block">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Streamlined Process</h3>
              <p className="text-gray-600">Modern workflows reduce friction and maximize deal success rates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-50 rounded-2xl p-6 mb-4 inline-block">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600">Built-in security and verification for safe business transactions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-50 rounded-2xl p-6 mb-4 inline-block">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Tools</h3>
              <p className="text-gray-600">Document analysis, financial summaries, and deal optimization</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Business Journey?</h2>
          <p className="text-xl text-pink-100 mb-8">Join thousands of successful business transactions on our platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSelectedRole('buyer')}
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200"
            >
              Get Started as Buyer
            </button>
            <button
              onClick={() => setSelectedRole('seller')}
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-semibold py-3 px-8 rounded-xl transition-all duration-200"
            >
              Get Started as Seller
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
