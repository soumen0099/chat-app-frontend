import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import MessageContainer from "../components/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-0 sm:p-4">
      <div className="flex w-full h-dvh sm:h-[calc(100vh-2rem)] sm:max-w-7xl rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-[0_32px_80px_rgba(0,0,0,0.25)] border-0 sm:border border-base-content/8 bg-base-100">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
