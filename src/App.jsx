import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'; 
function App() {
  const handleClick = () => {
    toast.success('Tuşa bastın, işlem başarılı!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <h1>kNeat Solutions</h1>
      <div className="card">
        <button onClick={handleClick}>
          test
        </button>
        
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
