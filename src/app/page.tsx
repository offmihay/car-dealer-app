'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMakesQuery } from '@/queries/queries';

const Home = () => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const makesQuery = useMakesQuery();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const isNextEnabled = !!selectedMake && !!selectedYear;

  return (
    <div className="w-full h-[100vh] flex justify-center items-center text-center px-4">
      <div className="max-w-[400px] w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Choose car:</h1>
        <div className="flex flex-col gap-2">
          <select onChange={(e) => setSelectedMake(e.target.value)}>
            <option value="">Choose vehicle makes:</option>
            {makesQuery.data &&
              makesQuery.data.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeId}
                </option>
              ))}
          </select>
          <select onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Choose year:</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link href={`/result/${selectedMake}/${selectedYear}`}>
          <button
            disabled={!isNextEnabled}
            className={`mt-4 p-2 button-9 ${
              isNextEnabled ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'
            } text-white`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
