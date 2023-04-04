'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import routerConfig from '@/router/router';

type SidebarMenuItem = {
    title: string;
    href: string;
};

const sidebarMenu: SidebarMenuItem[] = [
    {
        title: 'Dashboard',
        href: routerConfig.dashboard,
    },
    {
        title: 'Products',
        href: routerConfig.products,
    },
    {
        title: 'Users',
        href: routerConfig.users,
    },
];

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    return (
        <div>
            <div className="h-header flex justify-center items-center">
                <Image src={'/images/light-logo-blue.png'} className="m-auto" width="200" height="30" alt="" />
            </div>
            <div className="py-4">
                <ul className="space-y-2">
                    {sidebarMenu.map((value: SidebarMenuItem, index: number) => (
                        <li key={index}>
                            <Link
                                href={value.href}
                                className={`w-full py-2 pr-3 pl-5 block text-lg font-medium ${
                                    pathname === value.href && 'bg-primary-600 text-white rounded-r-full'
                                }`}
                            >
                                {value.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
