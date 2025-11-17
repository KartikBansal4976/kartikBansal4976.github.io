export interface WellnessData {
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  water: number;
  waterGoal: number;
}

export interface Activity {
  id: string;
  name: string;
  duration: number;
  calories: number;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  date: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  type: 'breakfast' | 'lunch' | 'dinner';
}

const defaultWellnessData: WellnessData = {
  steps: 7842,
  stepsGoal: 10000,
  calories: 1847,
  caloriesGoal: 2500,
  water: 6,
  waterGoal: 8,
};

const defaultActivities: Activity[] = [
  { id: '1', name: 'Morning Run', duration: 30, calories: 300, timeOfDay: 'Morning', date: new Date().toISOString() },
  { id: '2', name: 'Yoga Session', duration: 45, calories: 150, timeOfDay: 'Morning', date: new Date().toISOString() },
  { id: '3', name: 'Cycling', duration: 60, calories: 450, timeOfDay: 'Afternoon', date: new Date().toISOString() },
  { id: '4', name: 'Weight Training', duration: 40, calories: 200, timeOfDay: 'Afternoon', date: new Date().toISOString() },
  { id: '5', name: 'Evening Walk', duration: 20, calories: 100, timeOfDay: 'Evening', date: new Date().toISOString() },
];

const defaultMeals: Meal[] = [
  { id: '1', name: 'Oatmeal with Berries', calories: 350, type: 'breakfast' },
  { id: '2', name: 'Greek Yogurt', calories: 150, type: 'breakfast' },
  { id: '3', name: 'Grilled Chicken Salad', calories: 450, type: 'lunch' },
  { id: '4', name: 'Brown Rice Bowl', calories: 380, type: 'lunch' },
  { id: '5', name: 'Salmon with Vegetables', calories: 520, type: 'dinner' },
  { id: '6', name: 'Quinoa Stir-fry', calories: 420, type: 'dinner' },
];

export const getWellnessData = (): WellnessData => {
  const stored = localStorage.getItem('wellnessData');
  return stored ? JSON.parse(stored) : defaultWellnessData;
};

export const saveWellnessData = (data: WellnessData): void => {
  localStorage.setItem('wellnessData', JSON.stringify(data));
};

export const getActivities = (): Activity[] => {
  const stored = localStorage.getItem('activities');
  return stored ? JSON.parse(stored) : defaultActivities;
};

export const saveActivities = (activities: Activity[]): void => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

export const getMeals = (): Meal[] => {
  const stored = localStorage.getItem('meals');
  return stored ? JSON.parse(stored) : defaultMeals;
};

export const saveMeals = (meals: Meal[]): void => {
  localStorage.setItem('meals', JSON.stringify(meals));
};

export const resetDashboard = (): void => {
  localStorage.setItem('wellnessData', JSON.stringify(defaultWellnessData));
  localStorage.setItem('activities', JSON.stringify(defaultActivities));
  localStorage.setItem('meals', JSON.stringify(defaultMeals));
};
