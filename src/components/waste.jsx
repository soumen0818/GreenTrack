import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs.jsx';
import { Alert, AlertDescription } from './ui/alert';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Recycle,
  AlertTriangle,
  Leaf,
  Trash,
  Camera
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const WasteManagementDashboard = () => {
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [pickupType, setPickupType] = useState('');
  const [wasteSize, setWasteSize] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  const wasteCategories = [
    { type: 'Recyclables', items: ['Paper', 'Plastic', 'Glass', 'Metal'], color: 'bg-blue-100', icon: <Recycle className="h-5 w-5 text-blue-600" /> },
    { type: 'Organic', items: ['Food Waste', 'Garden Waste', 'Compostable Materials'], color: 'bg-green-100', icon: <Leaf className="h-5 w-5 text-green-600" /> },
    { type: 'Hazardous', items: ['Batteries', 'Electronics', 'Chemicals', 'Paint'], color: 'bg-red-100', icon: <AlertTriangle className="h-5 w-5 text-red-600" /> },
    { type: 'General', items: ['Non-recyclable plastics', 'Mixed waste'], color: 'bg-gray-100', icon: <Trash className="h-5 w-5 text-gray-600" /> }
  ];

  const recyclingCenters = [
    { name: 'City Recycling Center', distance: '2.5 km', types: ['Recyclables', 'Hazardous'] },
    { name: 'Green Waste Facility', distance: '4.1 km', types: ['Organic'] },
    { name: 'E-Waste Collection Point', distance: '3.8 km', types: ['Hazardous'] }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const pickupTypes = [
    'Recyclables',
    'Organic Waste',
    'Hazardous Waste',
    'General Waste'
  ];

  const wasteSizes = [
    { id: 'small', name: 'Small (up to 20kg)' },
    { id: 'medium', name: 'Medium (20-50kg)' },
    { id: 'large', name: 'Large (50-100kg)' },
    { id: 'xl', name: 'Extra Large (100kg+)' }
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 27.7172, // Set this to your city's coordinates
    lng: 85.3240  // These coordinates are for Kathmandu
  };

  const recyclingCentersWithCoords = [
    {
      name: 'City Recycling Center',
      distance: '2.5 km',
      types: ['Recyclables', 'Hazardous'],
      position: { lat: 27.7172, lng: 85.3240 }
    },
    {
      name: 'Green Waste Facility',
      distance: '4.1 km',
      types: ['Organic'],
      position: { lat: 27.7245, lng: 85.3257 }
    },
    {
      name: 'E-Waste Collection Point',
      distance: '3.8 km',
      types: ['Hazardous'],
      position: { lat: 27.7156, lng: 85.3301 }
    }
  ];

  const handlePickupClick = () => {
    if (!selectedDate || !selectedTime || !pickupType || !wasteSize) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Scheduling pickup:', {
      date: selectedDate,
      time: selectedTime,
      type: pickupType,
      size: wasteSize
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waste Management</h1>
        <button
          onClick={() => {
            console.log('Navigating to scanning page');
            navigate('/scan');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          Scan Here
        </button>
      </div>

      <Tabs defaultValue="categorize">
        <TabsList className="grid grid-cols-3 gap-4 mb-6">
          <TabsTrigger value="categorize">
            <Recycle className="h-4 w-4 mr-2" /> Categorize Waste
          </TabsTrigger>
          <TabsTrigger value="locations">
            <MapPin className="h-4 w-4 mr-2" /> Recycling Locations
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" /> Schedule Pickup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categorize">
          <div className="grid md:grid-cols-2 gap-4">
            {wasteCategories.map((category) => (
              <Card key={category.type} className={`${category.color}`}>
                <CardHeader>
                  <CardTitle>
                    <span className="mr-2">{category.icon}</span>
                    {category.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="p-2 bg-white rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedWaste(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedWaste && (
            <Alert className="mt-4">
              <AlertDescription>
                <strong>{selectedWaste}</strong>: AI-powered recommendations for proper disposal will appear here.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="locations">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="w-full h-[400px] rounded-lg overflow-hidden">
                <LoadScript 
                  googleMapsApiKey="https://api.olamaps.io/sli/v1/streetview/coverage?xMax=77.61513567417848&xMin=77.611182859373&yMax=12.935739723360513&yMin=12.93219851203095&api_key=${your_api_key}"
                  onLoad={() => setMapLoaded(true)}
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={14}
                  >
                    {recyclingCentersWithCoords.map((center) => (
                      <Marker
                        key={center.name}
                        position={center.position}
                        onClick={() => setSelectedCenter(center)}
                      />
                    ))}

                    {selectedCenter && (
                      <InfoWindow
                        position={selectedCenter.position}
                        onCloseClick={() => setSelectedCenter(null)}
                      >
                        <div className="p-2">
                          <h3 className="font-semibold">{selectedCenter.name}</h3>
                          <p className="text-sm">Distance: {selectedCenter.distance}</p>
                          <p className="text-sm">Accepts: {selectedCenter.types.join(', ')}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {recyclingCentersWithCoords.map((center) => (
              <Card 
                key={center.name}
                className={`cursor-pointer transition-transform hover:scale-105 ${
                  selectedCenter?.name === center.name ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedCenter(center)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{center.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Distance: {center.distance}</p>
                  <p className="text-gray-600">Accepts: {center.types.join(', ')}</p>
                  <button 
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${center.position.lat},${center.position.lng}`,
                        '_blank'
                      );
                    }}
                  >
                    📍 Get Directions
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">📅 Schedule a Pickup</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Pickup Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      placeholderText="Choose a date"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      dateFormat="MMMM d, yyyy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 border rounded-lg flex items-center justify-center gap-2 ${selectedTime === time
                              ? 'bg-green-500 text-white'
                              : 'hover:bg-gray-50'
                            }`}
                        >
                          <Clock className="h-4 w-4" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Waste Type
                    </label>
                    <select
                      value={pickupType}
                      onChange={(e) => setPickupType(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select waste type</option>
                      {pickupTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Waste Size
                    </label>
                    <select
                      required
                      value={wasteSize}
                      onChange={(e) => setWasteSize(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select waste size</option>
                      {wasteSizes.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      handlePickupClick();
                      alert('Pickup successfully scheduled!');
                    }}
                    disabled={!selectedDate || !selectedTime || !pickupType || !wasteSize}
                    className="w-full px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    Book For Pickup
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Upcoming Pickups</h3>
                <div className="space-y-2">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">♻ Recyclables</p>
                    <p className="text-gray-600">Friday, March 21 - 01:00 PM</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">🌱 Organic Waste</p>
                    <p className="text-gray-600">Friday, March 4 - 02:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default WasteManagementDashboard;