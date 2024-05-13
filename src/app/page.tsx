'use client'

import { useEffect } from 'react';

async function auth() {
  try {
    const response = await fetch('http://localhost:4000/google/callback', { method: 'post' });
    const data = await response.json();
    window.location.href = data.url; // Redirect to the authentication URL
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

const App: React.FC = () => {
  useEffect(() => {
    // If you need to run any initialization code when the component mounts, you can do it here.
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">Welcome to Consulting Ninja!</h1>
      <h3 className="text-2xl font-semibold">Google OAuth!</h3>
      <p>
        Visit{' '}
        <a href="https://www.youtube.com/@ConsultingNinja/featured" className="text-blue-500 font-semibold">
          <strong>@ConsultingNinja</strong>
        </a>{' '}
        to see more great videos!
      </p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={auth}>
        <img className="h-6 w-6 inline-block" src="https://www.svgrepo.com/show/513008/twitter-154.svgz" alt="google sign in" />
      </button>
    </>
  );
};

export default App;
