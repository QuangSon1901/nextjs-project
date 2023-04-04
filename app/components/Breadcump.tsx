'use client';
import Link from 'next/link';
import React from 'react';

const Breadcump: React.FC = () => {
    return (
        <div className="flex items-center space-x-2 px-10 text-sm my-4">
            <div>
                <Link href={'/'}>Dashboard</Link>
            </div>
            <div>-</div>
            <div>
                <Link href={'/products'} className="font-bold">
                    Products
                </Link>
            </div>
        </div>
    );
};

export default Breadcump;
