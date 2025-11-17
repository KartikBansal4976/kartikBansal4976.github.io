import { useState } from 'react';
import { Plus, Filter, Clock, Flame, Trash2 } from 'lucide-react';
import { getActivities, saveActivities, Activity } from '../utils/dataStore';

interface ActivityLogProps {
  showModal: (title: string, message: string) => void;
}

export default function ActivityLog({ showModal }: ActivityLogProps) {
  const [activities, setActivities] = useState<Activity[]>(getActivities());
  const [filter, setFilter] = useState<'All' | 'Morning' | 'Afternoon' | 'Evening'>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    calories: '',
    timeOfDay: 'Morning' as 'Morning' | 'Afternoon' | 'Evening',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const filteredActivities = filter === 'All'
    ? activities
    : activities.filter(activity => activity.timeOfDay === filter);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Activity name is required';
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      errors.duration = 'Duration must be greater than 0';
    }

    if (!formData.calories || parseInt(formData.calories) <= 0) {
      errors.calories = 'Calories must be greater than 0';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: formData.name,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
      timeOfDay: formData.timeOfDay,
      date: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    saveActivities(updatedActivities);

    setFormData({ name: '', duration: '', calories: '', timeOfDay: 'Morning' });
    setFormErrors({});
    setShowAddForm(false);
    showModal('Success!', 'Activity Added Successfully');
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
    saveActivities(updatedActivities);
  };

  const totalCalories = filteredActivities.reduce((sum, activity) => sum + activity.calories, 0);
  const totalDuration = filteredActivities.reduce((sum, activity) => sum + activity.duration, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Activity Log</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Activity</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <p className="text-blue-600 font-medium mb-1">Total Activities</p>
            <p className="text-3xl font-bold text-blue-700">{filteredActivities.length}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center space-x-2 mb-1">
              <Flame className="w-5 h-5 text-orange-600" />
              <p className="text-orange-600 font-medium">Total Calories</p>
            </div>
            <p className="text-3xl font-bold text-orange-700">{totalCalories}</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-5 h-5 text-emerald-600" />
              <p className="text-emerald-600 font-medium">Total Duration</p>
            </div>
            <p className="text-3xl font-bold text-emerald-700">{totalDuration} mins</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex space-x-2">
            {(['All', 'Morning', 'Afternoon', 'Evening'] as const).map((timeFilter) => (
              <button
                key={timeFilter}
                onClick={() => setFilter(timeFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === timeFilter
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeFilter}
              </button>
            ))}
          </div>
        </div>

        {showAddForm && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Activity</h3>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder="e.g., Morning Run"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.duration ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="30"
                  />
                  {formErrors.duration && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.duration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories Burned
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.calories ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="300"
                  />
                  {formErrors.calories && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.calories}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Day
                </label>
                <select
                  value={formData.timeOfDay}
                  onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value as 'Morning' | 'Afternoon' | 'Evening' })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  Add Activity
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', duration: '', calories: '', timeOfDay: 'Morning' });
                    setFormErrors({});
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{activity.name}</h3>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  {activity.timeOfDay}
                </span>
              </div>
              <button
                onClick={() => handleDeleteActivity(activity.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Duration</span>
                </div>
                <span className="font-semibold text-gray-900">{activity.duration} mins</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Calories</span>
                </div>
                <span className="font-semibold text-orange-600">{activity.calories} kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <p className="text-gray-500 text-lg">No activities found for this filter</p>
        </div>
      )}
    </div>
  );
}
