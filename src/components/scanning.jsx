import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft } from 'lucide-react';
import Webcam from 'react-webcam';

const Scanning = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      setTimeout(() => {
        const mockResult = {
          type: 'Recyclable',
          item: 'Plastic Bottle',
          confidence: '95%'
        };
        setScanResult(mockResult);
        setIsScanning(false);
      }, 2000);
    } catch (error) {
      console.error('Scanning error:', error);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate('/waste')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Waste Management
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Waste Scanner</h2>
        
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>

        {scanResult && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Scan Result</h3>
            <p className="mt-2">Type: {scanResult.type}</p>
            <p>Item: {scanResult.item}</p>
            <p>Confidence: {scanResult.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanning;