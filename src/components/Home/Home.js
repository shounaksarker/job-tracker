import React from "react";
import MyTable from "../utils/Table";

const Home = () => {
  const name = localStorage.getItem("name");
  return (
    <div>
      <h3 className="text-2xl text-center p-2 underline mb-6">
        Welcome <span className="font-semibold capitalize">" {name} "</span>
      </h3>
      <MyTable />
    </div>
  );
};

export default Home;
