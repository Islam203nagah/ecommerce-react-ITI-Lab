import React, { useEffect } from 'react';
import { TabsContent } from './tabs';
import {
    CircleDollarSign,
    CirclePlus,
    Eye,
    ShoppingCart,
    UserRound,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';


import { useTabName } from '@/store/tabName';
import { Button } from './button';
import { Input } from './input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';
import AdminTable from './AdminTable';
import {
    fetchProducts,

    fetchCategories,

    fetchUsers,

} from '@/service/api';

import Dashboard from './Dashboard';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useThemeStore } from '@/store/useThemeStore';

const AdminContent = () => {
    const navigate=useNavigate()
    const tabName = useTabName(state => state.tabName);
    const setTabName = useTabName(state => state.setTabName);
    const [data, setData] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [totalProducts, setTotalProducts] = React.useState(0);
    const [totalUsers, setTotalUsers] = React.useState(0);
    const [productByCategory, setProductByCategory] = React.useState('');
    const [productBySearch, setProductBySearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState('');
    const theme = useThemeStore(state => state.theme);
    const handleFilterChange = value => {
        setProductByCategory(prev => (prev === value ? '' : value));
    };
    const handelSort = value => {
        setSortBy(prev => (prev === value ? '' : value));
    };

    const handeResetSearch = () => {
        setProductBySearch('');
        document.querySelector('input[placeholder="Search..."]').value = '';
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [sortField, sortOrder] = sortBy
                    ? sortBy.split('-')
                    : ['', ''];

                const productsRes = await fetchProducts({
                    category: productByCategory,
                    search: productBySearch,
                    sort: sortField,
                    order: sortOrder,
                });

                const categoriesRes = await fetchCategories();
                const usersRes = await fetchUsers({
                    search: productBySearch,
                    role: productByCategory,
                    sort: sortField,
                    order: sortOrder,
                });

                const productsData = productsRes?.products || [];
                const productsTotalData = productsRes?.total || 0;
                const categoriesData = categoriesRes || [];
                const usersData = usersRes?.users || [];
                const usersTotalData = usersRes?.total || 0;

                setProducts(productsData);
                setTotalProducts(productsTotalData);
                setCategories(categoriesData);
                setUsers(usersData);
                setTotalUsers(usersTotalData);

                setData(
                    tabName === 'products'
                        ? productsData
                        : tabName === 'users'
                          ? usersData
                          : tabName === 'categories'
                            ? categoriesData
                            : []
                );
            } catch (error) {
                toast.error('Fiald to fetch data', {
                    style: {
                        background: '#dc2626',
                        color: '#fff',
                    },
                });
            }
        };

        fetchData();
    }, [productBySearch, productByCategory, sortBy, tabName]);
    const sortableFields =
        data && data.length > 0
            ? Object.keys(data[0]).filter(
                  key => typeof data[0][key] === 'number'
              )
            : [];
    return (
        <div className={`w-full shadow-lg ${theme==="dark"?"bg-amber-900":"bg-amber-100"}`} >
            {tabName === 'dashboard' ? (
                <Dashboard
                    tabName={tabName}
                    totalUsers={totalUsers}
                    totalProducts={totalProducts}
                />
            ) : (
                <TabsContent value={`${tabName}`} className="w-full">
                    <div className="grid grid-cols-1  lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 gap-4 p-3">
                        <Card className="border-2 border-amber-500 bg-amber-50 w-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {tabName === 'products'
                                        ? 'Total Skus'
                                        : tabName === 'users'
                                          ? 'Total Users'
                                          : 'Total Categories'}
                                </CardTitle>
                                <UserRound className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tabName === 'products'
                                        ? totalProducts
                                        : tabName === 'users'
                                          ? totalUsers
                                          : categories.length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-500 bg-amber-50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {tabName === 'products'
                                        ? 'Low Stock Items'
                                        : tabName === 'users'
                                          ? 'Active Users'
                                          : 'Active Categories'}
                                </CardTitle>
                                <ShoppingCart className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tabName === 'products'
                                        ? '08'
                                        : tabName === 'users'
                                          ? '1,234'
                                          : '12'}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-500 bg-amber-50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {tabName === 'products'
                                        ? 'Out of Stock'
                                        : tabName === 'users'
                                          ? 'Inactive Users'
                                          : 'Inactive Categories'}
                                </CardTitle>
                                <CircleDollarSign className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tabName === 'products'
                                        ? '02'
                                        : tabName === 'users'
                                          ? '123'
                                          : '5'}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-500 bg-amber-50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {tabName === 'products'
                                        ? 'Total Views'
                                        : tabName === 'users'
                                          ? 'Admins'
                                          : 'Top Categories'}
                                </CardTitle>
                                <Eye className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {tabName === 'products'
                                        ? '1,234'
                                        : tabName === 'users'
                                          ? '12'
                                          : '3'}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className={`w-full p-3`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <Select
                                    onValueChange={value =>
                                        handleFilterChange(value)
                                    }
                                    value={productByCategory}
                                    className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                >
                                    <SelectTrigger className={`w-full sm:w-40 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                        <SelectValue className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                            placeholder={
                                                tabName === 'products'
                                                    ? 'Filter by Category'
                                                    : 'Filter by Status'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                        {tabName === 'products' ? (
                                            categories.map(category => (
                                                <SelectItem
                                                    key={category.name}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        ) : tabName === 'users' ? (
                                            <>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inactive
                                                </SelectItem>
                                                <SelectItem value="admin">
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value="user">
                                                    User
                                                </SelectItem>
                                                <SelectItem value="moderator">
                                                    Maditor
                                                </SelectItem>
                                            </>
                                        ) : tabName === 'categories' ? (
                                            categories.map(category => (
                                                <SelectItem
                                                    key={category.name}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        ) : null}
                                    </SelectContent>
                                </Select>
                                <Select
                                    onValueChange={value => handelSort(value)}
                                    value={sortBy}
                                    className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                >
                                    <SelectTrigger className={`w-full sm:w-40 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                        <SelectValue className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                            placeholder={
                                                tabName === 'products'
                                                    ? 'Sort by Price'
                                                    : 'Sort'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className={`${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}>
                                        {sortableFields.flatMap(key => [
                                            <SelectItem
                                                key={`${key}-asc`}
                                                value={`${key}-asc`}
                                            >
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                : Ascending
                                            </SelectItem>,
                                            <SelectItem
                                                key={`${key}-desc`}
                                                value={`${key}-desc`}
                                            >
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                : Descending
                                            </SelectItem>,
                                        ])}
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Search..."
                                    value={productBySearch}
                                    onChange={e =>
                                        setProductBySearch(e.target.value)
                                    }
                                    className={`w-full sm:w-40 ${theme==="dark"?"bg-[#333] text-[#fff]":"bg-[#fff] text-[#000]"}`}
                                />
                                <Button
                                    variant="outline"
                                    className="w-full  sm:w-25 hover:text-white hover:bg-[#fe9a00] border-[#fe9a00] p-3 cursor-pointer"
                                    onClick={() => handeResetSearch()}
                                >
                                    reset Search
                                </Button>
                            </div>
                            <Button
                                onClick={()=>navigate(`/${tabName}/new`)}
                                variant="outline"
                                className={` w-full sm:w-40 h-10 hover:text-white hover:bg-[#fe9a00] border-[#fe9a00] cursor-pointer `}
                            >
                                {' '}
                                <CirclePlus
                                    className={`text-inherit `}
                                    size={16}
                                />{' '}
                                Add New {tabName}
                            </Button>
                        </div>

                        <Card className="w-full md:w-full lg:w-202 xl:w-264.75 overflow-hidden p-0">
                            <AdminTable tabName={tabName} data={data} />
                        </Card>
                    </div>
                </TabsContent>
            )}
        </div>
    );
};

export default AdminContent;
