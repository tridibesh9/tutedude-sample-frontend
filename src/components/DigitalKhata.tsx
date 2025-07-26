import React, { useState } from 'react';
import { CreditCard, TrendingUp, Calendar, Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { UserRole } from '../App';

interface DigitalKhataProps {
  userRole: UserRole;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  supplier?: string;
}

export const DigitalKhata: React.FC<DigitalKhataProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'credit'>('overview');

  const creditLimit = 5000;
  const availableCredit = 2500;
  const usedCredit = creditLimit - availableCredit;
  const currentBalance = -1200; // Negative means they owe money

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 195,
      description: 'प्याज, टमाटर खरीदा',
      date: '12 Jan 2025',
      supplier: 'गुप्ता ट्रेडर्स',
    },
    {
      id: '2',
      type: 'credit',
      amount: 500,
      description: 'पेमेंट किया',
      date: '10 Jan 2025',
    },
    {
      id: '3',
      type: 'debit',
      amount: 380,
      description: 'मसाले खरीदे',
      date: '08 Jan 2025',
      supplier: 'शर्मा व्होलसेल',
    },
  ];

  const creditScore = 750; // Out of 900

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h1 className="text-xl font-bold">डिजिटल खाता</h1>
        <p className="text-blue-100">आपका financial companion</p>

        {/* Balance Card */}
        <div className="bg-white bg-opacity-20 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm opacity-90">वर्तमान बैलेंस</div>
              <div className={`text-2xl font-bold ${currentBalance < 0 ? 'text-red-200' : 'text-green-200'}`}>
                ₹{Math.abs(currentBalance)}
                {currentBalance < 0 && <span className="text-sm ml-1">(बकाया)</span>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">क्रेडिट स्कोर</div>
              <div className="text-xl font-bold">{creditScore}/900</div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-1">
              <span>साथी क्रेडिट</span>
              <span>₹{availableCredit}/₹{creditLimit}</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(availableCredit / creditLimit) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex space-x-4">
          {[
            { id: 'overview', label: 'ओवरव्यू' },
            { id: 'transactions', label: 'ट्रांजैक्शन्स' },
            { id: 'credit', label: 'क्रेडिट' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-600 text-white p-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>पैसे जमा करें</span>
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard size={20} />
                <span>BNPL Use करें</span>
              </button>
            </div>

            {/* Weekly Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">इस हफ्ते का summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">₹1,275</div>
                  <div className="text-sm text-gray-600">खर्च किया</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹800</div>
                  <div className="text-sm text-gray-600">जमा किया</div>
                </div>
              </div>
            </div>

            {/* Payment Reminders */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Calendar className="text-white" size={16} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">पेमेंट रिमाइंडर</div>
                  <div className="text-sm text-gray-600">गुप्ता ट्रेडर्स को ₹195 देना है</div>
                </div>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm font-semibold">
                  Pay Now
                </button>
              </div>
            </div>

            {/* Credit Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">क्रेडिट हेल्थ</h3>
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>On-time payments</span>
                  <span className="text-green-600 font-semibold">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Credit utilization</span>
                  <span className="text-orange-600 font-semibold">50%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Account age</span>
                  <span className="text-blue-600 font-semibold">8 months</span>
                </div>  
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{transaction.description}</div>
                    {transaction.supplier && (
                      <div className="text-sm text-gray-600">{transaction.supplier}</div>
                    )}
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className={`text-lg font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'credit' && (
          <div className="space-y-4">
            {/* Credit Limit Card */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm opacity-90">साथी क्रेडिट लिमिट</div>
                  <div className="text-2xl font-bold">₹{creditLimit}</div>
                </div>
                <CreditCard size={32} className="opacity-80" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available</span>
                  <span>₹{availableCredit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>₹{usedCredit}</span>
                </div>
              </div>
            </div>

            {/* BNPL Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">BNPL के फायदे</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">0% interest पर खरीदारी</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">15 दिन की flexible payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Credit score improve करें</span>
                </div>
              </div>
            </div>

            {/* Increase Limit */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Credit limit बढ़ाएं</div>
                  <div className="text-sm text-gray-600">₹10,000 तक मिल सकता है</div>
                </div>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold text-sm">
                  Apply करें
                </button>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">आगामी payments</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">15 Jan 2025</div>
                    <div className="text-sm text-gray-600">गुप्ता ट्रेडर्स</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">₹195</div>
                    <div className="text-xs text-gray-500">2 days left</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};