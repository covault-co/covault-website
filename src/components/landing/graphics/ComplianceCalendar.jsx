import React, { useState, useEffect } from 'react';
import { Calendar, Check } from 'lucide-react';

const EventCard = ({ event }) => (
    <div className="bg-white/90 rounded-md p-4 w-full transition-all duration-300 hover:shadow-lg border cursor-default">
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-xs text-gray-500">{event.date}</span>
            </div>
            {event.daysUntil > 0 ? (
                <span className="text-xs font-light text-zinc-400">in {event.daysUntil} days</span>
            ) : (
                <Check className="w-4 h-4 text-green-500" />
            )}
        </div>
        <div className="text-xs font-semibold text-gray-800">{event.title}</div>
        <div className="text-[10px] text-gray-500">{event.company}</div>
    </div>
);

const ComplianceCalendar = () => {
    const [events, setEvents] = useState([]);

    const generateEvents = () => {
        const today = new Date();
        const baseEvents = [
            { company: 'TechInnovate LLC', title: 'Submit K-1 Forms' },
            { company: 'Real Estate Ventures LLC', title: 'Quarterly Distribution' },
            { company: 'Consulting Solutions LLC', title: 'Annual Report Filing' },
        ];

        const pastEvents = baseEvents.map((event, index) => {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - (index * 10)); 
            const options = { month: 'short', day: 'numeric' };
            return {
                id: index + 1,
                date: pastDate.toLocaleDateString('en-US', options),
                daysUntil: Math.ceil((pastDate - today) / (1000 * 60 * 60 * 24)),
                ...event
            };
        });

        const futureEvents = baseEvents.map((event, index) => {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + (index * 10)); 
            const options = { month: 'short', day: 'numeric' };
            return {
                id: index + 4,
                date: futureDate.toLocaleDateString('en-US', options),
                daysUntil: Math.ceil((futureDate - today) / (1000 * 60 * 60 * 24)),
                ...event
            };
        });

        return [...pastEvents, ...futureEvents];
    };

    useEffect(() => {
        setEvents(generateEvents());
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col gap-8 relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">Never miss a deadline</h2>
                <p className="mt-2 text-gray-500 text-sm text-pretty max-w-lg">
                    Automated compliance tracking ensures you stay on top of critical tasks and filings across your LLCs.
                </p>
            </div>

            <div className="relative grid grid-cols-2 gap-2 z-10 overflow-hidden max-h-[300px] shadow-inner rounded-lg border border-dashed p-4 bg-white/60">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
                <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-blue-100/20 to-transparent via-white/10 pointer-events-none z-10 rounded-lg"></div>

            </div>
        </div>
    );
};

export default ComplianceCalendar;