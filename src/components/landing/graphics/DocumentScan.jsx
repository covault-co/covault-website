import React, { useState, useEffect } from 'react';
import OperatingAgreement from './OperatingAgreement';

const DocumentScan = () => {
    const [activeDoc, setActiveDoc] = useState(0);
    const [currentDocIndex, setCurrentDocIndex] = useState(0);
    const [scanProgress, setScanProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scanStatus, setScanStatus] = useState('Processing');


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
        { key: 'Initial Capital', value: ['$500,000', '$1,000,000', '$750,000'], position: 68 },
        { key: 'Members', value: ['E. Raven (60%), L. Nova (40%)', 'A. Apex (33%), K. Apex (63%)', 'K. Apex (50%), J. Raven (50%)'], position: 85 },
    ];

    useEffect(() => {
        const animationDuration = 3000; // 5 seconds for full cycle
        const frameDuration = 1000 / 60; // 60 fps
        const totalFrames = Math.round(animationDuration / frameDuration);
        let frame = 0;

        const timer = setInterval(() => {
            frame = (frame + 1) % totalFrames;
            const progress = frame / totalFrames;

            if (progress < 0.8) {
                // Scanning animation
                setScanProgress(Math.min((progress / 0.8) * 100, 100));
                setIsTransitioning(false);
                setScanStatus('Processing');
            } else {
                // Transition to next document
                setIsTransitioning(true);
                setScanProgress(0);
                setScanStatus('Complete')
                if (progress > 0.95) {
                    setCurrentDocIndex((prevIndex) => (prevIndex + 1) % documents.length);
                    setActiveDoc((prevDoc) => (prevDoc === 0 ? 1 : 0));
                }
            }
        }, frameDuration);

        return () => clearInterval(timer);
    }, [documents.length]);

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
        <div className="w-full bg-gray-50 p-8 rounded-xl border flex flex-col gap-6">
            <div>
                <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">Get organized while you sleep</h2>
                <p className="mt-2 text-gray-500 text-sm text-pretty max-w-lg">
                    Automatically process and sort your documents so that nothing ever gets lost, and everything is instantly accessible.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className={`aspect-[3/4] grow max-w-[300px] min-w-[250px] md:min-w-[280px] rounded-lg shadow-inner p-4 border transition-all duration-500 border-dashed ${scanStatus === 'Complete' ? 'border-zinc-300' : 'border-zinc-200'} relative bg-white/60`} style={{ height: '400px', overflow: 'hidden' }}>
                    <div className="absolute inset-0 p-4 z-10" style={getDocumentStyle(0)}>
                        <OperatingAgreement
                            scanProgress={activeDoc === 0 ? scanProgress : 0}
                            title={`${documents[currentDocIndex].name} - ${documents[currentDocIndex].type}`}
                        />
                    </div>
                    <div className="absolute inset-0 p-4 z-10" style={getDocumentStyle(1)}>
                        <OperatingAgreement
                            scanProgress={activeDoc === 1 ? scanProgress : 0}
                            title={`${documents[(currentDocIndex + 1) % documents.length].name} - ${documents[(currentDocIndex + 1) % documents.length].type}`}
                        />
                    </div>
                    <div className={`absolute top-0 left-0 right-0 h-full transition-all duration-500 ease-in-out  ${scanStatus === 'Complete' ? 'opacity-40' : 'opacity-20'} bg-gradient-to-t from-blue-100 to-transparent via-indigo-50 pointer-events-none rounded-lg`}></div>
                </div>

                <div>
                    <div className="grid grid-cols-2 md:grid-cols-1 min-w-[100px]">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col p-2 rounded">
                                <span className="text-sm font-medium text-gray-400">{item.key}</span>
                                <div className="relative overflow-hidden flex items-center">
                                        <span
                                            className="text-sm text-zinc-800 font-mono transition-opacity duration-500 ease-in-out"
                                            style={{
                                                opacity: scanProgress >= item.position ? 1 : 0,
                                            }}
                                        >
                                            {item.value[currentDocIndex]}
                                        </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentScan;