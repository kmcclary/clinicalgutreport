import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../zl.png'; // Ensure this path is correct
import { 
  MdDashboard, 
  MdListAlt,
  MdMonitorHeart,
  MdPsychology,
  MdBiotech,
  MdAssignment,
  MdQuiz,
  MdHealthAndSafety,
  MdTrendingUp,
  MdScience,
  MdContentPaste,
  MdGroup,
  MdSettings,
  MdViewList, // Add this import
  MdMedicalServices, // Import this icon
} from 'react-icons/md'; // Import necessary icons

const MainButton = ({ to, icon: Icon, label, isActive, isPrimary, onClick }) => (
  <li className="group relative">
    <Link
      to={to}
      className={`flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-lg shadow transition-colors
        ${isPrimary && isActive
          ? 'bg-black text-white'
          : isActive
            ? 'bg-white text-black'
            : 'bg-black/20 text-white hover:bg-white/30'}`}
      onClick={onClick}
    >
      <Icon 
        className="w-6 h-6 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:scale-90"
      />


    </Link>
  </li>
);

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = document.querySelector('.bg-gradient-to-br').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  }
};

const NavButton = ({ to, icon: Icon, label, isActive, onClick }) => (
  <li className="group relative">
    {onClick ? (
      <button 
        onClick={onClick}
        className={`flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-lg shadow transition-colors
          ${isActive 
            ? 'bg-white text-black' 
            : 'bg-black/20 text-white hover:bg-white/30'}`}
      >
        <Icon className="w-6 h-6 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:scale-90"/>

      </button>
    ) : (
      <Link 
        to={to}
        className={`flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-lg shadow transition-colors
          ${isActive 
            ? 'bg-white text-black' 
            : 'bg-black/20 text-white hover:bg-white/30'}`}
      >
        <Icon className="w-6 h-6 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:scale-90"/>

      </Link>
    )}
  </li>
);

