import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Briefcase, TrendingUp, Menu, Globe } from 'lucide-react'

const content = {
  en: {
    nav: ['Home', 'Jobs', 'About', 'Contact'],
    hero: {
      title: 'Find Your Dream Job Nearby',
      subtitle: 'Discover exciting career opportunities in your local area with RozgarSeva',
      searchPlaceholder: 'Job title or keyword',
      searchButton: 'Search',
    },
    features: [
      {
        title: 'Local Opportunities',
        description: 'Find jobs near you and reduce your commute time',
      },
      {
        title: 'Diverse Job Listings',
        description: 'Explore a wide range of job categories and industries',
      },
      {
        title: 'Career Growth',
        description: 'Discover opportunities to advance your career',
      },
    ],
    cta: {
      title: 'Ready to Find Your Next Job?',
      button: 'Get Started',
    },
    footer: '© 2024 RozgarSeva.',
  },
  hi: {
    nav: ['होम', 'नौकरियाँ', 'हमारे बारे में', 'संपर्क करें'],
    hero: {
      title: 'अपने आस-पास अपना सपनों का काम खोजें',
      subtitle: 'रोज़गारसेवा के साथ अपने स्थानीय क्षेत्र में रोमांचक करियर के अवसर खोजें',
      searchPlaceholder: 'नौकरी का शीर्षक या कीवर्ड',
      searchButton: 'खोजें',
    },
    features: [
      {
        title: 'स्थानीय अवसर',
        description: 'अपने पास नौकरियाँ खोजें और अपने यात्रा समय को कम करें',
      },
      {
        title: 'विविध नौकरी सूचियाँ',
        description: 'नौकरी श्रेणियों और उद्योगों की एक विस्तृत श्रृंखला का अन्वेषण करें',
      },
      {
        title: 'कैरियर विकास',
        description: 'अपने करियर को आगे बढ़ाने के अवसरों की खोज करें',
      },
    ],
    cta: {
      title: 'अपनी अगली नौकरी खोजने के लिए तैयार हैं?',
      button: 'शुरू करें',
    },
    footer: '© 2024 रोज़गारसेवा।',
  },
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 overflow-hidden">
      <div className="shiny-overlay"></div>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-orange-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              RozgarSeva
            </motion.h1>
            <button 
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-orange-600 transition-colors flex items-center mt-1"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
            </button>
          </div>
          <div className="hidden sm:flex space-x-4">
            <NavLinks language={language} />
          </div>
          <button 
            className="sm:hidden text-gray-600 hover:text-orange-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </nav>
        {isMenuOpen && (
          <motion.div 
            className="sm:hidden bg-white py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <NavLinks language={language} className="flex flex-col items-center space-y-2" />
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.section 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{content[language].hero.title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">{content[language].hero.subtitle}</p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <input 
              type="text" 
              placeholder={content[language].hero.searchPlaceholder}
              className="px-4 py-2 w-full sm:w-64 rounded-full sm:rounded-l-full border-2 border-orange-400 focus:outline-none focus:border-orange-600"
            />
            <button className="bg-orange-500 text-white px-6 py-2 w-full sm:w-auto rounded-full sm:rounded-r-full hover:bg-orange-600 transition-colors">
              {content[language].hero.searchButton}
            </button>
          </motion.div>
        </motion.section>

        <motion.section 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FeatureCard 
            icon={<MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />}
            title={content[language].features[0].title}
            description={content[language].features[0].description}
          />
          <FeatureCard 
            icon={<Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />}
            title={content[language].features[1].title}
            description={content[language].features[1].description}
          />
          <FeatureCard 
            icon={<TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />}
            title={content[language].features[2].title}
            description={content[language].features[2].description}
          />
        </motion.section>

        <motion.section 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{content[language].cta.title}</h3>
         <a href=""> <motion.button 
            className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           {content[language].cta.button} 
          </motion.button> </a>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p>{content[language].footer}</p>
        </div>
      </footer>

      <motion.div 
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-3 sm:p-4 rounded-full cursor-pointer"
        style={{ opacity: scrollY > 100 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>

      <style jsx global>{`
        @keyframes shiny {
          0% {
            background-position: -500% 0;
          }
          100% {
            background-position: 500% 0;
          }
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
        <a key={index} href="#" className="text-gray-600 hover:text-orange-600 transition-colors">{item}</a>
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
      <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </motion.div>
  )
}