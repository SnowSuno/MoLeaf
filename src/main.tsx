import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
