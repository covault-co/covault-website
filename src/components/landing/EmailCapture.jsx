import React, { useState } from 'react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        source: 'Marketing website',
        subscribed: true,
      })
    };

    try {
      const response = await fetch('https://app.loops.so/api/v1/contacts/create', options);
      const data = await response.json();
      console.log(data);
      setEmail('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-3 mt-10 md:max-w-xl font-sans">
      <form onSubmit={handleSubmit} className="flex flex-row flex-wrap gap-3 w-full">
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
      </form>
    </div>
  );
};

export default EmailCapture;