const BannerNavBar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [lastActiveSubbutton, setLastActiveSubbutton] = useState('overview');
  const [activeMainButton, setActiveMainButton] = useState('components-overview'); // Add this line

  // Add crcPaths array
  const crcPaths = [
    '/crc-detection',
    '/crc-overview',
    '/crc-biomarkers',
    '/crc-pathways',
    '/crc-metabolites',
    '/crc-results'
  ];

  // Define CRC-related buttons
  const crcButtons = [
    { to: "crc-overview", icon: MdDashboard, label: "Overview" },
    { to: "crc-biomarkers", icon: MdBiotech, label: "Biomarkers" },
    { to: "crc-pathways", icon: MdScience, label: "Pathways" },
    { to: "crc-metabolites", icon: MdContentPaste, label: "Metabolites" },
    { to: "crc-results", icon: MdAssignment, label: "Results" }
  ];

  // Define all Components-related paths
  const componentsPaths = [
    '/',
    '/components-overview',
    '/overview',
    // '/level-section',
    // '/achievements',
    '/enterotype-profile',
    '/recommendations',
    '/health-metabolism',
    '/gut-personality',
    '/pathogen-detection',
    '/commensal-microbe-detection',
    '/phyla-diversity',
    '/microbial-composition'
  ];

  // Update isComponentsOverview to include CRC detection
  const isComponentsOverview = activeMainButton === 'components-overview';
  const isCRCSection = activeMainButton === 'crc-detection';

  // Consolidate the useEffect hooks
  useEffect(() => {
    // Set Components view as default when app launches
    if (isComponentsOverview) {
      setActiveSection('overview');
      setLastActiveSubbutton('overview');
      
      const handleScroll = () => {
        const sections = document.querySelectorAll('.component-section, .crc-section');
        const viewportHeight = window.innerHeight;
        let maxVisibility = 0;
        let mostVisibleSection = '';

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          // Calculate how much of the section is visible
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visibility = visibleHeight / rect.height;

          // Only consider sections that are at least 30% visible
          if (visibility > maxVisibility && visibility > 0.3) {
            maxVisibility = visibility;
            mostVisibleSection = section.id;
          }
        });

        // Only update if we have a clearly visible section
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
          setLastActiveSubbutton(mostVisibleSection);
        }
      };

      window.addEventListener('scroll', handleScroll);
      // Initial check
      setTimeout(handleScroll, 100);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, isComponentsOverview, isCRCSection]);

  // Directly set the active state for the Components button on app launch
  useEffect(() => {
    if (isComponentsOverview) {
      setActiveSection('overview');
      setLastActiveSubbutton('overview');
    }
  }, [isComponentsOverview]);

  const resultsButtons = [
    { to: "overview", icon: MdDashboard, label: "Overview" },
    // { to: "level-section", icon: MdTrendingUp, label: "Level" },
    // { to: "achievements", icon: MdHealthAndSafety, label: "Achievements" },
    // { to: "enterotype-profile", icon: MdBiotech, label: "Enterotype" },
    { to: "recommendations", icon: MdListAlt, label: "Actions" },
    // { to: "health-metabolism", icon: MdMonitorHeart, label: "Health" },
    { to: "gut-personality", icon: MdPsychology, label: "Personality" },
    { to: "pathogen-detection", icon: MdBiotech, label: "Pathogens" },
    // { to: "commensal-microbe-detection", icon: MdScience, label: "Commensals" },
    { to: "phyla-diversity", icon: MdContentPaste, label: "Diversity" },
    // { to: "microbial-composition", icon: MdAssignment, label: "Composition" }
  ];

  const participateButtons = [
    { to: "/gut-health-survey", icon: MdQuiz, label: "Daily Quiz" },
    { to: "/health-tracking", icon: MdHealthAndSafety, label: "Track Health" },
    { to: "/biosample-submission", icon: MdBiotech, label: "Biosample" },
    { to: "/study-signup", icon: MdTrendingUp, label: "Study Signup" }, // Changed this line
    // { to: "/experiments", icon: MdScience, label: "Experiments" },
    // { to: "/tasks", icon: MdAssignment, label: "Tasks" }
  ];

  // Add this helper function
  const isQuizRelatedPath = (path) => {
    return path.includes('/quiz') || path === '/gut-health-survey';
  };

  const isParticipateSection = location.pathname === '/gut-health-survey' || 
                              location.pathname === '/biosample-submission' || 
                              isQuizRelatedPath(location.pathname);

  // Add this helper function before the return statement
  const isButtonActive = (buttonTo) => {
    if (activeMainButton === 'components-overview') {
      return activeSection === buttonTo || lastActiveSubbutton === buttonTo;
    } else if (activeMainButton === 'crc-detection') {
      return activeSection === buttonTo || lastActiveSubbutton === buttonTo;
    } else {
      // Check if the current path matches the button's path or if it's the quiz route
      if (buttonTo === '/gut-health-survey') {
        return isQuizRelatedPath(location.pathname);
      }
      return location.pathname === buttonTo;
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-300 via-yellow-300 to-yellow-500 p-1 w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between flex-nowrap">
        <Link to="/">
          <img src={Logo} alt="Zymo Logo with Banner" className="h-8 flex-shrink-0" />
        </Link>
        <nav className="flex-shrink-0 ml-auto overflow-x-hidden">
          <ul className="flex space-x-1 px-1">
            <MainButton 
              to="/components-overview"
              icon={MdViewList}
              label="Components" 
              isActive={activeMainButton === 'components-overview'}
              isPrimary={true}
              onClick={() => setActiveMainButton('components-overview')}
            />
            {/* <MainButton 
              to="/gut-health-survey"
              icon={MdGroup}
              label="Participate" 
              isActive={activeMainButton === 'participate'}
              isPrimary={true}
              onClick={() => setActiveMainButton('participate')}
            /> */}
            {/* {!isCRCSection && (
              <>
                <li className="h-9 w-px bg-black/30 mx-1" />
                <div className="flex space-x-1 overflow-x-hidden">
                  {(isComponentsOverview 
                    ? resultsButtons 
                    : participateButtons
                  ).map((button, index) => (
                    <NavButton 
                      key={index}
                      to={isComponentsOverview ? `/${button.to}` : button.to}
                      icon={button.icon}
                      label={button.label}
                      isActive={isButtonActive(button.to)}
                      onClick={isComponentsOverview ? () => { scrollToSection(button.to); setLastActiveSubbutton(button.to); } : undefined}
                    />
                  ))}
                </div>
              </>
            )} */}
            <li className="h-9 w-px bg-black/30 mx-1" />
            <MainButton 
              to="/settings"
              icon={MdSettings}
              label="Settings" 
              isActive={activeMainButton === 'settings'}
              onClick={() => setActiveMainButton('settings')}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BannerNavBar;