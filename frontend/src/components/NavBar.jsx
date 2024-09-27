import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Briefcase, FileText, User, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: "/", icon: <Home size={24} />, label: "Home" },
  { href: "/jobs", icon: <Briefcase size={24} />, label: "Jobs" },
  { href: "/jobslisting", icon: <FileText size={24} />, label: "Post Job" },
  { href: "/profile", icon: <User size={24} />, label: "Profile" },
  { href: "/posts", icon: <MessageSquare size={24} />, label: "Posts" },
]

export default function NavBar() {
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleError = (event) => {
      console.error('Unhandled error:', event.error)
      setError('An unexpected error occurred. Please try refreshing the page.')
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-100 text-red-700 p-4 text-center">
        {error}
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center py-2">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </ul>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

function NavItem({ href, icon, label }) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <motion.li
      className="flex-1 text-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={href} className="flex flex-col items-center text-gray-600 hover:text-orange-500">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.div>
        <motion.span
          className="text-xs mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.li>
  )
}