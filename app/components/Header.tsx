'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import routerConfig from '@/router/router';
import Link from 'next/link';

const Header = ({ infoUser }: any) => {
    const router = useRouter();
    const [accountMenu, setAccountMenu] = useState(false);

    const handleLogout = async () => {
        const res = await fetch('/api/auth/logout');
        if (res.ok) router.push(routerConfig.login);
    };
    return (
        <div className="flex justify-between items-center h-header px-10">
            <label className="relative" htmlFor="search">
                <input
                    id="search"
                    type="text"
                    placeholder="Search everything"
                    className="w-[270px] h-10 pl-10 pr-2 py-2 rounded-full outline-none border-borderColor border bg-transparent focus:border-primary"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute top-1/2 left-3 w-5 h-5 -translate-y-1/2 text-borderColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </label>
            {infoUser ? (
                <div className="flex space-x-6 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                    </svg>

                    <div className="relative">
                        <div
                            className="flex items-center space-x-2 cursor-pointer select-none"
                            onClick={() => setAccountMenu(!accountMenu)}
                        >
                            <Image
                                src={infoUser?.image ? infoUser.image : '/images/account.jpg'}
                                width="40"
                                height="40"
                                alt=""
                                className="rounded-full object-cover"
                            />
                            <span className="font-medium">{infoUser.name}</span>
                        </div>
                        <div
                            className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                                !accountMenu ? 'hidden' : ''
                            }`}
                        >
                            <div className="py-1">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
                                    Account settings
                                </a>
                                <button
                                    type="submit"
                                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex space-x-6 items-center">
                    <Link href={routerConfig.login} className="text-gray-700 block px-4 py-2 font-medium">
                        Login / Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
