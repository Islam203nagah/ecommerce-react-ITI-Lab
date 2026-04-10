import AdminContent from '@/components/ui/AdminContent';
import { Badge } from '@/components/ui/badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import hero from '../assets/public/hero.jpg';
import Sidebar from '@/components/ui/sidebar';
import { Tabs } from '@/components/ui/tabs';
import React from 'react';
import { Link } from 'react-router-dom';
import { IsTablet, useIsMobile } from '@/store/use-mobile';
import { useTabName } from '@/store/tabName';

const AdminPanel = () => {
    const isMobile = useIsMobile();
    const isTablet = IsTablet();
    const tabName = useTabName(state => state.tabName);
    const setTabName = useTabName(state => state.setTabName);

    const items = [{ label: 'Home', to: '/' }, { label: `${tabName}` }];
    return (
        <div className={'py-5 '}>
            <div className="flex items-center gap-3 p-3 justify-end rounded-xl transition-all duration-200">
                <img
                    src={`${hero}`}
                    className="w-10 h-10 rounded-full"
                    alt=""
                />{' '}
                <Badge
                    variant="default"
                    className={'bg-green-500 rounded-r-full rounded-l-full'}
                >
                    admin
                </Badge>
                <span className="text-blue-500 hover:text-blue-700">
                    <Link to="/"> go to site</Link>
                </span>
            </div>
            <Breadcrumb items={items} />
            <Tabs
                value={tabName}
                onValueChange={setTabName}
                orientation={isMobile ?'horizontal': isTablet ? 'horizontal':'vertical'}
                className="w-full"
            >
                <Sidebar></Sidebar>
                <AdminContent></AdminContent>
            </Tabs>
        </div>
    );
};

export default AdminPanel;
