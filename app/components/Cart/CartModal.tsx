'use client';
import { useDispatch } from 'react-redux';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import cartSlice from '@/redux/slice/cartSlice';

export default function CartModal({ isOpen, onClose, products }: any) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    useEffect(() => {
        const calc = products.reduce((total: any, curr: any) => (total += curr.quantity * Number(curr.price)), 0);

        setTotal(calc);
    }, [products]);

    const handleDeleteProduct = (id: any) => {
        dispatch(cartSlice.actions.removeProduct(id));
    };

    const handleIncrease = (id: any) => {
        dispatch(cartSlice.actions.cartItemIncrease(id));
    };

    const handleDecrease = (id: any) => {
        dispatch(cartSlice.actions.cartItemDecrease(id));
    };
    return (
        <div>
            <div
                className={`fixed inset-0 z-10 w-full h-full bg-overlay transition-all ${
                    isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                } `}
                onClick={onClose}
            ></div>
            <div
                className={`fixed w-1/4 h-screen top-0 bg-bgMain z-30 px-8 flex flex-col justify-between transition-all ${
                    isOpen ? 'right-0' : '-right-full'
                }`}
            >
                <header className="h-header w-full flex items-center justify-between ">
                    <h1>Cart</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={onClose}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </header>
                <hr />
                <div className="flex-1">
                    <ul>
                        {products &&
                            products.length > 0 &&
                            products.map((product: any) => (
                                <li className="flex my-4" key={product.id}>
                                    <Image
                                        src={`/images/${product.image}`}
                                        width={100}
                                        height={50}
                                        className="rounded-md"
                                        alt={''}
                                    />
                                    <div className="w-full flex items-center justify-between px-2">
                                        <div className="flex flex-col justify-between">
                                            <h2>{product.title}</h2>
                                            <span>{formatter.format(product.price)}</span>
                                            <button
                                                className="bg-transparent border-none text-left text-red-600"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                remove
                                            </button>
                                        </div>
                                        <div className="flex flex-col justify-between items-center">
                                            <MdKeyboardArrowUp
                                                className="w-6 h-6 text-red-800 cursor-pointer"
                                                onClick={() => handleIncrease(product.id)}
                                            />
                                            <span>{product.quantity}</span>
                                            <MdKeyboardArrowDown
                                                className="w-6 h-6 text-red-800 cursor-pointer"
                                                onClick={() => handleDecrease(product.id)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
                <hr />
                <footer className="py-2 ">
                    <div className="flex justify-between mb-2">
                        <strong>
                            <b>Total:</b>
                        </strong>
                        <strong>
                            <b>{formatter.format(total)}</b>
                        </strong>
                    </div>
                    <button type="button" className="bg-primary-600 rounded-md text-white py-2 w-full mb-4">
                        Checkout
                    </button>
                </footer>
            </div>
        </div>
    );
}
