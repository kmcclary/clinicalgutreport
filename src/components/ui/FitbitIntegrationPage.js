import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { 
  ChevronDown, ChevronRight, Info, Activity, HeartPulse, Moon, Utensils, Scale, RefreshCcw, ShieldAlert, Smartphone, Bell, Settings 
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  LineElement,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const FitbitIntegrationPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    connectFitbit: false,
    syncData: false,
    activity: false,
    heartRate: false,
    sleep: false,
    nutrition: false,
    weight: false,
    goals: false,
    privacy: false,
    mobileIntegration: false,
    advancedSettings: false,
    troubleshooting: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // State placeholders for Fitbit connection and data sync
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [autoSyncInterval, setAutoSyncInterval] = useState('24h');
  const [permissions, setPermissions] = useState({
    activity: true,
    heartRate: true,
    sleep: true,
    nutrition: true,
    weight: true,
  });

  // Example activity data for charts
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Steps',
        data: [8000, 6500, 12000, 9000, 15000, 11000, 7000],
        borderColor: 'rgba(54, 162, 235, 0.7)',
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        fill: true
      }
    ]
  };

  const activityOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weekly Steps Overview'
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Steps' } },
      x: { title: { display: true, text: 'Day of Week' } }
    }
  };

  // Example heart rate data
  const hrData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Resting HR (bpm)',
        data: [62, 60, 63, 64, 61, 59, 60],
        borderColor: 'rgba(255, 99, 132, 0.7)',
        fill: false,
      }
    ]
  };

  const hrOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Resting Heart Rate Over the Week'
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: 'BPM' } },
      x: { title: { display: true, text: 'Day of Week' } }
    }
  };

  // Heart rate zones pie chart example
  const hrZonesData = {
    labels: ['Fat Burn', 'Cardio', 'Peak'],
    datasets: [
      {
        data: [120, 60, 20],
        backgroundColor: [
          'rgba(75,192,192,0.7)',
          'rgba(255,206,86,0.7)',
          'rgba(255,99,132,0.7)'
        ]
      }
    ]
  };

  const hrZonesOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Time in Heart Rate Zones (minutes)'
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  // Sleep data stacked bar example
  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'REM',
        data: [50, 40, 45, 60, 55, 42, 38],
        backgroundColor: 'rgba(153,102,255,0.7)',
        stack: 'stack1'
      },
      {
        label: 'Light',
        data: [200, 220, 210, 190, 230, 200, 215],
        backgroundColor: 'rgba(54,162,235,0.7)',
        stack: 'stack1'
      },
      {
        label: 'Deep',
        data: [70, 65, 80, 75, 60, 65, 70],
        backgroundColor: 'rgba(255,159,64,0.7)',
        stack: 'stack1'
      }
    ]
  };

  const sleepOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sleep Stages (minutes) Over the Week'
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      x: { stacked: true, title: { display: true, text: 'Day of Week' } },
      y: { stacked: true, title: { display: true, text: 'Minutes' } }
    }
  };

  // Nutrition data example: daily calories in vs out
  const nutritionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories In',
        data: [2200, 2000, 2100, 2300, 2400, 2500, 1900],
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      },
      {
        label: 'Calories Out',
        data: [2300, 2100, 2200, 2050, 2600, 2700, 2000],
        backgroundColor: 'rgba(75,192,192,0.7)'
      }
    ]
  };

  const nutritionOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Caloric Balance Over the Week'
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Calories' } },
      x: { title: { display: true, text: 'Day of Week' } }
    }
  };

  // Weight data example: line chart
  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 69.8, 69.5, 69.2, 69.0],
        borderColor: 'rgba(255, 206, 86, 0.7)',
        fill: false
      }
    ]
  };

  const weightOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weight Trend Over 5 Weeks'
      },
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      x: { title: { display: true, text: 'Time (Weeks)' } },
      y: { beginAtZero: false, title: { display: true, text: 'Weight (kg)' } }
    }
  };

  // Handler for mock Fitbit connect
  const handleConnect = () => {
    // Here you’d handle OAuth with Fitbit
    setIsConnected(true);
  };

  const handleSync = () => {
    // Here you’d trigger a manual sync from Fitbit’s APIs
    const now = new Date().toLocaleString();
    setLastSync(now);
  };

  return (
    <Card className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border border-gray-200 mb-10">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2">
          <RefreshCcw className="h-6 w-6 text-gray-800" />
          <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent text-lg font-semibold">
            Fitbit Data Integration
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-6 space-y-6">

        {/* Introduction */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('introduction')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Introduction</h2>
            </div>
            {expandedSections.introduction ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.introduction && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                By connecting your Fitbit account, you can seamlessly integrate your activity, sleep, heart rate, nutrition, and weight data into our platform. This integration allows you to view comprehensive insights, track your progress over time, and receive personalized recommendations.
              </p>
              <p>
                Before proceeding, please review what data you'd like to share and how often you'd like it to sync. You will have full control over the permissions and can revoke access at any time.
              </p>
            </div>
          )}
        </section>

        {/* Connect to Fitbit */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('connectFitbit')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Connect Your Fitbit</h2>
            </div>
            {expandedSections.connectFitbit ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.connectFitbit && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              {isConnected ? (
                <p className="text-green-700 font-medium">
                  Your Fitbit account is successfully connected!
                </p>
              ) : (
                <>
                  <p>Please click the button below to authenticate with Fitbit:</p>
                  <button onClick={handleConnect} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Connect to Fitbit
                  </button>
                </>
              )}
              <div className="mt-4">
                <h3 className="text-md font-medium">Data Access Permissions</h3>
                <p>Choose which types of data you want to share:</p>
                <div className="flex flex-col gap-2 mt-2">
                  {Object.keys(permissions).map((key) => (
                    <label key={key} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={permissions[key]} 
                        onChange={(e) => setPermissions({...permissions, [key]: e.target.checked})} 
                      />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Data Syncing */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('syncData')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Data Syncing</h2>
            </div>
            {expandedSections.syncData ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.syncData && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              {isConnected ? (
                <>
                  <p>Last Sync: {lastSync ? lastSync : 'Never'}</p>
                  <button onClick={handleSync} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Manually Sync Now
                  </button>
                  <div className="mt-4">
                    <h3 className="text-md font-medium">Auto-Sync Settings</h3>
                    <p>Choose how frequently data should automatically refresh:</p>
                    <select 
                      className="border rounded p-2"
                      value={autoSyncInterval}
                      onChange={(e) => setAutoSyncInterval(e.target.value)}
                    >
                      <option value="1h">Every hour</option>
                      <option value="6h">Every 6 hours</option>
                      <option value="12h">Every 12 hours</option>
                      <option value="24h">Every 24 hours</option>
                    </select>
                  </div>
                </>
              ) : (
                <p className="text-red-700">
                  Please connect your Fitbit account before syncing data.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Activity Data */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('activity')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Activity & Steps</h2>
            </div>
            {expandedSections.activity ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.activity && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Track your daily steps, distance traveled, and calories burned. Set step goals and monitor progress over time.
              </p>
              <div className="max-w-lg mx-auto">
                <Line data={activityData} options={activityOptions} />
              </div>
              <p className="mt-4">
                Additional data like elevation gained, active minutes, and detailed breakdown by activity type will be displayed here if available.
              </p>
            </div>
          )}
        </section>

        {/* Heart Rate Data */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('heartRate')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Heart Rate</h2>
            </div>
            {expandedSections.heartRate ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.heartRate && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Monitor your resting heart rate trends and time spent in different heart rate zones. Understanding these patterns can help you optimize your workouts and overall cardiovascular health.
              </p>
              <div className="max-w-lg mx-auto">
                <Line data={hrData} options={hrOptions} />
              </div>
              <div className="max-w-sm mx-auto mt-6">
                <Pie data={hrZonesData} options={hrZonesOptions} />
              </div>
            </div>
          )}
        </section>

        {/* Sleep Data */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('sleep')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Sleep Analysis</h2>
            </div>
            {expandedSections.sleep ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.sleep && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Explore your sleep patterns, including total sleep duration and distribution across REM, Light, and Deep stages. Consistent, quality sleep is vital for overall health.
              </p>
              <div className="max-w-lg mx-auto">
                <Bar data={sleepData} options={sleepOptions} />
              </div>
              <p className="mt-4">
                Additional metrics, such as sleep onset time, wake time, and sleep consistency scores, will appear here.
              </p>
            </div>
          )}
        </section>

        {/* Nutrition Data */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('nutrition')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Nutrition & Caloric Balance</h2>
            </div>
            {expandedSections.nutrition ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.nutrition && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Track your daily calorie intake versus your expenditure. Identify days when you are in a caloric surplus or deficit, and adjust your diet accordingly. Fitbit integration can also help log macronutrients and track hydration levels if supported.
              </p>
              <div className="max-w-lg mx-auto">
                <Bar data={nutritionData} options={nutritionOptions} />
              </div>
              <p className="mt-4">
                Future updates may include recommended intake goals based on your activity levels and personal objectives.
              </p>
            </div>
          )}
        </section>

        {/* Weight & Body Composition */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('weight')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Weight & Body Composition</h2>
            </div>
            {expandedSections.weight ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.weight && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Monitor changes in your weight over time. If you have a smart scale synced with Fitbit, you can also view body fat percentage and other body composition metrics, enabling you to track long-term trends and assess the effectiveness of your health strategies.
              </p>
              <div className="max-w-lg mx-auto">
                <Line data={weightData} options={weightOptions} />
              </div>
            </div>
          )}
        </section>

        {/* Goals & Alerts */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('goals')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Goals & Alerts</h2>
            </div>
            {expandedSections.goals ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.goals && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Set personalized goals (e.g., 10,000 steps/day, 7 hours of sleep/night, specific calorie intake targets) and receive alerts when you’re falling behind or surpassing your targets.
              </p>
              <p>
                Goal setting tools will be available here: 
              </p>
              <ul className="list-disc list-inside">
                <li>Daily Step Goal</li>
                <li>Weekly Cardio Minutes</li>
                <li>Sleep Duration Targets</li>
                <li>Caloric Intake and Macros</li>
                <li>Weight Loss or Maintenance Goals</li>
              </ul>
            </div>
          )}
        </section>

        {/* Privacy & Data Management */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('privacy')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Privacy & Data Management</h2>
            </div>
            {expandedSections.privacy ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.privacy && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Your privacy is our priority. All Fitbit data is stored securely and used only to enhance your health insights. You can revoke Fitbit permissions at any time, and request deletion of your data.
              </p>
              <button 
                onClick={() => { /* handle revoke logic */ }} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Revoke Fitbit Access
              </button>
              <p className="mt-4">
                For more details on how we handle your data, please review our Privacy Policy.
              </p>
            </div>
          )}
        </section>

        {/* Mobile Integration */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('mobileIntegration')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Mobile App Integration</h2>
            </div>
            {expandedSections.mobileIntegration ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.mobileIntegration && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                Access these insights on the go with our mobile app. Enable push notifications for step reminders, goal milestones, and bedtime alerts. Sync your Fitbit data anywhere, anytime.
              </p>
              <p>
                Download our mobile app on iOS or Android and login with your account for seamless integration.
              </p>
            </div>
          )}
        </section>

        {/* Advanced Settings & Customization */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('advancedSettings')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Advanced Settings & Customization</h2>
            </div>
            {expandedSections.advancedSettings ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.advancedSettings && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>Customize your dashboard layout, choose preferred units (imperial vs metric), and select which graphs and metrics to display by default.</p>
              <ul className="list-disc list-inside">
                <li>Hide or show specific graphs.</li>
                <li>Adjust date ranges and default timeframe (daily, weekly, monthly).</li>
                <li>Switch between metric and imperial units for distance and weight.</li>
                <li>Enable beta features like advanced trend analyses or AI-driven insights (coming soon).</li>
              </ul>
            </div>
          )}
        </section>

        {/* Troubleshooting & Support */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <button onClick={() => toggleSection('troubleshooting')} className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-gray-700" />
              <h2 className="font-medium text-gray-900 text-lg">Troubleshooting & Support</h2>
            </div>
            {expandedSections.troubleshooting ? <ChevronDown className="h-4 w-4 text-gray-700" /> : <ChevronRight className="h-4 w-4 text-gray-700" />}
          </button>
          {expandedSections.troubleshooting && (
            <div className="text-sm text-gray-700 space-y-3 mt-4">
              <p>
                If you encounter issues with syncing or data visibility, please check the following:
              </p>
              <ul className="list-disc list-inside">
                <li>Ensure your Fitbit device is charged and actively syncing with the Fitbit app.</li>
                <li>Check your internet connection.</li>
                <li>Make sure you have granted all the necessary permissions in your Fitbit account settings.</li>
                <li>Try a manual sync or re-authenticate with Fitbit.</li>
              </ul>
              <p>
                If problems persist, contact our support team for assistance.
              </p>
            </div>
          )}
        </section>

      </CardContent>
    </Card>
  );
};

export default FitbitIntegrationPage;