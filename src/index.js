import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { ContextProvider } from "./context/alchemyState";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
