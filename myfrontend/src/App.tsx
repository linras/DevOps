import React, { useEffect } from "react";
import './App.css';
import "antd/dist/antd.css";
import { DogTable } from './components/DogTable';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:4000/';
  }, []);

  return (
    <div className="App">
      <DogTable />
    </div>
  );
}
 export default App;
