import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ActivityChart = () => {
  const canvasRef = useRef(null);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calls',
        data: [12, 19, 15, 25, 22, 18, 24],
        color: '#3b82f6',
        gradient: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.05)']
      },
      {
        label: 'Tasks',
        data: [8, 12, 10, 18, 15, 12, 16],
        color: '#10b981',
        gradient: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.05)']
      }
    ]
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find max value
    const allValues = data.datasets.flatMap(d => d.data);
    const maxValue = Math.max(...allValues);
    const yScale = chartHeight / maxValue;
    const xStep = chartWidth / (data.labels.length - 1);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Draw Y-axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding.top + (chartHeight / 5) * i;
      ctx.fillText(value.toString(), padding.left - 10, y);
    }

    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      const points = dataset.data.map((value, index) => ({
        x: padding.left + index * xStep,
        y: padding.top + chartHeight - value * yScale
      }));

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, dataset.gradient[0]);
      gradient.addColorStop(1, dataset.gradient[1]);

      ctx.beginPath();
      ctx.moveTo(points[0].x, height - padding.bottom);
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.lineTo(point.x, point.y);
        } else {
          const prevPoint = points[index - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          ctx.bezierCurveTo(cpX, prevPoint.y, cpX, point.y, point.x, point.y);
        }
      });
      ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          const prevPoint = points[index - 1];
          const cpX = (prevPoint.x + point.x) / 2;
          ctx.bezierCurveTo(cpX, prevPoint.y, cpX, point.y, point.x, point.y);
        }
      });
      ctx.stroke();

      // Draw points
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dataset.color;
        ctx.fill();
        ctx.strokeStyle = '#01070f';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // Draw X-axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    data.labels.forEach((label, index) => {
      const x = padding.left + index * xStep;
      ctx.fillText(label, x, height - padding.bottom + 10);
    });

  }, [data]);

  // Calculate stats
  const currentWeekCalls = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const currentWeekTasks = data.datasets[1].data.reduce((a, b) => a + b, 0);
  const lastWeekCalls = 120;
  const lastWeekTasks = 85;
  const callsChange = ((currentWeekCalls - lastWeekCalls) / lastWeekCalls * 100).toFixed(1);
  const tasksChange = ((currentWeekTasks - lastWeekTasks) / lastWeekTasks * 100).toFixed(1);

  return (
    <motion.div
      className="bg-[#01070f] rounded-2xl p-6 shadow-lg border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white text-xl font-bold mb-2 font-['Montserrat']">Weekly Activity</h3>
          <p className="text-white/60 text-sm">Your performance this week</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            <span className="text-white/70 text-sm font-medium">Calls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span className="text-white/70 text-sm font-medium">Tasks</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Total Calls</span>
            <div className={`flex items-center gap-1 text-xs font-semibold ${callsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {callsChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(callsChange)}%
            </div>
          </div>
          <div className="text-white text-2xl font-bold font-['Montserrat']">{currentWeekCalls}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Total Tasks</span>
            <div className={`flex items-center gap-1 text-xs font-semibold ${tasksChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {tasksChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(tasksChange)}%
            </div>
          </div>
          <div className="text-white text-2xl font-bold font-['Montserrat']">{currentWeekTasks}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: '300px' }}
        />
      </div>
    </motion.div>
  );
};

export default ActivityChart;
