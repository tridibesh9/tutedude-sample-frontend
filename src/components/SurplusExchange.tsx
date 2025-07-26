import React, { useState } from 'react';
import { Plus, Camera, MapPin, Clock, Star } from 'lucide-react';
import { UserRole } from '../App';

interface SurplusExchangeProps {
  userRole: UserRole;
}

interface SurplusItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  originalPrice: number;
  seller: string;
  distance: number;
  timeLeft: string;
  reason: string;
  image: string;
  rating: number;
}

export const SurplusExchange: React.FC<SurplusExchangeProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [showAddItem, setShowAddItem] = useState(false);

  const surplusItems: SurplusItem[] = [
    {
      id: '1',
      name: 'ताजा धनिया',
      quantity: 2,
      unit: 'kg',
      price: 15,
      originalPrice: 25,
      seller: 'राज चाट वाला',
      distance: 0.8,
      timeLeft: '2 घंटे',
      reason: 'ज्यादा खरीद लिया',
      image: '🌿',
      rating: 4.3,
    },
    {
      id: '2',
      name: 'कटे हुए प्याज',
      quantity: 1,
      unit: 'kg',
      price: 20,
      originalPrice: 30,
      seller: 'गोलू पकौड़े वाला',
      distance: 1.2,
      timeLeft: '1 घंटा',
      reason: 'दुकान जल्दी बंद',
      image: '🧅',
      rating: 4.6,
    },
  ];

  const myListings = [
    {
      id: '3',
      name: 'ताजा टमाटर',
      quantity: 3,
      unit: 'kg',
      price: 22,
      views: 12,
      interested: 3,
      timeLeft: '4 घंटे',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">सरप्लस एक्सचेंज</h1>
        <p className="text-sm text-gray-600">बचे हुए माल को बेचें या खरीदें</p>
        
        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'buy'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            खरीदें
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'sell'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            बेचें
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'buy' && (
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl border border-green-200">
              <div className="text-sm font-semibold text-gray-800 mb-1">💡 टिप्स</div>
              <div className="text-sm text-gray-700">
                नजदीकी वेंडर्स से सस्ते में fresh ingredients खरीदें
              </div>
            </div>

            {/* Available Items */}
            {surplusItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Urgency Banner */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 text-center">
                  <div className="text-sm font-semibold">⏰ {item.timeLeft} बचे - जल्दी करें!</div>
                </div>

                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">{item.image}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.seller}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-500 fill-current" size={12} />
                            <span className="text-xs text-gray-600">{item.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin size={12} className="mr-1" />
                          {item.distance} km
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={12} className="mr-1" />
                          {item.timeLeft}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-gray-500">कारण: {item.reason}</div>
                          <div className="font-bold text-gray-900">
                            <span className="line-through text-gray-400 text-sm mr-2">
                              ₹{item.originalPrice}
                            </span>
                            ₹{item.price}/{item.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">उपलब्ध</div>
                          <div className="font-semibold">{item.quantity} {item.unit}</div>
                        </div>
                      </div>

                      <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        अभी खरीदें
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="space-y-4">
            {/* Add New Item Button */}
            <button
              onClick={() => setShowAddItem(true)}
              className="w-full bg-orange-600 text-white p-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>नया आइटम बेचें</span>
            </button>

            {/* My Listings */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">मेरी लिस्टिंग्स</h3>
              {myListings.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.quantity} {item.unit} - ₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{item.timeLeft} बचे</div>
                      <div className="text-xs text-green-600">{item.interested} interested</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                      Edit करें
                    </button>
                    <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium">
                      Remove करें
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Sell Tips */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-xl border border-orange-200">
              <div className="text-sm font-semibold text-gray-800 mb-2">💡 बेचने के टिप्स</div>
              <div className="space-y-1 text-sm text-gray-700">
                <div>• अच्छी photo लगाएं</div>
                <div>• सही price रखें</div>
                <div>• reason बताएं</div>
                <div>• जल्दी respond करें</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">नया आइटम add करें</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  आइटम का नाम
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="जैसे: ताजा धनिया"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    मात्रा
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    यूनिट
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>kg</option>
                    <option>gm</option>
                    <option>piece</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कीमत (प्रति यूनिट)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  बेचने का कारण
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="ज्यादा खरीद लिया"
                />
              </div>

              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors">
                <Camera size={20} />
                <span>Photo add करें</span>
              </button>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddItem(false)}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                List करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};