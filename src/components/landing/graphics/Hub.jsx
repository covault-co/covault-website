import React, { useState, useEffect } from 'react';
import { User, FileText, DollarSign, PieChart } from 'lucide-react';

const events = [
  { id: 1, type: 'ownership', message: 'Ownership transfer: 5% from Ava Yan to Ethan Green', icon: <PieChart className="text-blue-700" size={20} />, stakeholder: 'HealthTech Solutions', timestamp: 'Last Week' },
  { id: 2, type: 'document', message: 'New version of Operating Agreement uploaded', icon: <FileText className="text-blue-700" size={20} />, stakeholder: 'HealthTech Solutions', timestamp: 'Monday' },
  { id: 3, type: 'member', message: 'New member joined: Sophia Lee (10% ownership)', icon: <User className="text-blue-700" size={20} />, stakeholder: 'LegalEagle LLC', timestamp: 'Monday' },
  { id: 4, type: 'document', message: 'New document uploaded: Q2 Financial Report', icon: <FileText className="text-blue-700" size={20} />, stakeholder: 'Acme Accounting', timestamp: '11:30 AM' },
  { id: 5, type: 'distribution', message: 'Distribution of $50,000 issued to all members', icon: <DollarSign className="text-blue-700" size={20} />, stakeholder: 'UrbanDev Properties', timestamp: 'Yesterday' },
];

const EventItem = ({ event, isVisible }) => (
    <div className={`flex gap-4 items-start w-fullspace-x-3 rounded-md border-gray-200 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}>
    <div className="flex-shrink-0 pt-2 pl-1 flex items-center justify-center">
      {event.icon}
    </div>
  <div className="bg-white/50 w-full hover:shadow-lg flex items-start space-x-3 rounded-md border-gray-200 p-2 transition-all duration-500 ease-in-out border">
    
    <div className="flex-grow">
      <p className="text-xs font-semibold text-gray-800">{event.message}</p>
      <p className="text-xs text-gray-500 mt-1">{event.stakeholder}</p>
    </div>
    <div className="text-xs text-gray-400 whitespace-nowrap">{event.timestamp}</div>
  </div>
  </div>
);

const Hub = () => {
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(true);

  useEffect(() => {
    let timer;

    if (isAdding) {
      timer = setInterval(() => {
        if (currentIndex < events.length) {
          setVisibleEvents(prev => [...prev, events[currentIndex]]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(timer);
          setTimeout(() => setIsAdding(false), 2500); // Pause 
        }
      }, 500); // Time between adding events
    } else {
      timer = setInterval(() => {
        if (visibleEvents.length > 0) {
          setVisibleEvents(prev => prev.slice(0, -1));
        } else {
          clearInterval(timer);
          setCurrentIndex(0);
          setIsAdding(true);
        }
      }, 50);
    }

    return () => clearInterval(timer);
  }, [currentIndex, isAdding, visibleEvents.length]);

  return (
    <div className="w-full bg-gray-50 p-8 rounded-xl border flex flex-col gap-6">
      <div>
        <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">Your unified hub</h2>
        <p className="mt-2 text-gray-500 text-sm text-pretty max-w-lg">
          Covault's single source of truth keeps all stakeholders informed with real-time updates and document sharing.
        </p>
      </div>

      <div className="relative flex flex-col gap-2 max-h-[300px] overflow-hidden shadow-inner rounded-lg border border-dashed p-4 bg-white/60">
        {events.map((event, index) => (
          <EventItem 
            key={event.id} 
            event={event} 
            isVisible={visibleEvents.some(e => e.id === event.id)}
          />
        ))}
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-blue-100/20 to-transparent via-white/10 pointer-events-none z-10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Hub;