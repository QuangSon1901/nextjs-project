'use client';
import { useDispatch } from 'react-redux';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsCartPlus } from 'react-icons/bs';
import Link from 'next/link';
import cartSlice from '@/redux/slice/cartSlice';

export default function Products() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products?skip=4&take=4`);
            if (!res.ok) return;
            setProducts((await res.json()).products);
        };
        fetchProduct();
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleAddProductToCart = (e: any, product: any) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(cartSlice.actions.addProducts({ product, quantity: 1 }));
    };
    return (
        <section className="p-10 text-center">
            <header className="mb-10">
                <h1 className="text-xl">Products</h1>
            </header>
            <div>
                <ul className="grid grid-cols-4 gap-8">
                    {products &&
                        products.length > 0 &&
                        products.map((product: any) => (
                            <li key={product.id}>
                                <Link href={`products/${product.id}`}>
                                    <div className="relative group ">
                                        <Image
                                            src={`/images/${product.image}`}
                                            width={400}
                                            height={200}
                                            className="rounded-md cursor-pointer "
                                            alt={''}
                                        />
                                        <div
                                            className="opacity-0 transition-all group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-400 p-2 rounded-full cursor-pointer"
                                            onClick={(e) => handleAddProductToCart(e, product)}
                                        >
                                            <BsCartPlus className="w-7 h-7  text-white" />
                                        </div>
                                    </div>
                                    <h1 className="py-2">{product.title}</h1>
                                    <span className="py-2">{formatter.format(product.price)}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}
