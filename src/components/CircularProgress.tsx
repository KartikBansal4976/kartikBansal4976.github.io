interface CircularProgressProps {
  percentage: number;
  color: 'blue' | 'orange' | 'cyan';
}

export default function CircularProgress({ percentage, color }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const colorMap = {
    blue: '#3B82F6',
    orange: '#F97316',
    cyan: '#06B6D4',
  };

  const bgColorMap = {
    blue: '#DBEAFE',
    orange: '#FFEDD5',
    cyan: '#CFFAFE',
  };

  return (
    <div className="relative w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="48"
          cy="48"
          r="45"
          stroke={bgColorMap[color]}
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="48"
          cy="48"
          r="45"
          stroke={colorMap[color]}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900">
          {Math.round(Math.min(percentage, 100))}%
        </span>
      </div>
    </div>
  );
}
