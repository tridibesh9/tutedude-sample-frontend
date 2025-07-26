import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ProductListing } from './components/ProductListing';
import { Cart } from './components/Cart';
import { OrderTracking } from './components/OrderTracking';
import { Profile } from './components/Profile';
import { SurplusExchange } from './components/SurplusExchange';
import { DigitalKhata } from './components/DigitalKhata';
import { LoginScreen } from './components/LoginScreen';

export type UserRole = 'buyer' | 'seller';
export type AppScreen = 'dashboard' | 'products' | 'cart' | 'tracking' | 'profile' | 'surplus' | 'khata';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  if (!isAuthenticated) {
    return <LoginScreen onLogin={setIsAuthenticated} onRoleSelect={setUserRole} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard userRole={userRole} onCategorySelect={(category) => {
          setSelectedCategory(category);
          setCurrentScreen('products');
        }} />;
      case 'products':
        return <ProductListing category={selectedCategory} userRole={userRole} />;
      case 'cart':
        return <Cart userRole={userRole} />;
      case 'tracking':
        return <OrderTracking userRole={userRole} />;
      case 'surplus':
        return <SurplusExchange userRole={userRole} />;
      case 'khata':
        return <DigitalKhata userRole={userRole} />;
      case 'profile':
        return <Profile userRole={userRole} onRoleSwitch={setUserRole} />;
      default:
        return <Dashboard userRole={userRole} onCategorySelect={(category) => {
          setSelectedCategory(category);
          setCurrentScreen('products');
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-16">
        {renderScreen()}
      </main>
      <Navigation 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen}
        userRole={userRole}
      />
    </div>
  );
}

export default App;