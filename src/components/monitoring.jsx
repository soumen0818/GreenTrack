import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Leaf, Trash2, Wind, Zap, Car, TreePine, Volume2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data - in a real app, this would come from your backend
const carbonData = [
  { month: 'Jan', emissions: 120, target: 150 },
  { month: 'Feb', emissions: 110, target: 145 },
  { month: 'Mar', emissions: 105, target: 140 },
  { month: 'Apr', emissions: 95, target: 135 },
  { month: 'May', emissions: 85, target: 130 },
];

const energyData = [
  { hour: '00:00', usage: 2.5 },
  { hour: '04:00', usage: 1.8 },
  { hour: '08:00', usage: 3.2 },
  { hour: '12:00', usage: 4.1 },
  { hour: '16:00', usage: 3.8 },
  { hour: '20:00', usage: 3.0 },
];

const airQualityData = [
  { time: '00:00', pm25: 35, pm10: 45, no2: 25 },
  { time: '04:00', pm25: 30, pm10: 40, no2: 20 },
  { time: '08:00', pm25: 45, pm10: 55, no2: 35 },
  { time: '12:00', pm25: 50, pm10: 60, no2: 40 },
  { time: '16:00', pm25: 40, pm10: 50, no2: 30 },
  { time: '20:00', pm25: 35, pm10: 45, no2: 25 },
];

const noiseData = [
  { time: '00:00', level: 45 },
  { time: '04:00', level: 40 },
  { time: '08:00', level: 65 },
  { time: '12:00', level: 70 },
  { time: '16:00', level: 68 },
  { time: '20:00', level: 55 },
];

const getAirQualityStatus = (pm25) => {
  if (pm25 <= 30) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
  if (pm25 <= 60) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  return { status: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
};

const getNoiseLevelStatus = (level) => {
  if (level <= 50) return { status: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  if (level <= 65) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  return { status: 'High', color: 'text-red-600', bg: 'bg-red-100' };
};

const EnvironmentalMonitoring = () => {
  const navigate = useNavigate();
  const currentAirQuality = getAirQualityStatus(airQualityData[airQualityData.length - 1].pm25);
  const currentNoiseLevel = getNoiseLevelStatus(noiseData[noiseData.length - 1].level);

  return (
    <div className="p-4 space-y-4">
      {/* Add back button */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Environmental Monitoring Dashboard</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
          Last updated: Just now
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Carbon Footprint</p>
                <p className="text-2xl font-bold">2.4 tons CO₂e</p>
                <p className="text-sm text-green-600">↓ 15% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Energy Usage</p>
                <p className="text-2xl font-bold">342 kWh</p>
                <p className="text-sm text-blue-600">↓ 8% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Trash2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Waste Recycled</p>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-purple-600">↑ 5% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={currentAirQuality.bg}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Wind className={`w-8 h-8 ${currentAirQuality.color}`} />
              <div>
                <p className="text-sm text-gray-600">Air Quality</p>
                <p className="text-2xl font-bold">{currentAirQuality.status}</p>
                <p className={`text-sm ${currentAirQuality.color}`}>PM2.5: {airQualityData[airQualityData.length - 1].pm25} µg/m³</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={currentNoiseLevel.bg}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Volume2 className={`w-8 h-8 ${currentNoiseLevel.color}`} />
              <div>
                <p className="text-sm text-gray-600">Noise Level</p>
                <p className="text-2xl font-bold">{currentNoiseLevel.status}</p>
                <p className={`text-sm ${currentNoiseLevel.color}`}>{noiseData[noiseData.length - 1].level} dB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Emissions vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="emissions" stroke="#059669" />
                  <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Energy Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#2563EB" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Air Quality and Noise Level Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={airQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="pm25" stackId="1" stroke="#8884d8" fill="#8884d8" name="PM2.5" />
                  <Area type="monotone" dataKey="pm10" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="PM10" />
                  <Area type="monotone" dataKey="no2" stackId="3" stroke="#ffc658" fill="#ffc658" name="NO2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Noise Level Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={noiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="level" stroke="#ff7300" fill="#ff7300" name="Noise Level (dB)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
              <Wind className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium">Air Quality Alert</p>
                <p className="text-sm text-gray-600">PM2.5 levels slightly elevated in your area</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
              <Volume2 className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-medium">Noise Level Warning</p>
                <p className="text-sm text-gray-600">Peak noise levels detected during rush hour</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <TreePine className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium">Green Achievement</p>
                <p className="text-sm text-gray-600">You've reduced your carbon footprint by 20% this quarter!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentalMonitoring;