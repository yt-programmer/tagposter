import React from "react";

const Error = ({ error }) => {
  return (
    <div className="col-span-full text-center">
      <h1 className="text-2xl font-bold text-red-700">{error}</h1>
    </div>
  );
};

export default Error;
