import React, { useState } from 'react';
import { User, Settings, HelpCircle, LogOut, ToggleLeft, ToggleRight, Bell, Globe, Shield } from 'lucide-react';
import { UserRole } from '../App';

interface ProfileProps {
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
}

export const Profile: React.FC<ProfileProps> = ({ userRole, onRoleSwitch }) => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('hindi');

  const profileStats = userRole === 'buyer' ? [
    { label: 'कुल ऑर्डर्स', value: '47' },
    { label: 'बचत', value: '₹2,340' },
    { label: 'रेटिंग', value: '4.7⭐' },
  ] : [
    { label: 'कुल सेल्स', value: '₹45,600' },
    { label: 'ऑर्डर्स', value: '123' },
    { label: 'रेटिंग', value: '4.9⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👨‍💼</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">राहुल शर्मा</h1>
            <p className="text-orange-100">+91 98765 43210</p>
            <p className="text-sm text-orange-100">📍 कनॉट प्लेस, दिल्ली</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {profileStats.map((stat, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Role Switch */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Account Type</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">
                {userRole === 'buyer' ? 'खरीदार Mode' : 'विक्रेता Mode'}
              </div>
              <div className="text-sm text-gray-600">
                {userRole === 'buyer' ? 'कच्चा माल खरीदें' : 'कच्चा माल बेचें'}
              </div>
            </div>
            <button
              onClick={() => onRoleSwitch(userRole === 'buyer' ? 'seller' : 'buyer')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors"
            >
              <span>Switch to {userRole === 'buyer' ? 'Seller' : 'Buyer'}</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">सेटिंग्स</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="text-gray-600" size={20} />
                <div>
                  <div className="font-medium text-gray-800">Notifications</div>
                  <div className="text-sm text-gray-600">Order updates, offers</div>
                </div>
              </div>
              <button onClick={() => setNotifications(!notifications)}>
                {notifications ? (
                  <ToggleRight className="text-orange-600" size={24} />
                ) : (
                  <ToggleLeft className="text-gray-400" size={24} />
                )}
              </button>
            </div>

            {/* Language */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="text-gray-600" size={20} />
                <div>
                  <div className="font-medium text-gray-800">भाषा</div>
                  <div className="text-sm text-gray-600">Hindi / English</div>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="hindi">हिंदी</option>
                <option value="english">English</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Privacy */}
            <div className="p-4 flex items-center space-x-3">
              <Shield className="text-gray-600" size={20} />
              <div>
                <div className="font-medium text-gray-800">Privacy & Security</div>
                <div className="text-sm text-gray-600">Manage your data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            <button className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
              <User className="text-gray-600" size={20} />
              <span className="font-medium text-gray-800">Edit Profile</span>
            </button>
            
            <button className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
              <Settings className="text-gray-600" size={20} />
              <span className="font-medium text-gray-800">App Settings</span>
            </button>
            
            <button className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
              <HelpCircle className="text-gray-600" size={20} />
              <span className="font-medium text-gray-800">Help & Support</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📱</span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">WhatsApp से भी order करें</div>
              <div className="text-sm text-gray-600">+91 88888 88888 पर message करें</div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center space-y-2 text-gray-500">
          <div className="text-sm">साथी App v2.1.0</div>
          <div className="text-xs">Made with ❤️ for Indian Street Food Vendors</div>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-100 text-red-700 p-4 rounded-xl font-semibold hover:bg-red-200 transition-colors flex items-center justify-center space-x-2">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};