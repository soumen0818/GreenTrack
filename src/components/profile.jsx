import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Camera,
  Edit2,
  Award,
  Leaf,
  Activity,
  Calendar,
  ChevronRight,
  Target,
  Star,
  TrendingUp,
  ArrowLeft,
  Lock,
  Download,
  Trash2,
  LogOut,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    challengeUpdates: true,
    communityMessages: true,
    weeklyReport: true
  });
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc)
    navigate('/');
  };

  const userProfile = {
    name: 'Suman Pradhan',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    avatar: 'https://images-ext-1.discordapp.net/external/mF0LfE5Xd2ujPxZ1wpdSBruQ2M188-BN-C54LFqq-vI/https/i.pinimg.com/736x/97/ef/24/97ef241b207714a81b26d15d7371dd10.jpg?format=webp&width=528&height=586',
    ecoScore: 856,
    level: 'Eco Warrior',
    carbonSaved: '2.5 tons',
    treesPlanted: 15,
    badges: [
      { id: 1, name: 'Zero Waste Pioneer', date: '2024-02-15', icon: Star },
      { id: 2, name: 'Energy Saver', date: '2024-01-20', icon: Sparkles },
      { id: 3, name: 'Green Transport Hero', date: '2024-02-01', icon: Target }
    ],
    recentActivities: [
      { id: 1, type: 'Challenge', name: 'No Plastic Week', date: '2024-02-20', progress: 85 },
      { id: 2, type: 'Achievement', name: 'Planted 5 Trees', date: '2024-02-18', progress: 100 },
      { id: 3, type: 'Milestone', name: 'Saved 1 Ton CO2', date: '2024-02-15', progress: 100 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleSettingChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Activity className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-600">Eco Score</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{userProfile.ecoScore}</p>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Leaf className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-600">Carbon Saved</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{userProfile.carbonSaved}</p>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                    <span>+0.5 tons this month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-600">Trees Planted</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{userProfile.treesPlanted}</p>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                    <span>3 new this month</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {userProfile.recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="p-3 bg-teal-100 rounded-xl">
                        <Trophy className="h-6 w-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">{activity.name}</h4>
                            <p className="text-sm text-gray-500">{activity.type}</p>
                          </div>
                          <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-teal-600 h-1.5 rounded-full"
                            style={{ width: `${activity.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Latest Achievements</h3>
                <div className="space-y-4">
                  {userProfile.badges.map(badge => (
                    <div key={badge.id} 
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                    >
                      <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                        <badge.icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                          {badge.name}
                        </h4>
                        <p className="text-sm text-gray-500">Earned on {badge.date}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 px-4 py-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                  View All Achievements
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Profile Completion</h3>
                  <span className="text-2xl font-bold text-teal-600">85%</span>
                </div>
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <button className="w-full px-4 py-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors">
                    Complete Your Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            {/* Activity Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Activity Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-teal-50 p-4 rounded-xl">
                  <div className="text-teal-600 text-sm font-medium">This Week</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
                  <div className="text-teal-600 text-sm mt-1">Activities</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <div className="text-emerald-600 text-sm font-medium">Streak</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">7</div>
                  <div className="text-emerald-600 text-sm mt-1">Days</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="text-yellow-600 text-sm font-medium">Points Earned</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">850</div>
                  <div className="text-yellow-600 text-sm mt-1">This Month</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-600 text-sm font-medium">Impact Score</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">92</div>
                  <div className="text-blue-600 text-sm mt-1">Out of 100</div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Activity Timeline</h3>
                <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>All Activities</option>
                  <option>Challenges</option>
                  <option>Achievements</option>
                  <option>Environmental Actions</option>
                </select>
              </div>
              <div className="space-y-8">
                {userProfile.recentActivities.map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline connector */}
                    {index !== userProfile.recentActivities.length - 1 && (
                      <div className="absolute top-12 bottom-0 left-6 w-0.5 bg-gray-200"></div>
                    )}
                    
                    <div className="flex gap-6">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{activity.name}</h4>
                            <p className="text-sm text-gray-500">{activity.type}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-900">{activity.date}</span>
                            <p className="text-sm text-gray-500">+{Math.floor(Math.random() * 50 + 10)} points</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-emerald-500 h-1.5 rounded-full"
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium text-gray-900">{activity.progress}%</span>
                          </div>
                          {activity.progress === 100 && (
                            <div className="flex items-center gap-2 text-emerald-600 text-sm">
                              <Sparkles className="h-4 w-4" />
                              <span>Completed!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Activity Categories</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Environmental Challenges</span>
                    <span className="text-gray-900 font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Carbon Reduction</span>
                    <span className="text-gray-900 font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Community Events</span>
                    <span className="text-gray-900 font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Educational Content</span>
                    <span className="text-gray-900 font-medium">10%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Goals</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Carbon Footprint Reduction</span>
                      <span className="text-gray-900 font-medium">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tree Planting Target</span>
                      <span className="text-gray-900 font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Community Engagement</span>
                      <span className="text-gray-900 font-medium">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">All Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile.badges.map(badge => (
                <div key={badge.id} 
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl">
                    <badge.icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{badge.name}</h4>
                    <p className="text-sm text-gray-500">Earned on {badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
              <div className="space-y-4">
                {/* Existing profile settings... */}
                
                {/* Add Phone Number */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue={userProfile.phone}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Add Bio */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Bio</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Preferences</h3>
              <div className="space-y-4">
                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>

                {/* Theme Selection */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-2">
                  <h4 className="text-gray-700 font-medium">Privacy</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Make profile public</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Show my achievements</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" />
                      <span className="text-gray-700">Allow messaging</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Account Actions</h3>
                <div className="space-y-4">
                  {/* Change Password */}
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Change Password</span>
                  </button>

                  {/* Export Data */}
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                    <Download className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Export My Data</span>
                  </button>

                  {/* Delete Account */}
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 rounded-lg transition-colors flex items-center text-red-600"
                  >
                    <Trash2 className="h-5 w-5 mr-3" />
                    <span>Delete Account</span>
                  </button>

                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center text-red-600"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Save Changes Button */}
              <button className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Save All Changes
              </button>
            </div>

            {/* Delete Account Modal */}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Account</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Add delete account logic here
                        setIsDeleteModalOpen(false);
                        navigate('/');
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {/* Add back button */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-4 left-4 flex items-center text-white hover:text-white/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 relative">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white text-teal-600 rounded-full hover:bg-teal-50 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {userProfile.level}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-white/80">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex space-x-1 mt-8 border-b border-white/20">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors relative
                  ${activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;