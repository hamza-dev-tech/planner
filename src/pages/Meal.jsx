import React, { useState } from 'react';
import { db } from '../firebase';  // Make sure to import your firebase setup
import { collection, addDoc } from 'firebase/firestore';
import Chart from 'react-apexcharts'; // For adding any charts you might need (optional)

const MealLog = () => {
  const [mealData, setMealData] = useState([]);
  const [mealTime, setMealTime] = useState('');
  const [food, setFood] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [notes, setNotes] = useState('');

  // Meal data for the chart you provided (initial meal plan)
  const initialMealPlan = [
    {
      mealTime: '7:30 AM (Breakfast)',
      food: 'Boiled egg, milk, roti, chai',
      portionSize: '1 egg, 1 glass milk, 1 roti',
      notes: ''
    },
    {
      mealTime: '11:00 AM (Snack)',
      food: 'Roasted peanuts or chickpeas',
      portionSize: 'Handful',
      notes: ''
    },
    {
      mealTime: '1:30 PM (Lunch)',
      food: 'Daal, roti, salad, yogurt',
      portionSize: '1 cup daal, 1 roti',
      notes: ''
    },
    {
      mealTime: '5:30 PM (Pre-Workout)',
      food: 'Boiled egg, banana, roti',
      portionSize: '1 egg, 1 banana, ½ roti',
      notes: ''
    },
    {
      mealTime: '8:00 PM (Dinner)',
      food: 'Sabzi, roti, yogurt',
      portionSize: '1 cup sabzi, 1 roti',
      notes: ''
    },
    {
      mealTime: '10:00 PM (Snack)',
      food: 'Milk, peanuts or chickpeas',
      portionSize: '½ glass milk, handful',
      notes: ''
    },
  ];

  // Submit new meal data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mealTime && food && portionSize) {
      const newMeal = {
        mealTime,
        food,
        portionSize,
        notes
      };
      setMealData([...mealData, newMeal]);
      await addDoc(collection(db, 'meals'), newMeal);
      resetForm();
    }
  };

  // Reset form after submitting meal
  const resetForm = () => {
    setMealTime('');
    setFood('');
    setPortionSize('');
    setNotes('');
  };

  // Chart Data for Visualization (optional)
  const chartData = {
    options: {
      chart: {
        id: 'meal-chart',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: ['Breakfast', 'Snack', 'Lunch', 'Pre-Workout', 'Dinner', 'Snack']
      },
      yaxis: {
        title: {
          text: 'Calories'
        }
      }
    },
    series: [{
      name: 'Calories',
      data: [200, 150, 300, 200, 250, 100]  // You can adjust this based on actual calorie data
    }]
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-600 min-h-screen text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6">Meal Log</h1>

      {/* Meal Plan Chart (Visualization of calories or meal types) */}
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Meal Plan Chart</h2>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>

      {/* Meal Plan Table */}
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Week 1 (Day 1-7) - Meal Plan</h2>
        <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-teal-500 text-white text-center">
              <th className="py-3 px-4">Meal Time</th>
              <th className="py-3 px-4">Food/Drink Consumed</th>
              <th className="py-3 px-4">Portion Size</th>
              <th className="py-3 px-4">Notes/How You Felt</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {initialMealPlan.map((meal, index) => (
              <tr key={index} className="border-t border-b border-gray-200 hover:bg-teal-100">
                <td className="py-3 px-4">{meal.mealTime}</td>
                <td className="py-3 px-4">{meal.food}</td>
                <td className="py-3 px-4">{meal.portionSize}</td>
                <td className="py-3 px-4">{meal.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Meal Form */}
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Your Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mealTime" className="block text-sm font-medium mb-2">Meal Time</label>
            <input
              type="text"
              id="mealTime"
              value={mealTime}
              onChange={(e) => setMealTime(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter meal time"
            />
          </div>

          <div>
            <label htmlFor="food" className="block text-sm font-medium mb-2">Food Consumed</label>
            <input
              type="text"
              id="food"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter food item"
            />
          </div>

          <div>
            <label htmlFor="portionSize" className="block text-sm font-medium mb-2">Portion Size</label>
            <input
              type="text"
              id="portionSize"
              value={portionSize}
              onChange={(e) => setPortionSize(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter portion size"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="How did you feel after this meal?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 p-3 text-white rounded-lg mt-4"
          >
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealLog;
