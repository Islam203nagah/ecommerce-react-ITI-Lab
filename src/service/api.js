import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout:10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Products CRUD Operations
export const fetchProducts = ({
    category = '',
    search = '',
    sort = '',
    order = '',
} = {}) => {
    let url = '/products';

    if (search) {
        url = '/products/search';
    } else if (category) {
        url = `/products/category/${category}`;
    }

    return apiClient.get(url, {
        params: {
            ...(search && { q: search }),
            ...(sort && { sortBy: sort }),
            ...(order && { order }),
        },
    });
};

export const fetchProductById = id => apiClient.get(`/products/${id}`);

export const createProduct = data => apiClient.post('/products/add', data);

export const updateProduct = (id, data) =>
    apiClient.patch(`/products/${id}`, data);

export const deleteProduct = id => apiClient.delete(`/products/${id}`);
export const fetchCategories = ({
    category = '',
    search = '',
    sort = '',
    order = '',
} = {}) => {
    let url = '/products/categories';
    if (search) {
        url = '/products/categories/search';
    } else if (category) {
        url = `/products/categories/${category}`;
    }
    return apiClient.get(url, {
        params: {
            ...(search && { q: search }),
            ...(sort && { sortBy: sort }),
            ...(order && { order }),
        },
    });
};

export const fetchCategoryById = id =>
    apiClient.get(`/products/categories/${id}`);

export const createCategory = data =>
    apiClient.post('/products/categories', data);

export const updateCategory = (id, data) =>
    apiClient.put(`/products/categories/${id}`, data);

export const deleteCategory = id =>
    apiClient.delete(`/products/categories/${id}`);
export const fetchUsers = ({
    login = '',
    search = '',
    sort = '',
    order = '',
} = {}) => {
    let url = '/users';
    if (search) {
        url = '/users/search';
    } else if (login) {
        url = `/users/${login}`;
    }
    
    return apiClient.get(url, {
        params: {
            ...(search && { q: search }),
            ...(sort && { sortBy: sort }),
            ...(order && { order }),
        },
    });
};

export const fetchUserById = id => apiClient.get(`/users/${id}`);

export const createUser = data => apiClient.post('/users/add', data);

export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);

export const deleteUser = id => apiClient.delete(`/users/${id}`);
export const fetchOrders = () => apiClient.get('/orders');

export const fetchOrderById = id => apiClient.get(`/orders/${id}`);

export const createOrder = data => apiClient.post('/orders', data);

export const updateOrder = (id, data) => apiClient.put(`/orders/${id}`, data);

export const deleteOrder = id => apiClient.delete(`/orders/${id}`);
export const fetchBooks = () => apiClient.get('/products');

export const fetchBookById = id => apiClient.get(`/products/${id}`);

export const createBook = data => apiClient.post('/products', data);

export const updateBook = (id, data) => apiClient.put(`/products/${id}`, data);

export const deleteBook = id => apiClient.delete(`/products/${id}`);

// Error handling interceptor
apiClient.interceptors.response.use(
    response => response.data,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
