'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, User, MapPin, Phone, FileText, Tag, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const content = {
  en: {
    title: 'Post a New Job',
    projectName: 'Project Name',
    ownerName: 'Project Owner Name',
    address: 'Address',
    phoneNo: 'Phone Number',
    description: 'Job Description',
    category: 'Job Category',
    categoryPlaceholder: 'Select a category or type',
    categoryOptions: ['Plumber', 'Maid', 'Cook'],
    submitButton: 'Post Job',
    languageToggle: 'हिंदी में देखें',
  },
  hi: {
    title: 'नई नौकरी पोस्ट करें',
    projectName: 'प्रोजेक्ट का नाम',
    ownerName: 'प्रोजेक्ट मालिक का नाम',
    address: 'पता',
    phoneNo: 'फोन नंबर',
    description: 'नौकरी का विवरण',
    category: 'नौकरी की श्रेणी',
    categoryPlaceholder: 'श्रेणी चुनें या अपनी टाइप करें',
    categoryOptions: ['प्लंबर', 'नौकरानी', 'रसोइया'],
    submitButton: 'नौकरी पोस्ट करें',
    languageToggle: 'View in English',
  }
}

export default function JobListingForm() {
  const [formData, setFormData] = useState({
    projectName: '',
    ownerName: '',
    address: '',
    phoneNo: '',
    description: '',
    category: '',
  })
  const [language, setLanguage] = useState('en')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)

    navigate("/")
    // Here you would typically send the data to your backend
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{content[language].title}</h2>
            <button 
              onClick={toggleLanguage}
              className="text-sm text-gray-600 hover:text-orange-600 transition-colors flex items-center"
            >
              <Globe className="w-4 h-4 mr-1" />
              {content[language].languageToggle}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6" >
            <InputField
              name="projectName"
              label={content[language].projectName}
              value={formData.projectName}
              onChange={handleChange}
              icon={<Briefcase className="h-5 w-5 text-gray-400" />}
            />
            <InputField
              name="ownerName"
              label={content[language].ownerName}
              value={formData.ownerName}
              onChange={handleChange}
              icon={<User className="h-5 w-5 text-gray-400" />}
            />
            <InputField
              name="address"
              label={content[language].address}
              value={formData.address}
              onChange={handleChange}
              icon={<MapPin className="h-5 w-5 text-gray-400" />}
            />
            <InputField
              name="phoneNo"
              label={content[language].phoneNo}
              value={formData.phoneNo}
              onChange={handleChange}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              type="tel"
            />
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                {content[language].description}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder={content[language].description}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                {content[language].category}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder={content[language].categoryPlaceholder}
                  value={formData.category}
                  onChange={handleChange}
                  required
                  list="categories"
                />
                <datalist id="categories">
                  {content[language].categoryOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="category-select" className="sr-only">Category</label>
                  <select
                    id="category-select"
                    name="category"
                    className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    onChange={handleChange}
                    value={formData.category}
                  >
                    <option value="">{content[language].categoryPlaceholder}</option>
                    {content[language].categoryOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {content[language].submitButton}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}



function InputField({ name, label, value, onChange, icon, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder={label}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  )
}