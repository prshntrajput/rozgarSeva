import { Link } from 'react-router-dom'
import { Home, Briefcase, FileText, User, MessageSquare } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <ul className="flex justify-between items-center py-2">
          <NavItem href="/" icon={<Home size={24} />} label="Home" />
          <NavItem href="/jobs" icon={<Briefcase size={24} />} label="Jobs" />
          <NavItem href="/jobslisting" icon={<FileText size={24} />} label="Post Job" />
          <NavItem href="/profile" icon={<User size={24} />} label="Profile" />
          <NavItem href="/posts" icon={<MessageSquare size={24} />} label="Posts" />
        </ul>
      </div>
    </nav>
  )
}



function NavItem({ href, icon, label }) {
  return (
    <li className="flex-1 text-center">
      <Link to={href} className="flex flex-col items-center text-gray-600 hover:text-orange-500">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Link>
    </li>
  )
}