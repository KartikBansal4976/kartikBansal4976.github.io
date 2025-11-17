import { useState, useMemo } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { getActivities, resetDashboard } from '../utils/dataStore';

export default function InsightsSummary() {
  const activities = getActivities();
  const [hoveredActivityDay, setHoveredActivityDay] = useState<string | null>(null);
  const [hoveredCalorieDay, setHoveredCalorieDay] = useState<string | null>(null);

  // Aggregate real activity data by day of the week
  const weeklyData = useMemo(() => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const aggregated: Record<string, { activities: number; calories: number }> = {
      Mon: { activities: 0, calories: 0 },
      Tue: { activities: 0, calories: 0 },
      Wed: { activities: 0, calories: 0 },
      Thu: { activities: 0, calories: 0 },
      Fri: { activities: 0, calories: 0 },
      Sat: { activities: 0, calories: 0 },
      Sun: { activities: 0, calories: 0 },
    };

    // Aggregate activities by day of week
    activities.forEach(activity => {
      const date = new Date(activity.date);
      const dayName = dayNames[date.getDay()];
      aggregated[dayName].activities += 1;
      aggregated[dayName].calories += activity.calories;
    });

    return aggregated;
  }, [activities]);

  const maxActivities = Math.max(...Object.values(weeklyData).map(d => d.activities), 1);
  const maxCalories = Math.max(...Object.values(weeklyData).map(d => d.calories), 1);
  const avgActivities = Object.values(weeklyData).reduce((sum, d) => sum + d.activities, 0) / 7;
  const avgCalories = Object.values(weeklyData).reduce((sum, d) => sum + d.calories, 0) / 7;

  const handleDownloadSummary = () => {
    const summary = `
FitTrack Pro - Weekly Summary
===============================

Total Activities: ${activities.length}
Total Calories Burned: ${activities.reduce((sum, a) => sum + a.calories, 0)}
Total Duration: ${activities.reduce((sum, a) => sum + a.duration, 0)} minutes

Weekly Breakdown:
${Object.entries(weeklyData).map(([day, data]) => `${day}: ${data.activities} activities, ${data.calories} calories`).join('\n')}

Activities List:
${activities.map(a => `- ${a.name}: ${a.duration} mins, ${a.calories} kcal (${a.timeOfDay})`).join('\n')}
    `.trim();

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fittrack-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all dashboard data? This cannot be undone.')) {
      resetDashboard();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Info banner showing data status */}
      {activities.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                Showing data from <span className="font-bold">{activities.length}</span> {activities.length === 1 ? 'activity' : 'activities'}. 
                <span className="text-blue-700 ml-1">Hover over bars to see details. Days with no activities show as gray bars.</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Insights & Summary</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadSummary}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
            >
              <Download className="w-5 h-5" />
              <span>Download Summary</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset Dashboard</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
            <p className="text-emerald-600 font-medium mb-2">Total Activities</p>
            <p className="text-4xl font-bold text-emerald-700">{activities.length}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <p className="text-orange-600 font-medium mb-2">Total Calories Burned</p>
            <p className="text-4xl font-bold text-orange-700">
              {activities.reduce((sum, a) => sum + a.calories, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <p className="text-blue-600 font-medium mb-2">Total Duration</p>
            <p className="text-4xl font-bold text-blue-700">
              {activities.reduce((sum, a) => sum + a.duration, 0)} mins
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Weekly Activities</h3>
            <p className="text-sm text-gray-500 mt-1">Average: {avgActivities.toFixed(1)} activities/day</p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-700">Track Progress</span>
          </div>
        </div>
        
        <div className="relative h-80">
          {/* Y-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[5, 4, 3, 2, 1, 0].map((val) => (
              <div key={val} className="flex items-center">
                <span className="text-xs text-gray-400 w-6">{val}</span>
                <div className="flex-1 border-t border-gray-100 ml-2"></div>
              </div>
            ))}
          </div>
          
          {/* Chart bars */}
          <div className="absolute inset-0 flex items-end justify-between space-x-3 pl-8 pt-4">
            {Object.entries(weeklyData).map(([day, data]) => {
              const hasData = data.activities > 0;
              const percentage = hasData ? (data.activities / maxActivities) * 100 : 0;
              const isHovered = hoveredActivityDay === day;
              
              return (
                <div key={day} className="flex-1 flex flex-col items-center space-y-3 group h-full">
                  <div className="w-full flex-1 flex items-end justify-center relative">
                    {/* Bar or Empty State */}
                    <div
                      className="w-full relative cursor-pointer transition-all duration-300 ease-out"
                      onMouseEnter={() => setHoveredActivityDay(day)}
                      onMouseLeave={() => setHoveredActivityDay(null)}
                      style={{
                        height: hasData ? `${Math.max(percentage, 15)}%` : '10%',
                      }}
                    >
                      {/* Animated gradient bar or empty bar */}
                      <div className={`absolute inset-0 rounded-t-xl shadow-lg transition-all duration-300 ${
                        hasData 
                          ? 'bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400' 
                          : 'bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 border-2 border-dashed border-gray-300'
                      } ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}`}>
                        {/* Shine effect */}
                        {hasData && (
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-20 rounded-t-xl"></div>
                        )}
                        
                        {/* Ripple effect on hover */}
                        {isHovered && hasData && (
                          <div className="absolute inset-0 bg-white animate-ping opacity-25 rounded-t-xl"></div>
                        )}
                        
                        {/* No data indicator */}
                        {!hasData && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-400">0</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Floating tooltip */}
                      <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}>
                        <div className={`text-white px-4 py-3 rounded-xl shadow-2xl relative ${
                          hasData ? 'bg-gray-900' : 'bg-gray-600'
                        }`}>
                          <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">{data.activities}</span>
                            <span className="text-xs text-gray-300 whitespace-nowrap">
                              {data.activities === 1 ? 'activity' : 'activities'}
                            </span>
                          </div>
                          {/* Arrow */}
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${
                            hasData ? 'border-t-gray-900' : 'border-t-gray-600'
                          }`}></div>
                        </div>
                      </div>
                      
                      {/* Value on bar */}
                      {hasData && (
                        <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                          isHovered ? 'opacity-0' : 'opacity-100'
                        }`}>
                          <span className="text-xs font-bold text-white drop-shadow-md">{data.activities}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Day label */}
                  <div className={`text-center transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}>
                    <span className={`text-sm font-bold transition-colors ${
                      isHovered ? 'text-emerald-600' : 'text-gray-700'
                    }`}>{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded"></div>
            <span>Activity Count</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-emerald-500 rounded"></div>
            <span>Hover for details</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Weekly Calories Burned</h3>
            <p className="text-sm text-gray-500 mt-1">Average: {Math.round(avgCalories)} kcal/day</p>
          </div>
          <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-orange-700">Energy Burned</span>
          </div>
        </div>
        
        <div className="relative h-80">
          {/* Y-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[800, 600, 400, 200, 0].map((val) => (
              <div key={val} className="flex items-center">
                <span className="text-xs text-gray-400 w-10">{val}</span>
                <div className="flex-1 border-t border-gray-100 ml-2"></div>
              </div>
            ))}
          </div>
          
          {/* Chart bars with flame effect */}
          <div className="absolute inset-0 flex items-end justify-between space-x-3 pl-12 pt-4">
            {Object.entries(weeklyData).map(([day, data]) => {
              const hasData = data.calories > 0;
              const percentage = hasData ? (data.calories / maxCalories) * 100 : 0;
              const isHovered = hoveredCalorieDay === day;
              
              return (
                <div key={day} className="flex-1 flex flex-col items-center space-y-3 group h-full">
                  <div className="w-full flex-1 flex items-end justify-center relative">
                    {/* Bar with flame gradient */}
                    <div
                      className="w-full relative cursor-pointer transition-all duration-300 ease-out"
                      onMouseEnter={() => setHoveredCalorieDay(day)}
                      onMouseLeave={() => setHoveredCalorieDay(null)}
                      style={{
                        height: hasData ? `${Math.max(percentage, 15)}%` : '10%',
                      }}
                    >
                      {/* Animated flame gradient bar or empty bar */}
                      <div className={`absolute inset-0 rounded-t-xl shadow-lg transition-all duration-300 ${
                        hasData
                          ? 'bg-gradient-to-t from-orange-600 via-orange-500 to-yellow-400'
                          : 'bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 border-2 border-dashed border-gray-300'
                      } ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}`}>
                        {/* Flame flicker effect */}
                        {hasData && (
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300 to-transparent opacity-30 rounded-t-xl animate-pulse"></div>
                        )}
                        
                        {/* Glow effect on hover */}
                        {isHovered && hasData && (
                          <>
                            <div className="absolute inset-0 bg-orange-300 animate-ping opacity-20 rounded-t-xl"></div>
                            <div className="absolute -inset-1 bg-gradient-to-t from-orange-400 to-yellow-400 blur-md opacity-50 rounded-t-xl"></div>
                          </>
                        )}
                        
                        {/* No data indicator */}
                        {!hasData && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-400">0</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Floating tooltip with fire icon */}
                      <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}>
                        <div className={`text-white px-4 py-3 rounded-xl shadow-2xl relative ${
                          hasData ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gray-600'
                        }`}>
                          <div className="flex flex-col items-center">
                            {hasData && (
                              <div className="flex items-center space-x-1 mb-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                                <span className="text-2xl font-bold">{data.calories}</span>
                              </div>
                            )}
                            {!hasData && (
                              <span className="text-2xl font-bold">{data.calories}</span>
                            )}
                            <span className="text-xs text-orange-100 whitespace-nowrap">
                              {data.calories === 1 ? 'calorie' : 'calories'} burned
                            </span>
                          </div>
                          {/* Arrow */}
                          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${
                            hasData ? 'border-t-red-600' : 'border-t-gray-600'
                          }`}></div>
                        </div>
                      </div>
                      
                      {/* Value on bar */}
                      {hasData && (
                        <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                          isHovered ? 'opacity-0' : 'opacity-100'
                        }`}>
                          <span className="text-xs font-bold text-white drop-shadow-lg">{data.calories}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Day label */}
                  <div className={`text-center transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}>
                    <span className={`text-sm font-bold transition-colors ${
                      isHovered ? 'text-orange-600' : 'text-gray-700'
                    }`}>{day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend and stats */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-t from-orange-600 to-yellow-400 rounded"></div>
              <span>Calories Burned</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-500 rounded"></div>
              <span>Hover for details</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-bold text-orange-700">
              Total: {Object.values(weeklyData).reduce((sum, d) => sum + d.calories, 0).toLocaleString()} kcal
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Activity Breakdown by Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['Morning', 'Afternoon', 'Evening'] as const).map((timeOfDay) => {
            const count = activities.filter(a => a.timeOfDay === timeOfDay).length;
            const totalActivities = activities.length || 1;
            const percentage = (count / totalActivities) * 100;

            return (
              <div key={timeOfDay} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{timeOfDay}</span>
                  <span className="text-sm text-gray-600">{count} activities</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-4 rounded-full transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage > 15 && (
                      <span className="text-xs text-white font-semibold">
                        {Math.round(percentage)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
