import React from 'react'
import { TabsContent } from './tabs'
import { CircleDollarSign, CirclePlus, Eye, LayoutDashboard, ShoppingCart, User, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import hero from '../../assets/public/hero.jpg'
import map from '../../assets/public/map.avif'
import { Badge } from './badge'
import { ChartAreaInteractive } from './Charts'
import { Progress } from './progress'
import { useTabName } from '@/store/tabName'
import { Button } from './button'
import {Select,

SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from './select'
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from './table'

const AdminContent = () => {
    const tabName=useTabName((state) => state.tabName);




return (
    <div className='w-full bg-amber-100 shadow-lg'>
        <TabsContent value={`${tabName}`} className="w-full">
                        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-3'>
                                        <Card className='border-2 border-amber-500 bg-amber-50'>
                                                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                                        <CardTitle className='text-sm font-medium'>{tabName === "dashboard" ? "Total Users" : tabName === "products" ? "Total Skus" : "Total Users"}</CardTitle>
                                                                        <UserRound className='h-4 w-4 text-amber-600' />
                                                        </CardHeader>
                                                        <CardContent>
                                                                        <div className='text-2xl font-bold'>{tabName === "dashboard" ? "1,234" : tabName === "products" ? "567" : "124,345"}</div>
                                                        </CardContent>
                                        </Card>

                                        <Card className='border-2 border-amber-500 bg-amber-50'>
                                                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                                        <CardTitle className='text-sm font-medium'>{tabName === "dashboard" ? "Total Products" : tabName === "products" ? "Low Stock Items" : "Active Users"}</CardTitle>
                                                                        <ShoppingCart className='h-4 w-4 text-amber-600' />
                                                        </CardHeader>
                                                        <CardContent>
                                                                        <div className='text-2xl font-bold'>{tabName === "dashboard" ? "1,234" : tabName === "products" ? "42" : "178,000"}</div>
                                                        </CardContent>
                                        </Card>

                                        <Card className='border-2 border-amber-500 bg-amber-50'>
                                                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                                        <CardTitle className='text-sm font-medium'>{tabName === "dashboard" ? "Total Revenue" : tabName === "products" ? "Out of Stock" : "Loyalty Customers"}</CardTitle>
                                                                        <CircleDollarSign className='h-4 w-4 text-green-600' />
                                                        </CardHeader>
                                                        <CardContent>
                                                                        <div className='text-2xl font-bold'>{tabName === "dashboard" ? "$12,345" : tabName === "products" ? "08" : "12,345"}</div>
                                                        </CardContent>
                                        </Card>

                                        <Card className='border-2 border-amber-500 bg-amber-50'>
                                                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                                        <CardTitle className='text-sm font-medium'>{tabName === "dashboard" ? "Total Visitors" : tabName === "products" ? "Active Discounts" : "Inactive Users"}</CardTitle>
                                                                        <Eye className='h-4 w-4 text-amber-600' />
                                                        </CardHeader>
                                                        <CardContent>
                                                                        <div className='text-2xl font-bold'>{tabName === "dashboard" ? "1,234" : tabName === "products" ? "15" : "123,345"}</div>
                                                        </CardContent>
                                        </Card>
                        </div>

                        <div hidden={tabName !== "dashboard"}>
                                        <div className='grid grid-cols-1 lg:grid-cols-3 rounded-t-lg gap-4 p-3 mt-4'>
                                                        <Card className='col-span-2 p-0 gap-0 bg-amber-50'>
                                                                        <CardHeader className={"bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white"}>
                                                                                        <CardTitle >Sales Overview</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent className={"p-0"}>
                                                                                        <ChartAreaInteractive className={"bg-amber-50 rounded-none"}/>
                                                                        </CardContent>
                                                        </Card>

                                                        <Card className='bg-amber-50 p-0'>
                                                                        <CardHeader className={"bg-[#0f172a] p-3 rounded-t-lg text-white"}>
                                                                                        <CardTitle className='text-base '>Recent Orders</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent className='space-y-4'>
                                                                                        <div className='flex items-center justify-between'>
                                                                                                        <div className='flex items-center gap-3'>
                                                                                                                        <img src={hero} alt='user' className='w-10 h-10 rounded-full' />
                                                                                                                        <div className='flex flex-col'>
                                                                                                                                        <span className='font-bold text-sm'>Order: #12345</span>
                                                                                                                                        <span className='text-xs'>John Doe</span>
                                                                                                                        </div>
                                                                                                        </div>
                                                                                                        <Badge className='bg-amber-500'>Pending</Badge>
                                                                                        </div>
                                                                                        <div className='flex items-center justify-between'>
                                                                                                        <div className='flex items-center gap-3'>
                                                                                                                        <img src={hero} alt='user' className='w-10 h-10 rounded-full' />
                                                                                                                        <div className='flex flex-col'>
                                                                                                                                        <span className='font-bold text-sm'>Order: #12346</span>
                                                                                                                                        <span className='text-xs'>Jane Smith</span>
                                                                                                                        </div>
                                                                                                        </div>
                                                                                                        <Badge className='bg-green-500'>Completed</Badge>
                                                                                        </div>
                                                                        </CardContent>
                                                        </Card>
                                        </div>
                                        <div className='grid grid-cols-1 lg:grid-cols-3 rounded-t-lg gap-4 p-3 mt-4'>
                                                        <Card className='p-0 gap-0 bg-amber-50'>
                                                                        <CardHeader className={"bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white"}>
                                                                                        <CardTitle >Top Products</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent className={"p-0"}>
                                                                                        {[80, 90, 70, 56].map((value, idx) => (
                                                                                                        <div key={idx} className='flex items-center justify-between p-3 hover:bg-white/10 transition-all duration-200'>
                                                                                                                        <div className='flex flex-col items-center gap-3 w-full'>
                                                                                                                                        <div className='flex items-center justify-between w-full'>
                                                                                                                                                        <span className='font-bold text-sm'>Product: #12345</span>
                                                                                                                                                        <span className='text-xs'><span className='font-bold'>320</span> Sales</span>
                                                                                                                                        </div>
                                                                                                                                        <Progress value={value} className='w-full ' />
                                                                                                                        </div>
                                                                                                        </div>
                                                                                        ))}
                                                                        </CardContent>
                                                        </Card>

                                                        <Card className='col-span-2 p-0 gap-0 bg-amber-50'>
                                                                        <CardHeader className={"bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white"}>
                                                                                        <CardTitle >User Activity</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent className={"p-0 h-full"} >
                                                                                        <div className='w-full p-3 h-full bg-center bg-cover bg-no-repeat flex flex-col gap-8 items-start' style={{ backgroundImage: `url(${map})` }}>
                                                                                                        <h2 className='text-xl font-bold'>Active Users</h2>
                                                                                                        <div className='flex flex-col p-3 items-center gap-3'>
                                                                                                                        <div className='flex items-center gap-3'>
                                                                                                                                        <span className='text-sm'>New York</span>
                                                                                                                                        <span className='font-bold text-amber-500'>354</span>
                                                                                                                        </div>
                                                                                                                        <div className='flex items-center gap-3'>
                                                                                                                                        <span className='text-sm'>Los Angeles</span>
                                                                                                                                        <span className='font-bold text-amber-500'>289</span>
                                                                                                                        </div>
                                                                                                                        <div className='flex items-center gap-3'>
                                                                                                                                        <span className='text-sm'>Chicago</span>
                                                                                                                                        <span className='font-bold text-amber-500'>198</span>
                                                                                                                        </div>
                                                                                                        </div> 
                                                                                        </div>
                                                                        </CardContent>
                                                        </Card>
                                        </div>
                        </div>

                        <div className={`w-full p-3 ${tabName==="dashboard" ? 'hidden' : 'block'}`}>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4'>
                                                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                                                                        <Select>
                                                                                        <SelectTrigger className='w-full sm:w-40'>
                                                                                                        <SelectValue placeholder={tabName === "products" ? "Filter by Category" : "Filter by Status"} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                                                        </SelectContent>
                                                                        </Select>
                                                                        <Select>
                                                                                        <SelectTrigger className='w-full sm:w-40'>
                                                                                                        <SelectValue placeholder={tabName === "products" ? "Sort by Price" : "Sort by Date"} />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                                        <SelectItem value="option1">Option 1</SelectItem>
                                                                                                        <SelectItem value="option2">Option 2</SelectItem>
                                                                                        </SelectContent>
                                                                        </Select>
                                                        </div>
                                                        <Button variant="outline" className='w-full sm:w-40 h-10 hover:text-white hover:bg-[#fe9a00] border-[#fe9a00]'> <CirclePlus className="text-inherit" size={16} /> Add New {tabName}</Button>
                                        </div>
                                        <Card className='w-full overflow-hidden'>
                                                <div className='w-full overflow-x-auto'>
                                                        <Table>
                                                                <TableHeader>
                                                                        <TableRow>
                                                                                <TableHead>ID</TableHead>
                                                                                <TableHead>Name</TableHead>
                                                                                <TableHead>{tabName === "products" ? "Price" : "Status"}</TableHead>
                                                                                <TableHead>Action</TableHead>
                                                                        </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                        {[1, 2, 3, 4, 5].map((item) => (
                                                                                <TableRow key={item}>
                                                                                        <TableCell className='font-medium'>#{String(item).padStart(5, '0')}</TableCell>
                                                                                        <TableCell>{tabName === "products" ? `Product ${item}` : `User ${item}`}</TableCell>
                                                                                        <TableCell>{tabName === "products" ? `$${(item * 25).toFixed(2)}` : "Active"}</TableCell>
                                                                                        <TableCell className='flex gap-2'>
                                                                                                <Button size='sm' variant='outline'>Edit</Button>
                                                                                                <Button size='sm' variant='destructive'>Delete</Button>
                                                                                        </TableCell>
                                                                                </TableRow>
                                                                        ))}
                                                                </TableBody>
                                                        </Table>
                                                </div>
                                        </Card>
                        </div>
        </TabsContent>
    </div>
)
}

export default AdminContent
