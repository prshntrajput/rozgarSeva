import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from "react-router-dom"
import { Menu, Globe, ChevronUp, Briefcase, Search, Users } from 'lucide-react';
import  carpantedImage  from "../assets/carpanter.jpg"

const content = {
  en: {
    nav: [
      { name: 'About', href: "/about" },
      { name: 'Login', href: "/login" },
      { name: 'Signup', href: "/signup" }
    ],
    hero: {
      title: 'Find Your Dream Job Nearby',
      subtitle: 'Discover exciting career opportunities in your local area with RozgarSeva',
    },
    features: [
      {
        title: 'Local Opportunities',
        description: 'Find jobs near you and reduce your commute time',
        icon: <Briefcase className="w-8 h-8 text-blue-500" />
      },
      {
        title: 'Diverse Job Listings',
        description: 'Explore a wide range of job categories and industries',
        icon: <Search className="w-8 h-8 text-green-500" />
      },
      {
        title: 'Career Growth',
        description: 'Discover opportunities to advance your career',
        icon: <Users className="w-8 h-8 text-purple-500" />
      },
    ],
    cta: {
      title: 'Ready to Find Your Next Job?',
      button: 'Get Started',
    },
    footer: '© 2024 RozgarSeva.',
  },
  hi: {
    nav: [
      { name: 'हमारे बारे में', href: "/about" },
      { name: 'लॉग इन', href: "/login" },
      { name: 'साइन अप', href: "/signup" }
    ],
    hero: {
      title: 'अपने आस-पास अपना सपनों का काम खोजें',
      subtitle: 'रोज़गारसेवा के साथ अपने स्थानीय क्षेत्र में रोमांचक करियर के अवसर खोजें',
    },
    features: [
      {
        title: 'स्थानीय अवसर',
        description: 'अपने पास नौकरियाँ खोजें और अपने यात्रा समय को कम करें',
        icon: <Briefcase className="w-8 h-8 text-blue-500" />
      },
      {
        title: 'विविध नौकरी सूचियाँ',
        description: 'नौकरी श्रेणियों और उद्योगों की एक विस्तृत श्रृंखला का अन्वेषण करें',
        icon: <Search className="w-8 h-8 text-green-500" />
      },
      {
        title: 'कैरियर विकास',
        description: 'अपने करियर को आगे बढ़ाने के अवसरों की खोज करें',
        icon: <Users className="w-8 h-8 text-purple-500" />
      },
    ],
    cta: {
      title: 'अपनी अगली नौकरी खोजने के लिए तैयार हैं?',
      button: 'शुरू करें',
    },
    footer: '© 2024 रोज़गारसेवा।',
  },
}

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const handleGetStarted = () => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/jobs')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 overflow-hidden">
      <div className="shiny-overlay"></div>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            RozgarSeva
          </motion.h1>
          <div className="hidden sm:flex items-center space-x-4">
            <NavLinks language={language} />
            <button 
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
          <button 
            className="sm:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="sm:hidden bg-white py-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NavLinks language={language} className="flex flex-col items-center space-y-2" />
              <button 
                onClick={toggleLanguage}
                className="mt-2 text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center w-full"
              >
                <Globe className="w-4 h-4 mr-1" />
                {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.section 
          className="text-center mb-12 sm:mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{content[language].hero.title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">{content[language].hero.subtitle}</p>
          <motion.img
            src={carpantedImage}
            height={carpantedImage ? 200 : 100} 
           width={carpantedImage ? 200 : 100}
            alt="Animated job search"
            className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.img
            src="/placeholder.svg?height=200&width=200"
            alt="Animated career growth"
            className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
          />
        </motion.section>

        <motion.section 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {content[language].features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.section>

        <motion.section 
          className="text-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{content[language].cta.title}</h3>
          <motion.button 
            onClick={handleGetStarted}
            className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content[language].cta.button}
          </motion.button>
          <motion.img
            src="/placeholder.svg?height=200&width=200"
            alt="Animated job offer"
            className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p>{content[language].footer}</p>
        </div>
      </footer>

      <AnimatePresence>
        {scrollY > 100 && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 sm:p-4 rounded-full cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shiny {
          0% { background-position: -500% 0; }
          100% { background-position: 500% 0; }
        }

        .shiny-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shiny 8s linear infinite;
          z-index: 1000;
        }
      `}</style>
    </div>
  )
}

function NavLinks({ language, className = "space-x-4" }) {
  return (
    <div className={className}>
      {content[language].nav.map((item, index) => (
        <Link 
          key={index} 
          to={item.href} 
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </motion.div>
  )
}