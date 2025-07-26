import React, { useState } from 'react';
import { Smartphone, UserCheck, Store } from 'lucide-react';
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (value: boolean) => void;
  onRoleSelect: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRoleSelect }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone');
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setStep('role');
    }
  };

  const handleRoleSelection = () => {
    onRoleSelect(selectedRole);
    onLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">साथी</h1>
          <p className="text-gray-600">आपका विश्वसनीय साथी</p>
        </div>

        {step === 'phone' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                मोबाइल नंबर दर्ज करें
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">+91</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="1234567890"
                  maxLength={10}
                />
              </div>
            </div>
            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              OTP भेजें
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP दर्ज करें
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center text-2xl tracking-widest"
                placeholder="123456"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-2">
                +91 {phoneNumber} पर भेजा गया
              </p>
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              सत्यापित करें
            </button>
          </div>
        )}

        {step === 'role' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-center text-gray-900 mb-4">
              आप कौन हैं?
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole('buyer')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'buyer'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <UserCheck className="text-orange-600" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">खरीदार (वेंडर)</div>
                    <div className="text-sm text-gray-600">कच्चा माल खरीदना चाहते हैं</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedRole('seller')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedRole === 'seller'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Store className="text-green-600" size={24} />
                  <div className="text-left">
                    <div className="font-semibold">विक्रेता (सप्लायर)</div>
                    <div className="text-sm text-gray-600">कच्चा माल बेचना चाहते हैं</div>
                  </div>
                </div>
              </button>
            </div>
            
            <button
              onClick={handleRoleSelection}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              शुरू करें
            </button>
          </div>
        )}
      </div>
    </div>
  );
};