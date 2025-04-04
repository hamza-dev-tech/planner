import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 p-8 flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Welcome to Your Personal Fitness Tracker</h1>
      <p className="text-lg mb-8">Track your workouts, meals, body measurements, and monitor your progress all in one place!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/workout">
          <div className="bg-blue-700 hover:bg-blue-800 p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-semibold mb-3">Track Workouts</h2>
            <p>Log your daily workouts, track sets, reps, and weights. Stay on top of your fitness goals.</p>
          </div>
        </Link>
        <Link to="/meal">
          <div className="bg-green-700 hover:bg-green-800 p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-semibold mb-3">Track Meals</h2>
            <p>Log your meals and ensure you're meeting your nutritional needs with ease.</p>
          </div>
        </Link>
        <Link to="/measurements">
          <div className="bg-purple-700 hover:bg-purple-800 p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-semibold mb-3">Track Measurements</h2>
            <p>Monitor your body measurements over time to see your physical transformation.</p>
          </div>
        </Link>
        <Link to="/progress">
          <div className="bg-yellow-700 hover:bg-yellow-800 p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-semibold mb-3">View Progress</h2>
            <p>Visualize your progress with graphs and stats to stay motivated.</p>
          </div>
        </Link>
      </div>

      <footer className="absolute bottom-8 w-full text-center text-sm text-gray-200">
        <p>Created with 💪 by Hamza | Fitness Tracker</p>
      </footer>
    </div>
  );
};

export default Home;
