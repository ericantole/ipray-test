import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Navigation: React.FC = () => {
  const { theme } = useApp();
  const location = useLocation();

  // Hide nav on onboarding or inside prayer flow
  if (location.pathname === '/onboarding' || location.pathname === '/pray') return null;

  const isNight = theme === 'night';
  const activeColor = isNight ? 'text-accent-pink' : 'text-accent-gold';
  const inactiveColor = isNight ? 'text-gray-500' : 'text-gray-400';
  const bgColor = isNight ? 'bg-bg-cardNight border-gray-800' : 'bg-white border-gray-200';

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex flex-col items-center justify-center w-full h-full space-y-1
        ${isActive ? activeColor : inactiveColor}
        transition-colors duration-200
      `}
    >
      <Icon className="w-6 h-6" strokeWidth={2.5} />
      <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
    </NavLink>
  );

  return (
    <nav className={`fixed bottom-0 left-0 right-0 h-[safe-area-inset-bottom+60px] pb-[safe-area-inset-bottom] border-t ${bgColor} z-40`}>
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavItem to="/today" icon={Home} label="Today" />
        <NavItem to="/my-prayers" icon={Heart} label="My Prayers" />
        <NavItem to="/library" icon={BookOpen} label="Library" />
      </div>
    </nav>
  );
};