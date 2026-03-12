import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store.js'

// Initialize theme on app load
const initializeTheme = () => {
  const stored = localStorage.getItem("chatapp_theme");
  const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "light");
  document.documentElement.setAttribute("data-theme", theme);

}

initializeTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)