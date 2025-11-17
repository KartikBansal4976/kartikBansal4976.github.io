import { useEffect, useState } from 'react';
import { Footprints, Flame, Droplet, Clock } from 'lucide-react';
import CircularProgress from '../components/CircularProgress';
import { getWellnessData, saveWellnessData } from '../utils/dataStore';

export default function WellnessOverview() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wellnessData, setWellnessData] = useState(getWellnessData());
  
  // Modal state at parent level
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepsGoalInput, setStepsGoalInput] = useState<number>(wellnessData.stepsGoal);
  const [caloriesGoalInput, setCaloriesGoalInput] = useState<number>(wellnessData.caloriesGoal);
  const [waterGoalInput, setWaterGoalInput] = useState<number>(wellnessData.waterGoal);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveWellnessData(wellnessData);
  }, [wellnessData]);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d: Date) => d.toLocaleDateString();

  const openEditModal = () => {
    setStepsGoalInput(wellnessData.stepsGoal);
    setCaloriesGoalInput(wellnessData.caloriesGoal);
    setWaterGoalInput(wellnessData.waterGoal);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const saveTargets = () => {
    const stepsG = Math.max(1, Math.round(stepsGoalInput));
    const calG = Math.max(1, Math.round(caloriesGoalInput));
    const waterG = Math.max(1, Math.round(waterGoalInput));

    setWellnessData(prev => ({ ...prev, stepsGoal: stepsG, caloriesGoal: calG, waterGoal: waterG }));
    setIsModalOpen(false);

  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-gray-900">Daily Wellness Overview</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-semibold">{formatTime(currentTime)}</span>
            </div>
            <button 
              onClick={openEditModal}
              className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Edit Targets
            </button>
          </div>
        </div>
        <p className="text-gray-600">{formatDate(currentTime)}</p>
      </div>

      {/* Edit Targets Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={closeEditModal}
          />
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-3">Set Targets</h3>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Steps Goal</label>
                <input
                  type="number"
                  value={stepsGoalInput}
                  onChange={e => setStepsGoalInput(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                  min={1}
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Calories Goal</label>
                <input
                  type="number"
                  value={caloriesGoalInput}
                  onChange={e => setCaloriesGoalInput(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                  min={1}
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Water Goal (glasses)</label>
                <input
                  type="number"
                  value={waterGoalInput}
                  onChange={e => setWaterGoalInput(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                  min={1}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={closeEditModal} className="px-3 py-2 rounded-md border border-gray-200 text-gray-700">Cancel</button>
              <button onClick={saveTargets} className="px-3 py-2 rounded-md bg-emerald-600 text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Footprints className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Steps</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{wellnessData.steps.toLocaleString()}</p>
              <p className="text-sm text-gray-600">of {wellnessData.stepsGoal.toLocaleString()} goal</p>
            </div>
            <CircularProgress
              percentage={(wellnessData.steps / wellnessData.stepsGoal) * 100}
              color="blue"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((wellnessData.steps / wellnessData.stepsGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Calories</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{wellnessData.calories.toLocaleString()}</p>
              <p className="text-sm text-gray-600">of {wellnessData.caloriesGoal.toLocaleString()} goal</p>
            </div>
            <CircularProgress
              percentage={(wellnessData.calories / wellnessData.caloriesGoal) * 100}
              color="orange"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((wellnessData.calories / wellnessData.caloriesGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-cyan-100 p-2 rounded-lg">
                  <Droplet className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Water</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{wellnessData.water}</p>
              <p className="text-sm text-gray-600">of {wellnessData.waterGoal} glasses</p>
            </div>
            <CircularProgress
              percentage={(wellnessData.water / wellnessData.waterGoal) * 100}
              color="cyan"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((wellnessData.water / wellnessData.waterGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Today's Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-emerald-100 mb-1">Steps Progress</p>
            <p className="text-3xl font-bold">{Math.round((wellnessData.steps / wellnessData.stepsGoal) * 100)}%</p>
          </div>
          <div>
            <p className="text-emerald-100 mb-1">Calories Progress</p>
            <p className="text-3xl font-bold">{Math.round((wellnessData.calories / wellnessData.caloriesGoal) * 100)}%</p>
          </div>
          <div>
            <p className="text-emerald-100 mb-1">Hydration Progress</p>
            <p className="text-3xl font-bold">{Math.round((wellnessData.water / wellnessData.waterGoal) * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
