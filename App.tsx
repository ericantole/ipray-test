
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Navigation } from './components/Navigation';
import { PaywallModal } from './components/PaywallModal';
import { StorageService } from './services/storage';

// Screens
import { TodayScreen } from './screens/Today';
import { PrayerFlowScreen } from './screens/PrayerFlow';
import { LibraryScreen } from './screens/Library';
import { MyPrayersScreen } from './screens/MyPrayers';
import { SettingsScreen } from './screens/Settings';
import { OnboardingScreen } from './screens/Onboarding';

const App: React.FC = () => {
  const isOnboardingComplete = StorageService.isOnboardingComplete();

  return (
    <AppProvider>
      <HashRouter>
        <div className="font-sans antialiased">
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to={isOnboardingComplete ? "/today" : "/onboarding"} replace />} 
            />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/today" element={<TodayScreen />} />
            <Route path="/pray" element={<PrayerFlowScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/my-prayers" element={<MyPrayersScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
          
          <Navigation />
          <PaywallModal />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
