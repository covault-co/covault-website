import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const SparklineCell = ({ data }) => (
  <ResponsiveContainer width={60} height={30}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const MetricCell = ({ value, change, sparklineData }) => (
  <td className="py-2 px-4">
    <div className="flex items-center">
      <div className="mr-2">
        <div className="font-semibold">{value}</div>
        <div className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-zinc-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <SparklineCell data={sparklineData} />
    </div>
  </td>
);

const Insights = () => {
  const companies = [
    { 
      name: 'TechInnovate LLC', 
      capitalAccount: 487000, 
      capitalAccountChange: 8.2,
      allocatedProfit: 92000, 
      allocatedProfitChange: 15.7,
      distributions: 68000, 
      distributionsChange: -5.3,
      cumulativeReturn: 31.4, 
      cumulativeReturnChange: 2.8
    },
    { 
      name: 'GreenEnergy Co', 
      capitalAccount: 312000, 
      capitalAccountChange: 11.5,
      allocatedProfit: 54000, 
      allocatedProfitChange: -7.2,
      distributions: 41000, 
      distributionsChange: 3.9,
      cumulativeReturn: 24.7, 
      cumulativeReturnChange: -1.5
    },
    { 
      name: 'UrbanDev Properties', 
      capitalAccount: 635000, 
      capitalAccountChange: 5.3,
      allocatedProfit: 128000, 
      allocatedProfitChange: 22.1,
      distributions: 95000, 
      distributionsChange: 18.7,
      cumulativeReturn: 42.3, 
      cumulativeReturnChange: 4.6
    },
    { 
      name: 'HealthTech Solutions', 
      capitalAccount: 273000, 
      capitalAccountChange: -2.8,
      allocatedProfit: 58000, 
      allocatedProfitChange: 9.4,
      distributions: 39000, 
      distributionsChange: -12.6,
      cumulativeReturn: 28.9, 
      cumulativeReturnChange: 0.7
    },
  ];

  const generateSparklineData = (change) => {
    const trendStrength = Math.min(Math.abs(change) / 10, 1); // Normalize the trend strength
    const trend = change >= 0 ? 1 : -1;
    let value = 50 + Math.random() * 20;
    return Array.from({ length: 10 }, (_, i) => {
      const randomFactor = Math.random() * 2 - 1; // Random value between -1 and 1
      const trendFactor = (i / 9) * trendStrength * trend; // Gradually increase trend influence
      value += (randomFactor + trendFactor) * 5;
      return { value: Math.max(0, Math.min(100, value)) };
    });
  };

  return (
    <div className="w-full h-full bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col gap-8 relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="mt-4 text-2xl leading-6 text-black font-display tracking-tight">See the complete picture</h2>
        <p className="mt-2 text-gray-500 text-sm text-pretty max-w-lg">
          Get a holistic view of your investments with up-to-date financials, insights, and analytics.
        </p>
      </div>

      <div className="relative z-10 overflow-hidden h-full">
        <div className="overflow-x-hidden rounded-md p-4 border border-gray-200 border-dashed bg-white/60 h-full shadow-inner">
          <table className="w-full text-xs h-full rounded-md ">
            <thead className='font-light'>
              <tr className="bg-gray-50">
                <th className="px-4 p-1 text-left font-semibold text-zinc-800">Company</th>
                <th className="px-4 p-1 text-left font-semibold text-zinc-800">Capital Account</th>
                <th className="px-4 p-1 text-left font-semibold text-zinc-800">Allocated Profit</th>
                <th className="px-4 p-1 text-left font-semibold text-zinc-800">Distributions</th>
                <th className="px-4 p-1 text-left font-semibold text-zinc-800">Cumulative Return</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index} className="bg-white/60  border-zinc-100">
                  <td className="py-2 px-4 ">{company.name}</td>
                  <MetricCell 
                    value={`$${company.capitalAccount.toLocaleString()}`} 
                    change={company.capitalAccountChange.toFixed(1)} 
                    sparklineData={generateSparklineData(company.capitalAccountChange > 0 ? 1 : -1)} 
                  />
                  <MetricCell 
                    value={`$${company.allocatedProfit.toLocaleString()}`} 
                    change={company.allocatedProfitChange.toFixed(1)} 
                    sparklineData={generateSparklineData(company.allocatedProfitChange > 0 ? 1 : -1)} 
                  />
                  <MetricCell 
                    value={`$${company.distributions.toLocaleString()}`} 
                    change={company.distributionsChange.toFixed(1)} 
                    sparklineData={generateSparklineData(company.distributionsChange > 0 ? 1 : -1)} 
                  />
                  <MetricCell 
                    value={`${company.cumulativeReturn.toFixed(1)}%`} 
                    change={company.cumulativeReturnChange.toFixed(1)} 
                    sparklineData={generateSparklineData(company.cumulativeReturnChange > 0 ? 1 : -1)} 
                  />
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-l from-blue-100/20 to-transparent via-white/10 pointer-events-none z-10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Insights;