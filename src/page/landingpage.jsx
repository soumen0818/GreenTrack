
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Globe, Award, Battery, Car, Users } from 'lucide-react';
import "../App.css";
const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');  // Updated to match the new route
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
            {/* Hero Section */}
            <div className="container mx-auto px-4 pt-20 pb-32">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold text-green-800 mb-6">
                        Track Your Environmental Impact
                    </h1>
                    <p className="text-2xl text-green-700 mb-8 max-w-2xl mx-auto">
                        Join the movement towards a sustainable future with AI-powered environmental monitoring and tracking
                        <h1 className="font-semibold text-3xl">"Surrounded by green my soul feels clean"</h1>
                    </p>
                    <button 
                        onClick={handleGetStarted}
                        className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center mx-auto gap-2 mb-16"
                    >
                        Get Started <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <StatCard
                            icon={<Users className="w-12 h-12 text-green-600" />}
                            value="50,000+"
                            label="Active Users"
                        />
                        <StatCard
                            icon={<Leaf className="w-12 h-12 text-green-600" />}
                            value="100,000+"
                            label="Trees Planted"
                        />
                        <StatCard
                            icon={<Award className="w-12 h-12 text-green-600" />}
                            value="500,000"
                            label="Carbon Credits Earned"
                        />
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
                        Key Features
                    </h2>
                    <p className="text-center text-green-600 mb-16 max-w-2xl mx-auto">
                        Discover how GreenTrack helps you make a positive impact on the environment
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Leaf className="w-8 h-8 text-green-600" />}
                            title="Carbon Footprint Tracker"
                            description="Track your daily activities and get personalized recommendations to reduce your carbon footprint"
                        />
                        <FeatureCard
                            icon={<Recycle className="w-8 h-8 text-green-600" />}
                            title="Smart Waste Management"
                            description="AI-powered waste categorization and recycling center locations"
                        />
                        <FeatureCard
                            icon={<Globe className="w-8 h-8 text-green-600" />}
                            title="Environmental Monitoring"
                            description="Real-time air, water, and noise pollution tracking with alerts"
                        />
                        <FeatureCard
                            icon={<Award className="w-8 h-8 text-green-600" />}
                            title="Eco Challenges & Rewards"
                            description="Participate in green challenges and earn rewards for sustainable actions"
                        />
                        <FeatureCard
                            icon={<Battery className="w-8 h-8 text-green-600" />}
                            title="Energy Optimization"
                            description="Smart energy monitoring and AI-powered optimization suggestions"
                        />
                        <FeatureCard
                            icon={<Car className="w-8 h-8 text-green-600" />}
                            title="Sustainable Mobility"
                            description="Track and optimize your travel footprint with eco-friendly alternatives"
                        />
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-4">
                        Make a Real Impact
                    </h2>
                    <p className="text-center text-green-600 mb-16 max-w-2xl mx-auto">
                        Join thousands of users who are making a difference every day
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ImpactCard
                            title="Individual Impact"
                            description="Track your personal environmental footprint and make informed decisions to reduce your impact on the planet."
                            stats={[
                                { label: "Average CO₂ Reduction", value: "2.5 tons/year" },
                                { label: "Trees Planted", value: "5 trees/month" }
                            ]}
                        />
                        <ImpactCard
                            title="Community Impact"
                            description="Join local initiatives and collaborate with others to create a bigger environmental impact in your community."
                            stats={[
                                { label: "Community Projects", value: "1,000+" },
                                { label: "Total Carbon Credits", value: "50,000+" }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, value, label }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex flex-col items-center">
                <div className="mb-4">
                    {icon}
                </div>
                <div className="text-3xl font-bold text-green-800 mb-2">{value}</div>
                <div className="text-green-600">{label}</div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">{title}</h3>
            <p className="text-green-700">{description}</p>
        </div>
    );
};

const ImpactCard = ({ title, description, stats }) => {
    return (
        <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">{title}</h3>
            <p className="text-green-700 mb-6">{description}</p>
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index}>
                        <div className="text-lg font-semibold text-green-800">{stat.value}</div>
                        <div className="text-sm text-green-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;