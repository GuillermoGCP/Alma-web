import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import './utils/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
