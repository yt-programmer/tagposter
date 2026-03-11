import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate]);

  return (
    <section className="h-screen bg-stone-900 flex items-center ">
      <div className="text-center bg-stone-800 p-10  md:shadow-xl  w-full">
        <h1 className="text-7xl text-stone-600 font-extrabold mb-4">404</h1>
        <p className="text-2xl text-stone-400 font-semibold mb-2">
          Page not found
        </p>
        <p className="text-stone-300">
          Redirecting to home in{" "}
          <span className="font-bold text-white">{timer}</span> seconds
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-stone-600 font-sans text-white rounded-xl hover:opacity-90 transition"
        >
          Go Home Now
        </button>
      </div>
    </section>
  );
};

export default PageNotFound;
