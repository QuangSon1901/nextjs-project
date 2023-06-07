'use client';

import { BiShoppingBag } from 'react-icons/bi';
import CartModal from './CartModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '@/redux/selector';

export default function Cart() {
    const [cartModal, setCartModal] = useState(false);
    const cart = useSelector(cartSelector);

    return (
        <>
            <div className="relative" onClick={() => setCartModal(!cartModal)}>
                <BiShoppingBag className="w-7 h-7 cursor-pointer" />
                <span className="absolute top-0 right-0 rounded-full w-4 h-4 text-white bg-red-500 text-xs text-center">
                    {cart.quantity}
                </span>
            </div>
            <CartModal isOpen={cartModal} onClose={() => setCartModal(false)} products={cart.products} />
        </>
    );
}
