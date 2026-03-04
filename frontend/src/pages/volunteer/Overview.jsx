import { motion } from 'framer-motion';
import KPICards from '../../components/volunteer/KPICards';
import ProgressBars from '../../components/volunteer/ProgressBars';
import StatusDistribution from '../../components/volunteer/StatusDistribution';
import SatisfactionGauge from '../../components/volunteer/SatisfactionGauge';

const Overview = () => {
  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-white min-h-screen">
      {/* Page Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-[#01070f] text-[32px] font-bold mb-2 font-['Montserrat']">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm">Welcome back! Here's what's happening with your volunteer activities.</p>
      </motion.div>

      {/* KPI Cards */}
      <KPICards />
      
      {/* Progress Bars */}
      <ProgressBars />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusDistribution />
        <SatisfactionGauge />
      </div>
    </div>
  );
};

export default Overview;
