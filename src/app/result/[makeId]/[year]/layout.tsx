import { fetchMakes } from '@/api/api';

// Function to generate static parameters for the dynamic routes
export async function generateStaticParams() {
  const makes = await fetchMakes();

  const years = Array.from(
    { length: new Date().getFullYear() - 2015 + 1 },
    (_, i) => new Date().getFullYear() - i
  );

  return makes.flatMap((make) => {
    return years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }));
  });
}

// Layout component
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
