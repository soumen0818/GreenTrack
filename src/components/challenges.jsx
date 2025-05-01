import React, { useState } from 'react';
import { Trophy, Award, Gift, Users, ChevronRight, Leaf, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useNavigate } from 'react-router-dom';

const GreenChallengesPage = () => {
  const [selectedTab, setSelectedTab] = useState('challenges');
  const navigate = useNavigate();

  const challenges = [
    {
      id: 1,
      title: "7-days Tree Planting Challenge",
      description: "Plant different kinds of trees for 7-days",
      points: 500,
      participants: 1234,
      progress: 60,
      daysLeft: 3,
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Bike to Work Month",
      description: "Use bicycle for your daily commute",
      points: 1000,
      participants: 856,
      progress: 45,
      daysLeft: 15,
      difficulty: "Hard"
    },
    {
      id: 3,
      title: "Electricity Consumption Reduction",
      description: "Reduce your electricity consumption by 30%",
      points: 300,
      participants: 2541,
      progress: 80,
      daysLeft: 1,
      difficulty: "Easy"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "EcoWarrior", points: 15000 },
    { rank: 2, name: "GreenHero", points: 12500 },
    { rank: 3, name: "EarthGuardian", points: 10000 }
  ];

  const rewards = [
    {
      id: 1,
      title: "Eco-friendly Water Bottle",
      points: 5000,
      description: "Stainless steel, zero-waste water bottle"
    },
    {
      id: 2,
      title: "Tree Planting Certificate",
      points: 2000,
      description: "Plant a tree in your name"
    },
    {
      id: 3,
      title: "Solar Power Bank",
      points: 8000,
      description: "Charge your devices using solar energy"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Add back button */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex items-center mb-8">
        <Trophy className="w-8 h-8 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold">Green Challenges & Rewards</h1>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTab === 'challenges' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => setSelectedTab('challenges')}
        >
          Active Challenges
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTab === 'leaderboard' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => setSelectedTab('leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTab === 'rewards' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100'
          }`}
          onClick={() => setSelectedTab('rewards')}
        >
          Rewards
        </button>
      </div>

      {selectedTab === 'challenges' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map(challenge => (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{challenge.title}</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {challenge.points} pts
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {challenge.participants} joined
                    </span>
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                  {/* Add Join Challenge Button */}
                  <button 
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    onClick={() => {
                      // Add your join logic here
                      alert(`Joined ${challenge.title} challenge!`);
                    }}
                  >
                    <Leaf className="w-4 h-4 mr-2" />
                    Join Challenge
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map(user => (
                <div 
                  key={user.rank}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-4 text-gray-500">
                      #{user.rank}
                    </span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {user.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === 'rewards' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map(reward => (
            <Card key={reward.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{reward.title}</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {reward.points} pts
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Reward
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GreenChallengesPage;