import React from 'react';
import { Home, ShoppingCart, MapPin, User, Repeat, BookOpen } from 'lucide-react';
import { AppScreen, UserRole } from '../App';

interface NavigationProps {
  currentScreen: AppScreen;
  onScreenChange: (screen: AppScreen) => void;
  userRole: UserRole;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange, userRole }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: userRole === 'buyer' ? 'होम' : 'डैशबोर्ड', screen: 'dashboard' as AppScreen },
    { id: 'products', icon: ShoppingCart, label: userRole === 'buyer' ? 'खरीदें' : 'प्रोडक्ट्स', screen: 'products' as AppScreen },
    { id: 'tracking', icon: MapPin, label: 'ट्रैकिंग', screen: 'tracking' as AppScreen },
    { id: 'surplus', icon: Repeat, label: 'एक्सचेंज', screen: 'surplus' as AppScreen },
    { id: 'khata', icon: BookOpen, label: 'खाता', screen: 'khata' as AppScreen },
    { id: 'profile', icon: User, label: 'प्रोफाइल', screen: 'profile' as AppScreen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.screen)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};