import React from "react";
import Sidebar from "../src/components/Sidebar.jsx";
import MessageContainer from "../src/components/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="flex w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden bg-base-100">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
