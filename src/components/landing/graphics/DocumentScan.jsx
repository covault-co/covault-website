import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Building2, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import OperatingAgreement from './OperatingAgreement';

const EntityCard = ({ data, scanProgress, company }) => {
    return (
        <div className="sm:bg-white rounded-lg sm:shadow-md p-1 sm:p-3 flex-grow sm:border border-dashed relative overflow-hidden h-full cursor-default">
            <div className="items-center mb-3 gap-2 hidden sm:flex">
                <div className="bg-yellow-300 rounded-full p-1 lg:p-1.5">
                    <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 text-zinc-900" />
                </div>
                <h3 className="text-xs lg:text-[14px] font-bold text-zinc-600 truncate">
                    {company}
                </h3>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col p-1 rounded-md transition-colors duration-200">
                        <span className="text-[9px] lg:text-[10px] font-medium text-gray-500">{item.key}</span>
                        <span
                            className="text-[10px] lg:text-[10px] text-gray-800 font-semibold transition-all duration-500 ease-in-out"
                            style={{
                                opacity: scanProgress >= item.position ? 1 : 0,
                                transform: `translateY(${scanProgress >= item.position ? '0' : '10px'})`,
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DocumentScan = () => {
    const [activeDoc, setActiveDoc] = useState(0);
    const [scanProgress, setScanProgress] = useState([0, 0, 0]);
    const [scanStatus, setScanStatus] = useState(['Processing', 'Processing', 'Processing']);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const containerRef = useRef(null);

    const documents = [
        { name: 'Acme Realty', type: 'Operating Agreement' },
        { name: 'Greenfield Properties', type: 'Articles of Incorporation' },
        { name: 'Skyline Ventures', type: 'Partnership Agreement' },
    ];

    const data = [
        { key: 'Company Name', value: ['Acme Realty', 'Greenfield LLC', 'Skyline Ventures'], position: 16 },
        { key: 'EIN', value: ['82-1234567', '91-7654321', '73-9876543'], position: 32 },
        { key: 'State of Formation', value: ['Delaware', 'California', 'New York'], position: 48 },
        { key: 'Fiscal Year End', value: ['December 31', 'June 30', 'September 30'], position: 60 },
        { key: 'Initial Capital', value: ['$500,000', '$1,000,000', '$750,000'], position: 70 },
        { key: 'Members', value: ['E. Raven (60%), L. Nova (40%)', 'A. Apex (33%), K. Apex (63%)', 'J. Smith (50%), M. Johnson (50%)'], position: 80 },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.unobserve(entries[0].target);
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const startAnimation = () => {
        const animationDuration = 4000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);
        let frame = 0;

        const animate = () => {
            frame++;
            const progress = frame / totalFrames;

            setScanProgress(prevProgress => 
                prevProgress.map((prog, index) => {
                    const cardProgress = Math.min(progress * 100, 100);
                    return cardProgress;
                })
            );

            setScanStatus(prevStatus =>
                prevStatus.map((status, index) => 
                    scanProgress[index] >= 100 ? 'Complete' : 'Processing'
                )
            );

            if (progress >= 0.95 && activeDoc < documents.length - 1) {
                setIsTransitioning(true);
                setTimeout(() => {
                    setActiveDoc((prevDoc) => (prevDoc + 1) % documents.length);
                    setIsTransitioning(false);
                    frame = 0;
                }, 500);
            }

            if (activeDoc < documents.length - 1 || frame < totalFrames) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const getDocumentStyle = (docIndex) => {
        if (docIndex === activeDoc) {
            return {
                transform: `translateY(${isTransitioning ? '100%' : '0'})`,
                opacity: isTransitioning ? 0 : 1,
                transition: 'all 0.5s ease-in-out',
            };
        } else {
            return {
                transform: 'translateY(-100%)',
                opacity: 0,
                transition: 'none',
            };
        }
    };

    return (
        <div ref={containerRef} className="w-full bg-gray-50 p-8 rounded-xl border flex flex-col gap-6">
            <div>
                <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">Get organized while you sleep</h2>
                <p className="mt-2 text-gray-500 text-sm text-pretty max-w-lg">
                    Automatically process and sort your documents so that nothing ever gets lost, and everything is instantly accessible.
                </p>
            </div>

            <div className={`aspect-[16/9] min-h-[300px] w-full rounded-lg shadow-inner p-4 border transition-all duration-500 border-dashed ${scanStatus[activeDoc] === 'Complete' ? 'border-zinc-300' : 'border-zinc-200'} relative bg-white/60 overflow-hidden`}>
                <div className="grid grid-cols-5 gap-2 sm:gap-4 h-full overflow-hidden rounded-md">
                    <div className="relative overflow-hidden col-span-3 md:col-span-2">
                        {documents.map((doc, index) => (
                            <div key={index} className="absolute inset-0" style={getDocumentStyle(index)}>
                                <OperatingAgreement
                                    scanProgress={activeDoc === index ? scanProgress[index] : 0}
                                    title={`${doc.name} - ${doc.type}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='col-span-2 md:col-span-3 grid grid-rows-2 gap-4'>
                    {documents.map((doc, index) => (
                        <EntityCard
                            key={index}
                            data={data.map(item => ({
                                key: item.key,
                                value: item.value[index],
                                position: item.position
                            }))}
                            scanProgress={scanProgress[index]}
                            company={doc.name}
                        />
                    ))}
                    </div>
                </div>
                <div className={`absolute top-0 left-0 right-0 h-full transition-all duration-500 ease-in-out ${scanStatus[activeDoc] === 'Complete' ? 'opacity-40' : 'opacity-20'} bg-gradient-to-t from-blue-100/80 to-transparent pointer-events-none rounded-lg`}></div>
            </div>
        </div>
    );
};

export default DocumentScan;