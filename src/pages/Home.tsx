import { Activity, Heart, Apple, Droplet, Footprints, TrendingUp, Shield, Target, Award, Clock } from 'lucide-react';

interface HomeProps {
  onEnter?: () => void;
}

export default function Home({ onEnter }: HomeProps) {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Activity className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Your Journey to Better Health Starts Here
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Track your wellness, monitor your progress, and achieve your fitness goals with FitTrack Pro
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onEnter}
                className="px-8 py-4 rounded-xl bg-white text-emerald-600 font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Journey
              </button>
              <button
                onClick={onEnter}
                className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Health Statistics Banner */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Your Health Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Footprints className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-2">10,000 Steps</h3>
            <p className="text-blue-700 text-center">
              Walking 10,000 steps daily can reduce the risk of heart disease by up to 50% and improve mental health.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-orange-900 text-center mb-2">150 Minutes</h3>
            <p className="text-orange-700 text-center">
              WHO recommends 150 minutes of moderate exercise weekly to maintain cardiovascular health and longevity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-cyan-500 p-3 rounded-lg">
                <Droplet className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-900 text-center mb-2">8 Glasses</h3>
            <p className="text-cyan-700 text-center">
              Proper hydration improves energy levels, cognitive function, and helps maintain healthy body temperature.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Powerful Features for Your Wellness</h2>
        <p className="text-gray-600 text-center mb-8">Everything you need to track and improve your health in one place</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group hover:shadow-xl transition-shadow rounded-xl p-6 border border-gray-200 hover:border-emerald-300">
            <div className="bg-emerald-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-emerald-500 transition-colors">
              <Target className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Goal Setting</h3>
            <p className="text-gray-600">
              Set personalized daily targets for steps, calories, and water intake. Track your progress in real-time.
            </p>
          </div>

          <div className="group hover:shadow-xl transition-shadow rounded-xl p-6 border border-gray-200 hover:border-blue-300">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-500 transition-colors">
              <Activity className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Activity Tracking</h3>
            <p className="text-gray-600">
              Log workouts, runs, cycling sessions and more. Monitor duration, distance, and calories burned.
            </p>
          </div>

          <div className="group hover:shadow-xl transition-shadow rounded-xl p-6 border border-gray-200 hover:border-orange-300">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-orange-500 transition-colors">
              <Apple className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Meal Planning</h3>
            <p className="text-gray-600">
              Plan your meals with nutritional information. Track calories, protein, carbs, and fats for balanced diet.
            </p>
          </div>

          <div className="group hover:shadow-xl transition-shadow rounded-xl p-6 border border-gray-200 hover:border-purple-300">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-500 transition-colors">
              <TrendingUp className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Data Insights</h3>
            <p className="text-gray-600">
              Visualize your progress with interactive charts. Identify trends and optimize your fitness routine.
            </p>
          </div>
        </div>
      </div>

      {/* Health Benefits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-lg mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Health Benefits</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Award className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Reduced Disease Risk</h4>
                <p className="text-white/90">Regular exercise lowers risk of diabetes, heart disease, and certain cancers by up to 40%.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Award className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Better Mental Health</h4>
                <p className="text-white/90">Physical activity releases endorphins, reducing stress, anxiety, and symptoms of depression.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Award className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Increased Longevity</h4>
                <p className="text-white/90">Active individuals live 3-7 years longer on average with better quality of life.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-lg mr-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Daily Wellness Tips</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0 font-bold">1</div>
              <div>
                <h4 className="font-bold mb-1">Start Your Day with Water</h4>
                <p className="text-white/90">Drink a glass of water within 30 minutes of waking to kickstart your metabolism.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0 font-bold">2</div>
              <div>
                <h4 className="font-bold mb-1">Move Every Hour</h4>
                <p className="text-white/90">Take short walking breaks to improve circulation and reduce sedentary time.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0 font-bold">3</div>
              <div>
                <h4 className="font-bold mb-1">Prioritize Sleep</h4>
                <p className="text-white/90">Aim for 7-9 hours of quality sleep nightly for optimal recovery and performance.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Built with Modern Technology</h2>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-900 mb-1">React 18</div>
              <div className="text-sm text-gray-600">UI Framework</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-900 mb-1">TypeScript</div>
              <div className="text-sm text-gray-600">Type Safety</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-900 mb-1">Tailwind CSS</div>
              <div className="text-sm text-gray-600">Styling</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-900 mb-1">Vite</div>
              <div className="text-sm text-gray-600">Build Tool</div>
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>🔐 Secure authentication powered by Clerk</li>
            <li>💾 Data persistence with localStorage for seamless experience</li>
            <li>📊 Interactive data visualizations for progress tracking</li>
            <li>🎨 Modern, responsive design that works on all devices</li>
            <li>⚡ Lightning-fast performance with optimized rendering</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
        <p className="text-xl mb-8 text-white/90">
          Join thousands of users who are already on their journey to better health and wellness.
        </p>
        <button
          onClick={onEnter}
          className="px-12 py-5 rounded-xl bg-white text-purple-600 font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}
