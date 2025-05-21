import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen gap-10 flex flex-col container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made by Athex Web3, Co-Ceo of Iymra Labs
      </div>
    </div>
  );
};

export default AppLayout;
