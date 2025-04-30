import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import {
  Car,
  Lightbulb,
  Utensils,
  TreePine,
  ChevronDown,
  ChevronUp,
  Award,
  Share2,
  Target,
  User,
  ArrowLeft // Add this import
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom'; // Add this import

const CarbonTracker = () => {
  const navigate = useNavigate(); // Add this line

  const [user, setUser] = useState({
    name: 'Suman Pradhan',
    goal: 15, // Daily carbon goal in kg
    achievements: ['First Log', 'Week Streak']
  });

  const [activities, setActivities] = useState({
    travel: {
      Petrolcar: '',
      Dieselcar: '',
      Electriccar: '',
      Petrolbus: '',
      Electricbus: '',
      Dieselbus: '',
      train: ''
    },
    electricity: {
      heating: '',
      cooling: '',
      appliances: ''
    },
    food: {
      meat: '',
      dairy: '',
      vegetables: ''
    }
  });

  const [history, setHistory] = useState([
    { date: '2024-03-16', score: 12, average: 14 },
    { date: '2024-03-17', score: 8, average: 14 },
    { date: '2024-03-18', score: 15, average: 14 },
    { date: '2024-03-19', score: 10, average: 14 },
    { date: '2024-03-20', score: 7, average: 14 }
  ]);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const [achievementAlert, setAchievementAlert] = useState(null);

  // Carbon calculation factors (kg CO2 per unit)
  const carbonFactors = {
    travel: {
      Petrolcar: 0.24, // per km
      Dieselcar: 0.25, // per km
      Electriccar: 0.05, // per km
      Petrolbus: 0.08, // per km
      Electricbus: 0.03, // per km
      Dieselbus: 0.1, // per km
      train: 0.04 // per km
    },
    electricity: {
      heating: 0.2, // per kWh
      cooling: 0.15, // per kWh
      appliances: 0.1 // per kWh
    },
    food: {
      meat: 6.0, // per meal
      dairy: 2.0, // per meal
      vegetables: 0.5 // per meal
    }
  };

  const calculateDetailedCarbon = () => {
    let total = 0;
    let breakdown = {};

    // Calculate travel emissions
    breakdown.travel = Object.entries(activities.travel).reduce((sum, [mode, value]) => {
      const emission = (parseFloat(value) || 0) * carbonFactors.travel[mode];
      sum += emission;
      return sum;
    }, 0);

    // Calculate electricity emissions
    breakdown.electricity = Object.entries(activities.electricity).reduce((sum, [type, value]) => {
      const emission = (parseFloat(value) || 0) * carbonFactors.electricity[type];
      sum += emission;
      return sum;
    }, 0);

    // Calculate food emissions
    breakdown.food = Object.entries(activities.food).reduce((sum, [type, value]) => {
      const emission = (parseFloat(value) || 0) * carbonFactors.food[type];
      sum += emission;
      return sum;
    }, 0);

    total = breakdown.travel + breakdown.electricity + breakdown.food;
    return { total: total.toFixed(2), breakdown };
  };

  const categoryData = [
    { name: 'Travel', value: calculateDetailedCarbon().breakdown.travel },
    { name: 'Electricity', value: calculateDetailedCarbon().breakdown.electricity },
    { name: 'Food', value: calculateDetailedCarbon().breakdown.food }
  ];

  const handleActivityChange = (category, subcategory, value) => {
    setActivities(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: value
      }
    }));
  };

  const suggestions = {
    travel: [
      'Consider carpooling or using public transport',
      'Try cycling for short distances',
      'Combine multiple errands into one trip',
      'Maintain proper tire pressure for better fuel efficiency'
    ],
    electricity: [
      'Switch to LED bulbs',
      'Use natural light when possible',
      'Unplug devices when not in use',
      'Set thermostats to optimal temperatures'
    ],
    food: [
      'Reduce meat consumption',
      'Buy local and seasonal produce',
      'Minimize food waste',
      'Start composting organic waste'
    ]
  };

  const InputGroup = ({ category, icon: Icon, color }) => (
    <div className="space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Icon className={`text-${color}-500`} />
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h3>
      {Object.keys(activities[category]).map(subcat => (
        <div key={subcat} className="flex items-center gap-4">
          <span className="w-30 text-sm text-yellow-800">
            {subcat.charAt(0).toUpperCase() + subcat.slice(1)}:
          </span>
          <input
            type="number"
            placeholder={`Enter ${subcat} usage`}
            className="flex-1 p-2 border rounded-lg"
            value={activities[category][subcat]}
            onChange={(e) => handleActivityChange(category, subcat, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Add back button */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      {/* Header with User Profile */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-600">Carbon Footprint Tracker</h1>
          <p className="text-gray-600">Monitor and reduce your daily carbon emissions</p>
        </div>
        <div className="flex items-center gap-4">
          <User className="text-gray-500" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">Daily Goal: {user.goal} kg CO₂</p>
          </div>
        </div>
      </div>

      {/* Achievement Alert */}
      {achievementAlert && (
        <Alert className="bg-green-50 border-green-200">
          <Award className="text-green-500" />
          <AlertDescription>{achievementAlert}</AlertDescription>
        </Alert>
      )}

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="text-green-500" />
            Daily Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputGroup category="travel" icon={Car} color="blue" />
          <InputGroup category="electricity" icon={Lightbulb} color="yellow" />
          <InputGroup category="food" icon={Utensils} color="red" />
        </CardContent>
      </Card>

      {/* Carbon Score Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Your Carbon Impact</span>
            <Share2 className="text-gray-500 cursor-pointer" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {calculateDetailedCarbon().total} kg CO₂
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Daily Goal: {user.goal} kg CO₂
            </div>
            <Progress 
              value={Math.min((calculateDetailedCarbon().total / user.goal) * 100, 100)} 
              className="mt-4"
            />
          </div>

          {/* Category Breakdown */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Emission Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Trend */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Weekly Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={history}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="average" stroke="#94a3b8" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {user.achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                <Award className="text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold">{achievement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Eco-Friendly Suggestions</span>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showSuggestions ? <ChevronUp /> : <ChevronDown />}
            </button>
          </CardTitle>
        </CardHeader>
        {showSuggestions && (
          <CardContent>
            <div className="grid gap-6">
              {Object.entries(suggestions).map(([category, tips]) => (
                <div key={category}>
                  <h3 className="font-semibold flex items-center gap-2">
                    {category === 'travel' && <Car className="text-blue-500" />}
                    {category === 'electricity' && <Lightbulb className="text-green-500" />}
                    {category === 'food' && <Utensils className="text-red-500" />}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="text-gray-600 flex items-center gap-2">
                        <span className={`w-2 h-2 bg-${category === 'travel' ? 'blue' : category === 'electricity' ? 'green' : 'red'}-500 rounded-full`}></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CarbonTracker;