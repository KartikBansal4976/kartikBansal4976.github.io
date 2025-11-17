import { useState } from 'react';
import { Plus, Trash2, Coffee, Sun, Moon } from 'lucide-react';
import { getMeals, saveMeals, Meal } from '../utils/dataStore';

export default function MealPlanner() {
  const [meals, setMeals] = useState<Meal[]>(getMeals());
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
  });

  const breakfastMeals = meals.filter(meal => meal.type === 'breakfast');
  const lunchMeals = meals.filter(meal => meal.type === 'lunch');
  const dinnerMeals = meals.filter(meal => meal.type === 'dinner');

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.calories || parseInt(formData.calories) <= 0) {
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: formData.name,
      calories: parseInt(formData.calories),
      type: selectedType,
    };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    saveMeals(updatedMeals);

    setFormData({ name: '', calories: '' });
    setShowAddForm(false);
  };

  const handleDeleteMeal = (id: string) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    setMeals(updatedMeals);
    saveMeals(updatedMeals);
  };

  const MealCard = ({ meal }: { meal: Meal }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{meal.name}</h4>
          <p className="text-sm text-orange-600 font-medium">{meal.calories} kcal</p>
        </div>
        <button
          onClick={() => handleDeleteMeal(meal.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Meal Planner</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Meal</span>
          </button>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-6 border border-orange-200">
          <p className="text-orange-600 font-medium mb-2">Total Daily Calories</p>
          <p className="text-4xl font-bold text-orange-700">{totalCalories} kcal</p>
        </div>

        {showAddForm && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Meal</h3>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Type
                </label>
                <div className="flex space-x-2">
                  {(['breakfast', 'lunch', 'dinner'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                        selectedType === type
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Grilled Chicken Salad"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calories
                </label>
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="350"
                  required
                  min="1"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  Add Meal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', calories: '' });
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Coffee className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Breakfast</h3>
              <p className="text-sm text-gray-600">
                {breakfastMeals.reduce((sum, meal) => sum + meal.calories, 0)} kcal
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {breakfastMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
            {breakfastMeals.length === 0 && (
              <p className="text-gray-400 text-center py-4">No meals added</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Sun className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Lunch</h3>
              <p className="text-sm text-gray-600">
                {lunchMeals.reduce((sum, meal) => sum + meal.calories, 0)} kcal
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {lunchMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
            {lunchMeals.length === 0 && (
              <p className="text-gray-400 text-center py-4">No meals added</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Moon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Dinner</h3>
              <p className="text-sm text-gray-600">
                {dinnerMeals.reduce((sum, meal) => sum + meal.calories, 0)} kcal
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {dinnerMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
            {dinnerMeals.length === 0 && (
              <p className="text-gray-400 text-center py-4">No meals added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
