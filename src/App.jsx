import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { LoginForm } from './pages/LoginForm';
import AdminPanel from './pages/AdminPanel';
import DetailsAdmin from './pages/DetailsAdmin';
import AddNew from './pages/AddNew';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<ProductsList />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="admin" element={<AdminPanel />} />
                <Route path="products/:id" element={<DetailsAdmin />} />
                <Route path="users/:id" element={<DetailsAdmin />} />
                <Route path="categories/:id" element={<DetailsAdmin />}/>
                <Route path="products/new" element={<AddNew />} />
                <Route path="users/new" element={<AddNew />} />
                <Route path="categories/new" element={<AddNew />}/>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
