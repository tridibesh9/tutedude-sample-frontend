import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Phone, MessageCircle } from 'lucide-react';
import { UserRole } from '../App';

interface OrderTrackingProps {
  userRole: UserRole;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');

  const liveOrders = [
    {
      id: '1234',
      status: 'out_for_delivery',
      items: ['प्याज 5kg', 'टमाटर 3kg'],
      supplier: 'गुप्ता ट्रेडर्स',
      eta: '15 मिनट',
      driverName: 'राहुल कुमार',
      driverPhone: '+91 98765 43210',
      totalAmount: 195,
      currentLocation: 'कनॉट प्लेस के पास',
    }
  ];

  const orderHistory = [
    {
      id: '1233',
      date: '10 Jan 2025',
      status: 'delivered',
      items: ['हल्दी पाउडर 2kg', 'लाल मिर्च 1kg'],
      supplier: 'शर्मा व्होलसेल',
      amount: 380,
    },
    {
      id: '1232',
      date: '08 Jan 2025',
      status: 'delivered',
      items: ['प्याज 10kg', 'आलू 5kg'],
      supplier: 'गुप्ता ट्रेडर्स',
      amount: 425,
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'out_for_delivery':
        return { text: 'डिलीवरी के लिए निकला', color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'delivered':
        return { text: 'डिलीवर हुआ', color: 'text-green-600', bg: 'bg-green-100' };
      default:
        return { text: 'अज्ञात', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">ऑर्डर ट्रैकिंग</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'live'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            लाइव ऑर्डर्स
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ऑर्डर हिस्ट्री
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'live' && (
          <div className="space-y-4">
            {liveOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Live Tracking Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-90">ऑर्डर #{order.id}</div>
                        <div className="text-lg font-semibold">{order.supplier}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}>
                        {statusInfo.text}
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <Truck className="text-blue-600 mx-auto mb-2" size={32} />
                      <div className="text-sm font-semibold text-gray-700">
                        🗺️ लाइव मैप ट्रैकिंग
                      </div>
                      <div className="text-xs text-gray-600">{order.currentLocation}</div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* ETA */}
                    <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                      <Clock className="text-green-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-800">पहुंचने का समय</div>
                        <div className="text-sm text-green-600">{order.eta} में पहुंचेगा</div>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">आइटम्स:</div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">• {item}</div>
                        ))}
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">🚚</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{order.driverName}</div>
                          <div className="text-sm text-gray-600">ड्राइवर</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 bg-green-600 text-white rounded-full">
                          <Phone size={16} />
                        </button>
                        <button className="p-2 bg-blue-600 text-white rounded-full">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-800">कुल राशि</span>
                      <span className="text-lg font-bold text-orange-600">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {orderHistory.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">ऑर्डर #{order.id}</div>
                      <div className="text-sm text-gray-600">{order.date}</div>
                      <div className="text-sm text-gray-700">{order.supplier}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.color}`}>
                      <CheckCircle size={12} className="inline mr-1" />
                      {statusInfo.text}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">• {item}</div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <button className="text-orange-600 text-sm font-medium">फिर से ऑर्डर करें</button>
                    <span className="font-semibold text-gray-800">₹{order.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};