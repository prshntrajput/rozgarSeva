import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Job Listings', href: '/userjobslisting' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="font-bold text-xl text-orange-600">
              RozgarSeva
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <motion.li key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    to={item.href}
                    className="text-gray-800 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-orange-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className="text-gray-800 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}