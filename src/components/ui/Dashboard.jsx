import React from 'react';
import map from '../../assets/public/map.avif';
import hero from '../../assets/public/hero.jpg';
import {
    CircleDollarSign,
    Eye,
    ShoppingCart,
    UserRound
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { TabsContent } from './tabs';
import { Badge } from './badge';
import { ChartAreaInteractive } from './Charts';
import { Progress } from './progress';
const Dashboard = ({ tabName, totalUsers, totalProducts }) => {
    return (
        <TabsContent value={`${tabName}`} className="w-full">
            <div className="grid grid-cols-1  lg:grid-cols-2 lg:grid-rows-2 xl:grid-cols-4 gap-4 p-3">
                <Card className="border-2 border-amber-500 bg-amber-50 w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            
                                Total Users
                                
                        </CardTitle>
                        <UserRound className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            
                                {totalUsers}
                                
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-amber-500 bg-amber-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                                
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalProducts}
                                
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-amber-500 bg-amber-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                                
                        </CardTitle>
                        <CircleDollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            $12,345
                                
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-amber-500 bg-amber-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Visitors
                        </CardTitle>
                        <Eye className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            1,234
                        </div>
                    </CardContent>
                </Card>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 rounded-t-lg gap-4 p-3 mt-4">
                <Card className="col-span-2 p-0 gap-0 bg-amber-50">
                    <CardHeader
                        className={
                            'bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white'
                        }
                    >
                        <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent className={'p-0'}>
                        <ChartAreaInteractive
                            className={'bg-amber-50 rounded-none'}
                        />
                    </CardContent>
                </Card>

                <Card className="bg-amber-50 p-0">
                    <CardHeader
                        className={
                            'bg-[#0f172a] p-3 rounded-t-lg text-white'
                        }
                    >
                        <CardTitle className="text-base ">
                            Recent Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={hero}
                                    alt="user"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">
                                        Order: #12345
                                    </span>
                                    <span className="text-xs">
                                        John Doe
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-amber-500">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={hero}
                                    alt="user"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">
                                        Order: #12346
                                    </span>
                                    <span className="text-xs">
                                        Jane Smith
                                    </span>
                                </div>
                            </div>
                            <Badge className="bg-green-500">
                                Completed
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 rounded-t-lg gap-4 p-3 mt-4">
                <Card className="p-0 gap-0 bg-amber-50">
                    <CardHeader
                        className={
                            'bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white'
                        }
                    >
                        <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent className={'p-0'}>
                        {[80, 90, 70, 56].map((value, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 hover:bg-white/10 transition-all duration-200"
                            >
                                <div className="flex flex-col items-center gap-3 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="font-bold text-sm">
                                            Product: #12345
                                        </span>
                                        <span className="text-xs">
                                            <span className="font-bold">
                                                320
                                            </span>{' '}
                                            Sales
                                        </span>
                                    </div>
                                    <Progress
                                        value={value}
                                        className="w-full "
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="col-span-2 p-0 gap-0 bg-amber-50">
                    <CardHeader
                        className={
                            'bg-[rgb(15,23,42)] p-3 rounded-t-lg text-white'
                        }
                    >
                        <CardTitle>User Activity</CardTitle>
                    </CardHeader>
                    <CardContent className={'p-0 h-full'}>
                        <div
                            className="w-full p-3 h-full bg-center bg-cover bg-no-repeat flex flex-col gap-8 items-start"
                            style={{ backgroundImage: `url(${map})` }}
                        >
                            <h2 className="text-xl font-bold">
                                Active Users
                            </h2>
                            <div className="flex flex-col p-3 items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">
                                        New York
                                    </span>
                                    <span className="font-bold text-amber-500">
                                        354
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">
                                        Los Angeles
                                    </span>
                                    <span className="font-bold text-amber-500">
                                        289
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm">Chicago</span>
                                    <span className="font-bold text-amber-500">
                                        198
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            

            
        </TabsContent>
    );
};

export default Dashboard;
