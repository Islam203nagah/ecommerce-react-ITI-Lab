import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import { createBrowserRouter, RouterProvider } from 'react-router';
import { HashRouter } from 'react-router-dom';
// import MainLayout from './layout/MainLayout';
// import ProductsList from './pages/ProductsList';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import NotFound from './pages/NotFound';
// import { LoginForm } from './pages/login-form';
// import AdminPanel from './pages/AdminPanel';
import { LanguageProvider } from './context/LanguageContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

// import HomePage from './pages/HomePage';

createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <Provider store={store}>
            <StrictMode>
                <HashRouter>
                    <App />
                </HashRouter>
            </StrictMode>
        </Provider>
    </LanguageProvider>
);
