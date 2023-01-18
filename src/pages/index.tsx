import { type NextPage } from "next";
import { Dashboard } from "./collections/Dashboard";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8">
        <Dashboard />
      </main>
    </>
  );
};

export default Home;
