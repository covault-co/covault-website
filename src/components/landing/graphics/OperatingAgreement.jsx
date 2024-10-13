import React from 'react';

const OperatingAgreement = ({ scanProgress, title = "Operating Agreement" }) => {
  const agreementText = `
OPERATING AGREEMENT OF TECHVENTURE LLC

ARTICLE I - COMPANY FORMATION
1.1 FORMATION. The Members hereby form a Limited Liability Company ("Company") subject to the provisions of the Limited Liability Company Act as currently in effect as of this date. Articles of Organization shall be filed with the Secretary of State.

1.2 NAME. The name of the Company shall be TechVenture LLC.

1.3 REGISTERED AGENT. The name and location of the registered agent of the Company shall be as stated in the Articles of Organization.

1.4 TERM. The Company shall continue for a perpetual period unless dissolved by:
(a) Members whose capital interest as defined in Article II exceeds 50 percent vote for dissolution; or
(b) Any event which makes it unlawful for the business of the Company to be carried on by the Members; or
(c) The death, resignation, expulsion, bankruptcy, retirement of a Member or the occurrence of any other event that terminates the continued membership of a Member of the Company; or
(d) Any other event causing dissolution of a Limited Liability Company under applicable state laws.

ARTICLE II - CAPITAL CONTRIBUTIONS
2.1 INITIAL CONTRIBUTIONS. The Members initially shall contribute to the Company capital as described in Exhibit A attached to this Agreement. The agreed value of such property and cash is $500,000.

2.2 ADDITIONAL CONTRIBUTIONS. No Member shall be obligated to make any additional contribution to the Company's capital without the prior unanimous written consent of the Members.

ARTICLE III - PROFITS, LOSSES AND DISTRIBUTIONS
3.1 PROFITS/LOSSES. For financial accounting and tax purposes, the Company's net profits or net losses shall be determined on an annual basis and shall be allocated to the Members in proportion to each Member's relative capital interest in the Company as set forth in Exhibit A as amended from time to time in accordance with Treasury Regulation 1.704-1.

3.2 DISTRIBUTIONS. The Members shall determine and distribute available funds annually or at more frequent intervals as they see fit. Available funds, as referred to herein, shall mean the net cash of the Company available after appropriate provision for expenses and liabilities, as determined by the Managers. Distributions in liquidation of the Company or in liquidation of a Member's interest shall be made in accordance with the positive capital account balances pursuant to Treasury Regulation 1.704.1(b)(2)(ii)(b)(2). To the extent a Member shall have a negative capital account balance, there shall be a qualified income offset, as set forth in Treasury Regulation 1.704.1(b)(2)(ii)(d).
  `;

  const paragraphs = agreementText.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-2">
      {paragraph}
    </p>
  ));

  return (
    <div className="h-full bg-white border rounded-md shadow-xl overflow-hidden p-6 relative hover:shadow-lg transition-all transition-200 ease cursor-default">
      <div className="text-xs font-bold leading-4 text-gray-800 mb-2">{title}</div>
      <div className="overflow-hidden leading-1 text-[7px]">
        {paragraphs}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
              rgba(96, 165, 250, 0) ${Math.max(0, scanProgress - 20)}%, 
              rgba(96, 165, 250, 0.5) ${scanProgress}%, 
              rgba(96, 165, 250, 0) ${scanProgress}%)`,
          transition: 'all 0.3s ease-out',
        }}
      />
    </div>
  );
};

export default OperatingAgreement;