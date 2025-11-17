import { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import WellnessOverview from './pages/WellnessOverview';
import ActivityLog from './pages/ActivityLog';
import MealPlanner from './pages/MealPlanner';
import InsightsSummary from './pages/InsightsSummary';
import CustomModal from './components/CustomModal';
import Home from './pages/Home';

function App() {
  // include 'home' so we can show a landing page before entering the app
  const [currentPage, setCurrentPage] = useState<'home' | 'wellness' | 'activity' | 'meals' | 'insights'>('home');
  const [modalContent, setModalContent] = useState<{ show: boolean; title: string; message: string }>({
    show: false,
    title: '',
    message: '',
  });

  const showModal = (title: string, message: string) => {
    setModalContent({ show: true, title, message });
  };

  const closeModal = () => {
    setModalContent({ show: false, title: '', message: '' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onEnter={() => setCurrentPage('wellness')} />;
      case 'wellness':
        return <WellnessOverview />;
      case 'activity':
        return <ActivityLog showModal={showModal} />;
      case 'meals':
        return <MealPlanner />;
      case 'insights':
        return <InsightsSummary />;
      default:
        return <WellnessOverview />;
    }
  };

  return (
    <>
      <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </DashboardLayout>
      {modalContent.show && (
        <CustomModal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
