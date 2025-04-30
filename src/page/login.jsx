import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GreenTrackLogin = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation states
  const [leafPositions, setLeafPositions] = useState([
    { x: 10, y: 20, rotation: 0, scale: 1, speed: 0.5, emoji: '🍃' },
    { x: 30, y: 50, rotation: 45, scale: 0.8, speed: 0.7, emoji: '🌱' },
    { x: 70, y: 30, rotation: 90, scale: 1.2, speed: 0.3, emoji: '🌿' },
    { x: 85, y: 70, rotation: 120, scale: 0.9, speed: 0.6, emoji: '🍂' }
  ]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });
  const [formShake, setFormShake] = useState(false);
  
  // Animate multiple leaves
  useEffect(() => {
    const interval = setInterval(() => {
      setLeafPositions(prev => 
        prev.map(leaf => ({
          ...leaf,
          y: (leaf.y + leaf.speed) % 100,
          rotation: (leaf.rotation + leaf.speed * 2) % 360
        }))
      );
    }, 50);
    
    // Initial welcome animation
    setTimeout(() => {
      setShowWelcome(true);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update the handleLogin function
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      setFormShake(true);
      setTimeout(() => setFormShake(false), 500);
      setIsLoading(false);
      return;
    }
    
    try {
      // Here you would normally make an API call to verify credentials
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
      
      // If login is successful
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(true);
      }
      
      // Navigate to the landing/dashboard page
      navigate('/landingpage', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setFormShake(true);
      setTimeout(() => setFormShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };
  
  const switchView = () => {
    setIsLoginView(!isLoginView);
    // Reset form fields
    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
    
    // Create ripple animation
    const centerX = 50;
    const centerY = 50;
    setRipple({ active: true, x: centerX, y: centerY });
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 1000);
  };
  
  const socialLogin = (provider) => {
    setIsLoading(true);
    // Simulate API call for social login
    setTimeout(() => {
      setIsLoading(false);
      alert(`${provider} login successful! Welcome to GreenTrack.`);
    }, 1500);
  };
  
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-green-50 to-blue-50 p-6 overflow-hidden relative">
      {/* Animated background elements */}
      {leafPositions.map((leaf, index) => (
        <div 
          key={index}
          className="absolute text-green-500 transition-all duration-300 ease-in-out"
          style={{
            top: `${leaf.y}%`,
            left: `${leaf.x}%`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            opacity: 0.6,
            fontSize: `${Math.max(16, 16 * leaf.scale)}px`,
            zIndex: 0
          }}
        >
          {leaf.emoji}
        </div>
      ))}
      
      {/* Water ripple effect for view change */}
      {ripple.active && (
        <div 
          className="absolute rounded-full bg-blue-100 opacity-50"
          style={{
            top: `${ripple.y}%`,
            left: `${ripple.x}%`,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            animation: 'ripple 1s ease-out',
            zIndex: 1
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.5;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .fadeSlideIn {
          animation: fadeSlideIn 0.8s ease-out forwards;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
      
      <div className={`m-auto bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full relative z-10 transition-all duration-500 ${formShake ? 'shake' : ''} ${showWelcome ? 'opacity-100' : 'opacity-0 transform translate-y-8'}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-70 floating"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-tr-full opacity-70 floating" style={{ animationDelay: '2s' }}></div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-green-600 mb-2 fadeSlideIn" style={{ animationDelay: '0.3s' }}>
              GreenTrack
            </h2>
            <p className="text-sm text-gray-600 fadeSlideIn" style={{ animationDelay: '0.5s' }}>
              AI-Powered Environmental Monitoring & Sustainability
            </p>
          </div>
          
          <div className="mb-6 fadeSlideIn" style={{ animationDelay: '0.7s' }}>
            <div className="flex border-b border-gray-200">
              <button 
                className={`flex-1 py-2 text-center font-medium transition-all duration-300 ${isLoginView ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
                onClick={() => setIsLoginView(true)}
              >
                Log In
              </button>
              <button 
                className={`flex-1 py-2 text-center font-medium transition-all duration-300 ${!isLoginView ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
                onClick={() => setIsLoginView(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="fadeSlideIn" style={{ animationDelay: '0.9s' }}>
            <div className="space-y-4">
              {!isLoginView && (
                <div className="overflow-hidden" style={{ animationDelay: '0.3s' }}>
                  <div className={`transform transition-all duration-500 ${!isLoginView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Your Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLoginView}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {!isLoginView && (
                <div className="overflow-hidden">
                  <div className={`transform transition-all duration-500 ${!isLoginView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={!isLoginView}
                    />
                  </div>
                </div>
              )}
              
              {isLoginView && (
                <div className={`flex items-center justify-between overflow-hidden transition-all duration-500 ${isLoginView ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  isLoginView ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 fadeSlideIn" style={{ animationDelay: '1.1s' }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => socialLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              
              <button
                onClick={() => socialLogin('GitHub')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center fadeSlideIn" style={{ animationDelay: '1.3s' }}>
            <p className="text-sm text-gray-600">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={switchView} 
                className="font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                {isLoginView ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 fadeSlideIn" style={{ animationDelay: '1.5s' }}>
            <div className="flex justify-center space-x-6">
              <div className="text-green-600 hover:text-green-500 transition-colors duration-300 transform hover:scale-110">
                🌱 Track Carbon
              </div>
              <div className="text-green-600 hover:text-green-500 transition-colors duration-300 transform hover:scale-110">
                🌍 Monitor Environment
              </div>
              <div className="text-green-600 hover:text-green-500 transition-colors duration-300 transform hover:scale-110">
                🎯 Join Challenges
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenTrackLogin;