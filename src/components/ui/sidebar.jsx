import { Sheet, SheetContent, SheetTrigger, SheetFooter } from './sheet';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    LayoutDashboard,
    ShoppingCart,
    Users,
    Layers,
    PackageSearch,
    ClipboardList,
    Database,
    LogOutIcon,
} from 'lucide-react';
import { TabsList, TabsTrigger } from './tabs';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useThemeStore';
import { Button } from './button';
import { toast } from 'sonner';

const Sidebar = () => {
    const navItems = [
        { value: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { value: 'products', label: 'Products', icon: Database },
        { value: 'users', label: 'Users', icon: Users },
        { value: 'categories', label: 'Categories', icon: Layers },
        {
            value: 'Blogs',
            label: 'Blogs',
            icon: PackageSearch,
        },
        { value: 'orders', label: 'Orders', icon: ClipboardList },
    ];
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();
    return (
        <>
            <div className="w-70 h-fit hidden bg-[#0f172a]  p-5 lg:flex flex-col justify-between shadow-xl">
                <TabsList
                    variant="line"
                    className="w-full flex-col justify-center items-start bg-[#0f172a] border-b-0"
                >
                    {navItems.map(item => {
                        const Icon = item.icon;

                        return (
                            <TabsTrigger
                                key={item.value}
                                value={item.value}
                                className={cn(
                                    'flex items-center gap-3 p-3 rounded-xl text-gray-400',
                                    'aria-[selected=true]:bg-red-500',
                                    'aria-[selected=true]:text-[#fe9a00] text-xl',
                                    'aria-[selected=true]:border-l-4',
                                    'aria-[selected=true]:border-[#fe9a00]',
                                    'aria-[selected=true]:after:bg-[#fe9a00]',
                                    'hover:bg-[#fe9a00]/5 hover:text-[#fe9a00]'
                                )}
                            >
                                <Icon
                                    style={{ width: '30px ', height: '30px' }}
                                    className="text-inherit"
                                />
                                <span className="text-inherit">
                                    {item.label}
                                </span>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <Button
                    variant="outline"
                    className={
                        'text-[#fe9a00] border-[#fe9a00] hover:bg-[#fe9a00] hover:text-white cursor-pointer'
                    }
                    onClick={() => {
                        logout();
                        localStorage.removeItem('token');
                        navigate('/login');
                        toast.success('You are Logedout Successfuly ', {
                            style: {
                                background: '#16a34a',
                                color: 'white',
                            },
                        });
                    }}
                >
                    <LogOutIcon className="text-[#fe9a00] hover:text-white" />{' '}
                    Logout
                </Button>
            </div>
            <div className=" flex justify-between items-center p-3 bg-white shadow-sm md:flex md:w-full lg:hidden">
                {/* Menu Button */}
                <Sheet>
                    <SheetTrigger>
                        <Menu className="w-6 h-6 text-[#0f172a]" />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="w-64 p-5  bg-[#0f172a] text-white"
                    >
                        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

                        <div className="flex flex-col gap-2">
                            <TabsList
                                variant="line"
                                className="w-full flex-col justify-center items-start"
                            >
                                {navItems.map(item => {
                                    const Icon = item.icon;

                                    return (
                                        <TabsTrigger
                                            key={item.value}
                                            value={item.value}
                                            className={cn(
                                                'flex items-center gap-3 p-3 rounded-xl text-gray-400',
                                                'aria-[selected=true]:bg-red-500',
                                                'aria-[selected=true]:text-[#fe9a00] text-xl',
                                                'aria-[selected=true]:border-l-4',
                                                'aria-[selected=true]:border-[#fe9a00]',
                                                'aria-[selected=true]:after:bg-[#fe9a00]',
                                                'hover:bg-[#fe9a00]/5 hover:text-[#fe9a00]'
                                            )}
                                        >
                                            <Icon
                                                style={{
                                                    width: '30px ',
                                                    height: '30px',
                                                }}
                                                className="text-inherit"
                                            />
                                            {item.label}
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>
                        <SheetFooter className="p-4 border-t">
                            <Button
                                variant="outline"
                                className={
                                    'text-[#fe9a00] border-[#fe9a00] hover:bg-[#fe9a00] hover:text-white cursor-pointer'
                                }
                                onClick={() => {
                                    logout();
                                    localStorage.removeItem('token');
                                    navigate('/login');
                                }}
                            >
                                <LogOutIcon className="text-[#fe9a00] hover:text-white" />{' '}
                                Logout
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                {/* Title */}
                <h2 className="font-semibold text-[#0f172a]">Admin</h2>
            </div>
        </>
    );
};

export default Sidebar;
