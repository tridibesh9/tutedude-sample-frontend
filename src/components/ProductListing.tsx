import React, { useState } from 'react';
import { Star, MapPin, Clock, Filter, ShoppingCart, Zap, Bot } from 'lucide-react';
import { UserRole } from '../App';

interface ProductListingProps {
  category: string;
  userRole: UserRole;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  supplier: string;
  distance: number;
  deliveryTime: string;
  rating: number;
  reviews: number;
  image: string;
  aiQualityScore: number;
  isDynamic?: boolean;
  originalPrice?: number;
  expiryHours?: number;
}

export const ProductListing: React.FC<ProductListingProps> = ({ category, userRole }) => {
  const [sortBy, setSortBy] = useState<'best' | 'price' | 'time' | 'distance' | 'rating'>('best');
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'प्याज (Grade A)',
      price: 25,
      unit: 'kg',
      supplier: 'गुप्ता ट्रेडर्स',
      distance: 2.1,
      deliveryTime: 'सुबह 6 बजे तक',
      rating: 4.5,
      reviews: 127,
      image: '🧅',
      aiQualityScore: 92,
    },
    {
      id: '2',
      name: 'प्याज (Premium)',
      price: 28,
      unit: 'kg',
      supplier: 'शर्मा व्होलसेल',
      distance: 1.8,
      deliveryTime: '2 घंटे में',
      rating: 4.7,
      reviews: 89,
      image: '🧅',
      aiQualityScore: 96,
    },
    {
      id: '3',
      name: 'प्याज (कटे हुए)',
      price: 18,
      originalPrice: 30,
      unit: 'kg',
      supplier: 'राजू वेजिटेबल्स',
      distance: 3.2,
      deliveryTime: '1 घंटा',
      rating: 4.2,
      reviews: 45,
      image: '🧅',
      aiQualityScore: 78,
      isDynamic: true,
      expiryHours: 4,
    },
  ];

  const sortOptions = [
    { value: 'best', label: 'बेस्ट वैल्यू' },
    { value: 'price', label: 'कीमत' },
    { value: 'time', label: 'तेज़ डिलीवरी' },
    { value: 'distance', label: 'नज़दीकी' },
    { value: 'rating', label: 'टॉप रेटेड' },
  ];

  const handleAddToCart = (product: Product) => {
    // Add to cart logic
    console.log('Added to cart:', product);
  };

  const handleBargain = (product: Product) => {
    // Bargain logic
    console.log('Bargain for:', product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">प्याज</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
          >
            <Filter size={16} />
            <span className="text-sm">फिल्टर</span>
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === option.value
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="p-4 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Dynamic Pricing Banner */}
            {product.isDynamic && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Zap size={16} />
                  <span className="text-sm font-semibold">⏰ {product.expiryHours} घंटे बचे - 40% छूट!</span>
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">{product.image}</span>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.supplier}</p>
                    </div>
                    
                    {/* AI Quality Score */}
                    <div className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-full">
                      <Bot size={12} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">AI: {product.aiQualityScore}%</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {/* Price */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">कीमत</div>
                      <div className="font-bold text-gray-900">
                        {product.isDynamic && product.originalPrice && (
                          <span className="line-through text-gray-400 text-xs mr-1">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        ₹{product.price}/{product.unit}
                      </div>
                    </div>

                    {/* Time */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">समय</div>
                      <div className="text-sm font-semibold text-green-600 flex items-center justify-center">
                        <Clock size={12} className="mr-1" />
                        {product.deliveryTime}
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">दूरी</div>
                      <div className="text-sm font-semibold text-blue-600 flex items-center justify-center">
                        <MapPin size={12} className="mr-1" />
                        {product.distance} km
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">रेटिंग</div>
                      <div className="text-sm font-semibold text-yellow-600 flex items-center justify-center">
                        <Star size={12} className="mr-1 fill-current" />
                        {product.rating}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={16} />
                      <span>कार्ट में डालें</span>
                    </button>
                    
                    {userRole === 'buyer' && (
                      <button
                        onClick={() => handleBargain(product)}
                        className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                      >
                        मोल-भाव
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Cart Optimizer */}
      <div className="fixed bottom-20 right-4 z-40">
        <button className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center">
          <span className="text-xs font-bold">💡</span>
        </button>
      </div>
    </div>
  );
};