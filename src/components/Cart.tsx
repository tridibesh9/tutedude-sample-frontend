import React, { useState } from 'react';
import { Minus, Plus, Trash2, CreditCard, Lightbulb, MessageCircle } from 'lucide-react';
import { UserRole } from '../App';

interface CartProps {
  userRole: UserRole;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  supplier: string;
  image: string;
}

export const Cart: React.FC<CartProps> = ({ userRole }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'प्याज (Grade A)',
      price: 25,
      quantity: 5,
      unit: 'kg',
      supplier: 'गुप्ता ट्रेडर्स',
      image: '🧅',
    },
    {
      id: '2',
      name: 'टमाटर (Fresh)',
      price: 30,
      quantity: 3,
      unit: 'kg',
      supplier: 'शर्मा व्होलसेल',
      image: '🍅',
    },
  ]);

  const [showOptimizer, setShowOptimizer] = useState(false);
  const [useSaathiCredit, setUseSaathiCredit] = useState(false);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const optimizedSavings = 45; // Mock optimization savings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">आपका कार्ट</h1>
        <p className="text-sm text-gray-600">{totalItems} आइटम्स</p>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{item.image}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.supplier}</p>
                <p className="text-sm font-semibold text-orange-600">₹{item.price}/{item.unit}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center ml-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Smart Cart Optimizer */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Lightbulb className="text-green-600" size={20} />
              <span className="font-semibold text-gray-800">स्मार्ट कार्ट ऑप्टिमाइज़र</span>
            </div>
            <button
              onClick={() => setShowOptimizer(!showOptimizer)}
              className="text-green-600 text-sm font-medium"
            >
              {showOptimizer ? 'छुपाएं' : 'देखें'}
            </button>
          </div>
          
          {showOptimizer && (
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                हमने आपके लिए सबसे सस्ता combination ढूंढा है!
              </p>
              <div className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">बचत: ₹{optimizedSavings}</span>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                    Apply करें
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">पेमेंट विकल्प</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={useSaathiCredit}
                onChange={(e) => setUseSaathiCredit(e.target.checked)}
                className="w-5 h-5 text-orange-600"
              />
              <div>
                <div className="font-medium">साथी क्रेडिट इस्तेमाल करें</div>
                <div className="text-sm text-gray-600">उपलब्ध: ₹2,500</div>
              </div>
            </label>
          </div>
        </div>

        {/* Bargain Option */}
        {totalAmount > 500 && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-3">
              <MessageCircle className="text-purple-600" size={20} />
              <div>
                <div className="font-semibold text-gray-800">बल्क ऑर्डर डिस्काउंट</div>
                <div className="text-sm text-gray-600">₹500+ ऑर्डर पर मोल-भाव करें</div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">
                मोल-भाव करें
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-600">कुल राशि</div>
            <div className="text-2xl font-bold text-gray-900">₹{totalAmount}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">डिलीवरी चार्ज</div>
            <div className="text-lg font-semibold text-green-600">FREE</div>
          </div>
        </div>
        
        <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
          <CreditCard size={20} />
          <span>पेमेंट करें</span>
        </button>
      </div>
    </div>
  );
};