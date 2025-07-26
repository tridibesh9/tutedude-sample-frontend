import React, { useState } from 'react';
import { Search, Mic, TrendingUp, Zap, Bell, MapPin, Clock } from 'lucide-react';
import { UserRole } from '../App';

interface DashboardProps {
  userRole: UserRole;
  onCategorySelect: (category: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onCategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'vegetables', name: 'सब्जियां', icon: '🥬', color: 'bg-green-100 text-green-700' },
    { id: 'spices', name: 'मसाले', icon: '🌶️', color: 'bg-red-100 text-red-700' },
    { id: 'oils', name: 'तेल', icon: '🛢️', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'dairy', name: 'डेयरी', icon: '🥛', color: 'bg-blue-100 text-blue-700' },
    { id: 'grains', name: 'अनाज', icon: '🌾', color: 'bg-amber-100 text-amber-700' },
    { id: 'packaged', name: 'पैकेज्ड', icon: '📦', color: 'bg-purple-100 text-purple-700' },
  ];

  const trendingItems = [
    { name: 'प्याज', price: '₹25/kg', trend: '+5%', image: '🧅' },
    { name: 'टमाटर', price: '₹30/kg', trend: '-2%', image: '🍅' },
    { name: 'हल्दी पाउडर', price: '₹180/kg', trend: '+8%', image: '🌟' },
  ];

  const quickActions = userRole === 'buyer' ? [
    { id: 'reorder', name: 'फिर से ऑर्डर', icon: '🔄', color: 'bg-blue-500' },
    { id: 'credit', name: 'साथी क्रेडिट', icon: '💳', color: 'bg-green-500' },
    { id: 'bulk', name: 'बल्क ऑर्डर', icon: '📦', color: 'bg-purple-500' },
  ] : [
    { id: 'inventory', name: 'इन्वेंटरी', icon: '📊', color: 'bg-blue-500' },
    { id: 'deliveries', name: 'डिलीवरी', icon: '🚚', color: 'bg-green-500' },
    { id: 'analytics', name: 'एनालिटिक्स', icon: '📈', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">नमस्ते! 🙏</h1>
            <p className="text-orange-100">
              {userRole === 'buyer' ? 'आज क्या चाहिए?' : 'आज के ऑर्डर्स देखें'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-orange-500 rounded-full">
              <Bell size={20} />
            </button>
            <div className="text-right">
              <div className="text-sm">📍 दिल्ली</div>
              <div className="text-xs text-orange-100">कनॉट प्लेस</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-lg p-3">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="प्याज, टमाटर, मसाले..."
              className="flex-1 outline-none text-gray-800"
            />
            <button className="ml-2 p-2 bg-orange-100 rounded-full">
              <Mic className="text-orange-600" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">त्वरित कार्य</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <div className="text-sm font-medium text-gray-700">{action.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">श्रेणियां</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <div className="font-medium text-gray-800">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">आज ट्रेंडिंग</h2>
            <button className="flex items-center text-orange-600 text-sm font-medium">
              <TrendingUp size={16} className="mr-1" />
              सभी देखें
            </button>
          </div>
          <div className="space-y-3">
            {trendingItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.price}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Pricing Alert */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Zap className="text-white" size={16} />
            </div>
            <div>
              <div className="font-semibold text-gray-800">फ्लैश सेल!</div>
              <div className="text-sm text-gray-600">ताजे फूल 40% छूट - 2 घंटे बचे</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};