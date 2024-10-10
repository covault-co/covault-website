import React, { useState, useEffect } from 'react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus(''); 

  try {
    const response = await fetch('/api/create-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setEmail('');
    setStatus('Email submission successful!'); 
  } catch (err) {
    setStatus('Email submission failed. Please try again.'); 
  }
};

  return (
    <div className="flex gap-3 mt-10 md:max-w-xl font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="flex flex-row flex-wrap gap-3 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow w-xs h-12 px-4 rounded-sm border-2 border-gray-300 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="group hover:cursor-pointer items-center justify-center h-12 font-medium rounded-sm inline-flex bg-black border-2 border-black duration-200 lg:w-auto px-6 py-3 text-center text-white w-full sm:w-auto"
          >
            Join the waitlist<span className="w-1 group-hover:w-4 duration-200 ease-in-out"></span> &nbsp; &rarr;
          </button>
        </div>
        {status && <p className="text-sm text-center">{status}</p>}
      </form>
    </div>
  );
};

export default EmailCapture;