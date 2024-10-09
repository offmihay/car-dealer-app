'use client';

import { MakeResult, useResultQuery } from '@/queries/queries';

const Table = ({ data }: { data: MakeResult[] }) => {
  return (
    <table className="min-w-full border-collapse border">
      <thead>
        <tr>
          <th className="border p-4">Make ID</th>
          <th className="border p-4">Make Name</th>
          <th className="border p-4">Model ID</th>
          <th className="border p-4">Model Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((car, index) => (
          <tr key={index}>
            <td className="border p-4">{car.Make_ID}</td>
            <td className="border p-4">{car.Make_Name}</td>
            <td className="border p-4">{car.Model_ID}</td>
            <td className="border p-4">{car.Model_Name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ResultPage = ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  const resultQuery = useResultQuery(params.makeId, params.year);

  return (
    <div className="flex w-full my-8 px-4 items-center justify-center text-center">
      <div className="max-w-[800px] flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Results:</h1>
        {resultQuery.isFetching && (
          <div className="w-full h-[100vh] flex justify-center items-center absolute left-0 right-0">
            <span className="loader"></span>
          </div>
        )}
        {!resultQuery.isFetching && <Table data={resultQuery.data} />}
      </div>
    </div>
  );
};

export default ResultPage;
