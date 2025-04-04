import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase config
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSpring, animated } from 'react-spring';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Workout = () => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [workoutFocus, setWorkoutFocus] = useState('');

  const [animationProps, setAnimationProps] = useState({ opacity: 0, transform: 'translateY(20px)' });

  const workoutSchedule = {
    Monday: { focus: 'Push (Chest, Shoulders, Triceps)', sets: '4', reps: '8-12', weights: 'Strength', notes: 'Energy is high today' },
    Tuesday: { focus: 'Pull (Back, Biceps, Forearms)', sets: '4', reps: '8-12', weights: 'Strength', notes: 'Focus on form' },
    Wednesday: { focus: 'Legs + Core + Neck', sets: '4', reps: '8-12', weights: 'Strength + Core', notes: 'Heavy leg day' },
    Thursday: { focus: 'Upper Body + Wrist Focus', sets: '4', reps: '8-12', weights: 'Strength', notes: 'Increased wrist strength' },
    Friday: { focus: 'Full Body + Cardio + Core', sets: '3', reps: '12-15', weights: 'Moderate', notes: 'Full-body focus' },
    Saturday: { focus: 'Active Rest (Stretch, Walk)', sets: 'N/A', reps: 'N/A', weights: 'N/A', notes: 'Active recovery' },
    Sunday: { focus: 'Full Rest', sets: 'N/A', reps: 'N/A', weights: 'N/A', notes: 'Complete rest day' },
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workout Focus',
        data: [4, 4, 4, 4, 3, 2, 1], // This will show the "sets" for the day
        fill: true,
        backgroundColor: 'rgba(66, 165, 245, 0.2)', // Gradient fill
        borderColor: '#42A5F5', // Border color for the line
        tension: 0.4, // Smooth line
        pointRadius: 6, // Larger data points
        pointHoverRadius: 8, // Hover effect on points
        borderWidth: 2,
        pointBackgroundColor: '#42A5F5', // Point color
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (tooltipItem) => {
            return `Sets: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          borderColor: '#ddd',
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  const getTodayWorkout = () => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' });
    setWorkoutFocus(workoutSchedule[today]);
  };

  const fetchWorkouts = async () => {
    const workoutsCollection = collection(db, 'workouts');
    const workoutsSnapshot = await getDocs(workoutsCollection);
    const workoutsList = workoutsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setWorkouts(workoutsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (exercise && sets && reps && weight) {
      await addDoc(collection(db, 'workouts'), {
        exercise,
        sets,
        reps,
        weight,
        date: new Date().toISOString(),
      });
      fetchWorkouts();
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    getTodayWorkout();
    fetchWorkouts();

    // Animation
    setAnimationProps({ opacity: 1, transform: 'translateY(0px)' });

    const notificationTime = new Date();
    notificationTime.setHours(16, 0, 0, 0); // Set to 4:00 PM today
    const timeUntilNotification = notificationTime - new Date();

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        new Notification('Time to workout!', {
          body: 'Get ready for today\'s workout!',
        });
      }, timeUntilNotification);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-600 min-h-screen text-white p-8">
      <animated.div style={animationProps} className="text-center">
        <h1 className="text-4xl font-extrabold mb-6">Today's Workout</h1>

        {/* Workout Focus */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-semibold mb-4">{new Date().toLocaleString('en-US', { weekday: 'long' })} - Focus</h2>
          {workoutFocus ? (
            <div>
              <h3 className="text-2xl font-medium mb-2">{workoutFocus.focus}</h3>
              <p><strong>Sets:</strong> {workoutFocus.sets}</p>
              <p><strong>Reps:</strong> {workoutFocus.reps}</p>
              <p><strong>Weights:</strong> {workoutFocus.weights}</p>
              <p><strong>Notes:</strong> {workoutFocus.notes}</p>
            </div>
          ) : (
            <p>Loading today's workout...</p>
          )}
        </div>

        {/* Fancy Workout Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Weekly Workout Plan</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Workout Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg text-gray-800 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Log Your Workout</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="exercise" className="block text-sm font-medium mb-2">Exercise</label>
              <input
                type="text"
                id="exercise"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="e.g., Push-up, Squats"
              />
            </div>
            <div>
              <label htmlFor="sets" className="block text-sm font-medium mb-2">Sets</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label htmlFor="reps" className="block text-sm font-medium mb-2">Reps</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300"
                placeholder="e.g., 20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 p-3 text-white rounded-lg mt-4"
            >
              Log Workout
            </button>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default Workout;
