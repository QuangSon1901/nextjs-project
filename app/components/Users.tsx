'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    deleted: boolean;
    createdAt: Date;
}

export const getUsers = async () => {
    const res = await fetch('/api/users');
    if (!res.ok) toast.error(res.statusText);

    return res.json();
};

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUsers();
            setUsers(res.users);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div
                className="mt-4 bg-white py-4 rounded-lg"
                style={{ boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)' }}
            >
                <div className="px-6 flex justify-between items-center pb-4">
                    <button
                        className="bg-primary-600 rounded-md py-2 px-4 text-white"
                        // onClick={() => setModalActive({ ...modalActive, isActive: true })}
                    >
                        Add User
                    </button>
                    <div className="relative">
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

                        <input
                            type="text"
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product name"
                            className="outline-none pr-4 pl-10 py-2 border border-borderColor rounded-md focus:border-primary"
                        />
                    </div>
                </div>
                <div>
                    <div className="px-6 py-4 font-bold flex gap-8">
                        <div className="w-2/12 text-[#666]"># Name</div>
                        <div className="w-4/12 text-[#666]"># Email</div>
                        <div className="w-2/12 text-[#666]"># Role</div>
                        <div className="w-2/12 text-[#666]"># Status</div>
                        <div className="w-2/12 text-[#666] text-center"># Actions</div>
                    </div>
                    {users.map((user: User, index: number) => (
                        <div key={index} className="px-6 py-4 border-t border-borderColor flex gap-8">
                            <div
                                className="w-2/12 flex flex-col justify-center cursor-pointer"
                                // onClick={() => setModalActive({ ...modalActive, isActive: true, product: product })}
                            >
                                <span>
                                    <b>{user.name}</b>
                                </span>
                            </div>
                            <div className="w-4/12 flex items-center">{user.email}</div>
                            <div className="w-2/12 flex items-center">{user.role}</div>
                            <div className="w-2/12 flex items-center">
                                {user.deleted ? (
                                    <span className="font-bold text-red-500">Deleted</span>
                                ) : (
                                    <span className="font-bold text-green-500">Active</span>
                                )}
                            </div>
                            <div className="w-2/12 flex items-center text-center justify-center">
                                <button
                                    className="w-16 h-8 rounded-full bg-red-600"
                                    // onClick={() => handleDeleteProduct(product.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="text-white w-5 h-5 mx-auto"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Toaster />
        </div>
    );
}
