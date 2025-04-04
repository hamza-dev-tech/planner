import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const ProgressTracker = () => {
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [waist, setWaist] = useState('');
  const [wrist, setWrist] = useState('');
  const [progressData, setProgressData] = useState([]);
  
  // Fetch progress from Firestore
  const fetchProgress = async () => {
    const progressCollection = collection(db, 'progress');
    const progressSnapshot = await getDocs(progressCollection);
    const progressList = progressSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProgressData(progressList);
  };

  // Submit new progress entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (weight && calories && waist && wrist) {
      await addDoc(collection(db, 'progress'), {
        date: new Date().toLocaleDateString(),
        weight,
        calories,
        waist,
        wrist,
      });
      fetchProgress();
      setWeight('');
      setCalories('');
      setWaist('');
      setWrist('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-600 min-h-screen text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-6">Progress Tracker</h1>

      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Log Your Progress</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter your weight"
            />
          </div>

          <div>
            <label htmlFor="calories" className="block text-sm font-medium mb-2">Calories Consumed</label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter calories consumed"
            />
          </div>

          <div>
            <label htmlFor="waist" className="block text-sm font-medium mb-2">Waist (cm)</label>
            <input
              type="number"
              id="waist"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter waist measurement"
            />
          </div>

          <div>
            <label htmlFor="wrist" className="block text-sm font-medium mb-2">Wrist (cm)</label>
            <input
              type="number"
              id="wrist"
              value={wrist}
              onChange={(e) => setWrist(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Enter wrist measurement"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 p-3 text-white rounded-lg mt-4"
          >
            Log Progress
          </button>
        </form>
      </div>

      {/* Display Progress Data */}
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Progress Log</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Weight (kg)</th>
              <th className="py-2 px-4 border">Calories</th>
              <th className="py-2 px-4 border">Waist (cm)</th>
              <th className="py-2 px-4 border">Wrist (cm)</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((entry) => (
              <tr key={entry.id}>
                <td className="py-2 px-4 border">{entry.date}</td>
                <td className="py-2 px-4 border">{entry.weight}</td>
                <td className="py-2 px-4 border">{entry.calories}</td>
                <td className="py-2 px-4 border">{entry.waist}</td>
                <td className="py-2 px-4 border">{entry.wrist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTracker;
