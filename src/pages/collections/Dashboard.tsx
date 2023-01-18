import { type NextPage } from "next";
import { api } from "../../utils/api";

export const Dashboard: NextPage = () => {
  const collections = api.collectionsRouter.getCollections.useQuery();
  const stats = [
    { name: "Total Subscribers", stat: "71,897" },
    { name: "Avg. Open Rate", stat: "58.16%" },
    { name: "Avg. Click Rate", stat: "24.57%" },
  ];
  return (
    <main className="flex h-screen w-screen justify-center p-8">
      <h1 className="text-left font-heading text-4xl text-brand-offWhite">
        Dashboard
      </h1>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Last 30 days
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
};
