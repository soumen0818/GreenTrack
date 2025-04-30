import React, { useState } from 'react';
import "../App.css";
import {
  BarChart,
  LeafyGreen,
  Trash2,
  Radio,
  Trophy,
  Users,
  Menu,
  X,
  Sun,
  Cloud,
  Wind,
  Droplets,
  AlertTriangle,
  ChevronDown,
  Recycle,
  Activity,
  UserCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?appid=5c291859286dd8c630337ead92c3d287';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('daily');
  const [expandedCard, setExpandedCard] = useState(null);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { title: 'Carbon Tracker', icon: BarChart, route: '/carbon' },
    { title: 'Waste Management', icon: Trash2, route: '/waste' },
    { title: 'Monitoring', icon: Radio, route: '/monitoring' },
    { title: 'Challenges', icon: Trophy, route: '/challenges' },
    { title: 'Community', icon: Users, route: '/community' },
    { title: 'Report', icon: AlertTriangle, route: '/report' },  // Add this line
    { title: 'Profile', icon: UserCircle, route: '/profile' }
  ];

  const weatherDataStatic = {
    temp: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: 'Today', temp: 22, icon: Sun },
      { day: 'Tomorrow', temp: 24, icon: Cloud },
      { day: 'Wed', temp: 20, icon: Droplets },
      { day: 'Thu', temp: 23, icon: Sun },
    ]
  };

  const airQualityData = {
    aqi: 42,
    status: 'Good',
    pollutants: {
      pm25: { value: 15, status: 'Good' },
      pm10: { value: 30, status: 'Moderate' },
      o3: { value: 45, status: 'Good' },
      no2: { value: 25, status: 'Good' }
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCardExpansion = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5c291859286dd8c630337ead92c3d287`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error('Error fetching weather data:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const ProfileModal = () => (
    <div className="fixed inset-0 bg-white z-50">
      <div className="p-4">
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <X className="h-6 w-6 mr-2" />
          Close
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block p-2 rounded-full bg-teal-50 mb-4">
              <UserCircle className="h-24 w-24 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Suman Pradhan</h1>
            <p className="text-gray-500">Level 4 Eco Warrior</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Profile Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Carbon Saved</span>
                  <span className="font-semibold">245 kg CO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Challenges Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Green Points</span>
                  <span className="font-semibold">1,234</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-50">
                  Edit Profile
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-50">
                  Notifications
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-50">
                  Privacy Settings
                </button>
                <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-50 text-red-600">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-teal-600 to-emerald-700 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center ${!isSidebarOpen ? 'hidden' : ''}`}>
            <div className="bg-white p-2 rounded-lg">
              <LeafyGreen className="h-8 w-8 text-teal-600" />
            </div>
            <span className="ml-2 font-bold text-xl">GreenTrack</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 hover:bg-teal-500 rounded-lg transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.route}
              className="flex items-center px-4 py-3 text-gray-100 hover:bg-teal-500 transition-colors relative group no-outline"
              onClick={(e) => {
                e.preventDefault();
                navigate(item.route);
              }}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <item.icon className="h-5 w-5" />
              <span className={`ml-4 ${!isSidebarOpen ? 'hidden' : ''}`}>{item.title}</span>
              {!isSidebarOpen && (
                <div className="absolute left-20 bg-teal-700 text-white px-2 py-1 rounded hidden group-hover:block">
                  {item.title}
                </div>
              )}
            </a>
          ))}
        </nav>

        {/* Add Profile Section at bottom of sidebar */}
        <div className="absolute bottom-0 w-absolute p-4">
          <div 
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-teal-500 rounded-lg transition-colors"
            onClick={() => navigate('/profile')}
          >
            <UserCircle className="h-6 w-6 text-white" />
            {isSidebarOpen && (
              <span className="ml-2 text-white font-medium">Suman Pradhan </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('daily')}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedMetric === 'daily'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Daily
              </button>
              <button
                onClick={() => setSelectedMetric('weekly')}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedMetric === 'weekly'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setSelectedMetric('monthly')}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedMetric === 'monthly'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Carbon Score Card */}
            <div
              className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer ${expandedCard === 'carbon' ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              onClick={() => toggleCardExpansion('carbon')}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Your Carbon Score</h2>
                <ChevronDown className={`transform transition-transform ${expandedCard === 'carbon' ? 'rotate-180' : ''}`} />
              </div>
              <div className="text-3xl font-bold text-teal-600">245 kg</div>
              <p className="text-gray-500 mt-2">CO₂ this month</p>

              {expandedCard === 'carbon' && (
                <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Transport</span>
                        <span>120 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Energy</span>
                        <span>85 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Food</span>
                        <span>40 kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Weather</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <select 
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      fetchWeatherData(e.target.value);
                    }}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Location</option>
                    <option value="Sainthia">Sainthia</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Contai">Delhi</option>
                    </select>
                </div>
                
                {/* Display Weather Data */}
                {weatherData && (
                  <div className="mt-4">
                    <p className="text-gray-600">
                      <strong>Temperature:</strong> {weatherData.main.temp}°C
                    </p>
                    <p className="text-gray-600">
                      <strong>Humidity:</strong> {weatherData.main.humidity}%
                    </p>
                    <p className="text-gray-600">
                      <strong>Condition:</strong> {weatherData.weather[0].description}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Weather Card */}
            {/* <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Weather Report</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-800">{weatherDataStatic.temp}°C</div>
                  <p className="text-gray-500">{weatherDataStatic.condition}</p>
                </div>
                <Sun className="h-12 w-12 text-yellow-500" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {weatherDataStatic.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-500">{day.day}</p>
                    <day.icon className="h-6 w-6 mx-auto my-1 text-gray-600" />
                    <p className="text-sm font-semibold">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Air Quality Card */}
            <div
              className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer ${expandedCard === 'air' ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              onClick={() => toggleCardExpansion('air')}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Air Quality</h2>
                <ChevronDown className={`transform transition-transform ${expandedCard === 'air' ? 'rotate-180' : ''}`} />
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{airQualityData.aqi}</div>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {airQualityData.status}
                </span>
              </div>

              {expandedCard === 'air' && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(airQualityData.pollutants).map(([key, data]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500 uppercase">{key}</div>
                        <div className="text-lg font-semibold">{data.value}</div>
                        <div className={`text-sm ${data.status === 'Good' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                          {data.status}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">
                        Air quality is good for outdoor activities
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Green Actions Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Suggested Actions</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <LeafyGreen className="h-4 w-4 mr-2 text-teal-500" />
                  Use public transport today
                </li>
                <li className="flex items-center text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <LeafyGreen className="h-4 w-4 mr-2 text-teal-500" />
                  Reduce water usage
                </li>
              </ul>
            </div>

            {/* Gamification Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h2>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      Level 4
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                  <div style={{ width: '75%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                </div>
              </div>
              <p className="text-gray-500">75/100 points to next level</p>
            </div>
          </div>

          {/* Carbon Track Button */}
          <button
            onClick={(e) => handleNavigation('/carbon', e)}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all mt-4"
          >
            <div className="flex items-center space-x-4">
              <LeafyGreen className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Carbon Tracker</h3>
                <p className="text-sm text-gray-500">Monitor your carbon footprint</p>
              </div>
            </div>
          </button>

          {/* Waste Management Button */}
          <button
            onClick={(e) => handleNavigation('/waste', e)}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all mt-4"
          >
            <div className="flex items-center space-x-4">
              <Recycle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Waste Management</h3>
                <p className="text-sm text-gray-500">Track and manage your waste</p>
              </div>
            </div>
          </button>

          {/* Environmental Monitoring Button */}
          <button
            onClick={(e) => handleNavigation('/monitoring', e)}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all mt-4"
          >
            <div className="flex items-center space-x-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Environmental Monitoring</h3>
                <p className="text-sm text-gray-500">Track air quality and environmental metrics</p>
              </div>
            </div>
          </button>

          {/* Challenges Button */}
          <div
            onClick={() => navigate('/challenges')}
            className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition-all mt-4"
          >
            <div className="flex items-center space-x-4">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Green Challenges</h3>
                <p className="text-sm text-gray-500">Complete eco-friendly tasks and earn rewards</p>
              </div>
            </div>
          </div>

          {/* Community Button */}
          <div
            onClick={() => navigate('/community')}
            className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md transition-all mt-4"
          >
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Community</h3>
                <p className="text-sm text-gray-500">Join eco-friendly groups and events</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Completed "No Plastic Challenge"
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Completed "Bicycle for Wk"
                      </p>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Joined "Eco Warriors Group"
                      </p>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

