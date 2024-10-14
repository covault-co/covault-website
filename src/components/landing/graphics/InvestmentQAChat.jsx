import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { FileSpreadsheetIcon, Calculator, FileText, User, Calendar, ArrowRight, WandSparkles, TrendingUp } from 'lucide-react';

const Message = ({ sender, children }) => (
  <div className="flex gap-2 items-start w-full rounded-md border-gray-200">
    <div className="mt-1 rounded-full flex items-center justify-center flex-shrink-0">
      {sender === 'AI' ? <WandSparkles size={16} className="text-gray-600" /> : <User size={16} className="text-gray-600" />}
    </div>
    <div className="bg-white w-full flex items-start space-x-3 rounded-md border-gray-200 p-2 transition-all duration-500 ease-in-out border">
      <div className="flex-grow">
        {children}
      </div>
    </div>
  </div>
);

const InvestmentQAChat = () => {
  const [messages, setMessages] = useState([]);
  const [conversationIndex, setConversationIndex] = useState(0);
  const chatContainerRef = useRef(null);

  const conversations = [
    [
      { sender: 'User', content: <p className="text-xs font-semibold text-gray-800">What was my Q2 2023 distribution for Acme LLC?</p> },
      {
        sender: 'AI', content: (
          <>
            <div className='p-2 mb-2 bg-zinc-50 rounded-md font-medium'>
              <div className='flex gap-2 p-1'>
                <div className='bg-blue-700 p-1 rounded-full h-max'><FileSpreadsheetIcon className='text-white' size={12} /></div>
                <h3 className="text-xs">Q2 2023 Financial Report - Acme LLC</h3>
              </div>
              <div className="flex gap-2 ml-2">
                <ArrowRight size={12} className="text-blue-600" />
                <p className="text-xs text-gray-800"><span className='font-bold underline'>$75,000</span></p>
              </div>
            </div>
            <div className="text-xs p-2 pb-0 text-gray-600">
              <p className="font-semibold mb-1">Related</p>
              <div>
                <div className='flex gap-2 p-1'>
                  <div className='bg-emerald-400 p-1 rounded-full h-max'><Calendar className='text-white' size={12} /></div>
                  <span className='content-center'>Q2 2023 Distribution Event</span>
                </div>
                <div className='flex gap-2 p-1'>
                  <div className='bg-blue-700 p-1 rounded-full h-max'><FileText className='text-white' size={12} /></div>
                  <span className='content-center'>Distribution Agreement</span>
                </div>
              </div>
            </div>
          </>
        )
      }
    ],
    [
      { sender: 'User', content: <p className="text-xs font-semibold text-gray-800">What's my current tax basis for Acme LLC?</p> },
      {
        sender: 'AI', content: (
          <>
            <div className='p-2 mb-2 bg-zinc-50 rounded-md font-medium'>
              <div className='flex gap-2 p-1'>
                <div className='bg-blue-700 p-1 rounded-full h-max'><Calculator className='text-white' size={12} /></div>
                <h3 className="text-xs">Tax Basis Calculation</h3>
              </div>
              <div className="flex gap-2 ml-2">
                <ArrowRight size={12} className="text-blue-600" />
                <p className="text-xs text-gray-800"><span className='font-bold underline'>$325,000</span></p>
              </div>
            </div>
            <div className="text-xs p-2 pb-0 text-gray-600">
              <p className="font-semibold mb-1">Related</p>
              <div>
                <div className='flex gap-2 p-1'>
                  <div className='bg-emerald-400 p-1 rounded-full h-max'><Calendar className='text-white' size={12} /></div>
                  <span className='content-center'>Latest K-1 Form</span>
                </div>
                <div className='flex gap-2 p-1'>
                  <div className='bg-blue-700 p-1 rounded-full h-max'><FileText className='text-white' size={12} /></div>
                  <span className='content-center'>Capital Account Statement</span>
                </div>
                <div className='flex gap-2 p-1'>
                  <div className='bg-blue-700 p-1 rounded-full h-max'><FileText className='text-white' size={12} /></div>
                  <span className='content-center'>Operating Agreement - Acme LLC</span>
                </div>
              </div>
            </div>
          </>
        )
      }
    ]
  ];

  const transitions = useTransition(messages, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(10px)' },
    config: config.gentle,
  });

  useEffect(() => {
    // Function to show the conversation at a given index
    const showConversation = async (index) => {
      // Clear the messages before starting a new conversation
      setMessages([]);
      // Wait for 500ms before proceeding
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show the first message of the conversation
      setMessages([conversations[index][0]]);
      // Wait for 1500ms before showing the rest of the conversation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show the entire conversation
      setMessages(conversations[index]);
      
      // Wait before clearing the conversation
      await new Promise(resolve => setTimeout(resolve, 6000));
      // Clear the conversation
      setMessages([]);
      
      // Wait before moving to the next conversation
      await new Promise(resolve => setTimeout(resolve, 500));
      // Move to the next conversation
      setConversationIndex((prevIndex) => (prevIndex + 1) % conversations.length);
    };

    // Call the showConversation function with the current conversationIndex
    showConversation(conversationIndex);
  }, [conversationIndex]);

  return (
    <div className="relative w-full bg-gray-50 p-8 rounded-xl border flex flex-col gap-6">
      <div>
        <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">Instant answers to any question</h2>
        <p className="mt-2 text-gray-500 text-xs text-pretty max-w-lg">
          Get immediate, contextual responses to any query about your investments, powered by real-time data.
        </p>
      </div>

      <div
        ref={chatContainerRef}
        className="relative flex flex-col gap-2 h-[300px] overflow-hidden shadow-inner rounded-lg border border-dashed p-4 bg-white/60"
      >
        {transitions((style, message) => (
          <animated.div style={style}>
            <Message sender={message.sender}>
              {message.content}
            </Message>
          </animated.div>
        ))}
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-blue-100/20 to-transparent via-white/10 pointer-events-none z-10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default InvestmentQAChat;