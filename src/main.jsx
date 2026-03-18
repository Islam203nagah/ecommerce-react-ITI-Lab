import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layout/MainLayout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoginForm } from './pages/login-form';

// import HomePage from './pages/HomePage';


const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
    children: [
      {
        index: true,
        element: fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => <ProductsList products={json} />),
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ]

	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
		<Provider store={store}>
      <StrictMode>
			  <RouterProvider router={router} />
		  </StrictMode>
    </Provider>
	</LanguageProvider>,
);