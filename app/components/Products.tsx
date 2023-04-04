'use client';

import { useEffect, useState } from 'react';
import ActionProduct from './ActionProduct';

interface Brand {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    content: string;
    Brand: Brand;
    Category: Category;
    price: number;
}

interface ModalState {
    isActive: boolean;
    product: Product | null;
}

export const getProducts = async (skip: number, take: number) => {
    const res = await fetch(`/api/products?skip=${skip}&take=${take}`);

    if (!res.ok) {
        console.log(res);
    }

    return res.json();
};

export const addProducts = async (formData: {
    title: string;
    description: string;
    content: string;
    brandID: number;
    categoryID: number;
    price: number;
}): Promise<any> => {
    const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const editProducts = async (formData: {
    title: string;
    description: string;
    content: string;
    brandID: number;
    categoryID: number;
    price: number;
    id: number;
}): Promise<any> => {
    const res = await fetch('/api/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const deleteProducts = async (id: number): Promise<any> => {
    const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const searchProducts = async (query: string): Promise<any> => {
    const res = await fetch(`/api/products?query=${query}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

const Products: React.FC = () => {
    const [modalActive, setModalActive] = useState<ModalState>({ isActive: false, product: null });
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const fetchProducts = await getProducts(0, 5);

            setProducts(fetchProducts.products);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            const fetchData = async () => {
                const fetchProducts = await getProducts(0, 5);
                setProducts(fetchProducts.products);
            };

            fetchData();
            return;
        }

        const fetchData = async () => {
            const fetchProducts = await searchProducts(search.toLowerCase());
            setProducts(fetchProducts.products);
        };
        fetchData();
    }, [search]);

    const handleLoadMore = async () => {
        const fetchProducts = await getProducts(products.length, 5);
        setProducts([...products, ...fetchProducts.products]);
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const handleDeleteProduct = async (id: any) => {
        const deleted = await deleteProducts(id);
        if (deleted) setProducts(deleted.products);
    };

    return (
        <div>
            <div
                className="mt-4 bg-white py-4 rounded-lg"
                style={{ boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)' }}
            >
                <div className="px-6 flex justify-between items-center pb-4">
                    <button
                        className="bg-primary-600 rounded-md py-2 px-4 text-white"
                        onClick={() => setModalActive({ ...modalActive, isActive: true })}
                    >
                        Add Product
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product name"
                            className="outline-none pr-4 pl-10 py-2 border border-borderColor rounded-md focus:border-primary"
                        />
                    </div>
                </div>
                <div>
                    <div className="px-6 py-4 font-bold flex gap-8">
                        <div className="w-2/12 text-[#666]"># Name</div>
                        <div className="w-2/12 text-[#666]"># Brand</div>
                        <div className="w-2/12 text-[#666]"># Price</div>
                        <div className="w-4/12 text-[#666]"># Description</div>
                        <div className="w-2/12 text-[#666] text-center"># Actions</div>
                    </div>
                    {products.map((product: Product, index: number) => (
                        <div key={index} className="px-6 py-4 border-t border-borderColor flex gap-8">
                            <div
                                className="w-2/12 flex flex-col justify-center cursor-pointer"
                                onClick={() => setModalActive({ ...modalActive, isActive: true, product: product })}
                            >
                                <span>
                                    <b>{product.title}</b>
                                </span>
                                <span className="flex text-[#666]">
                                    Category: <span className="font-medium ml-1">{product.Category.name}</span>
                                </span>
                            </div>
                            <div className="w-2/12 flex items-center">{product.Brand.name}</div>
                            <div className="w-2/12 flex items-center">{formatter.format(product.price)}</div>
                            <div className="w-4/12 flex items-center">{product.description}</div>
                            <div className="w-2/12 flex items-center text-center justify-center">
                                <button
                                    className="w-16 h-8 rounded-full bg-red-600"
                                    onClick={() => handleDeleteProduct(product.id)}
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
            <div className="flex justify-center items-center my-10">
                <button className="bg-primary-600 rounded-md py-2 px-4 text-white" onClick={handleLoadMore}>
                    Load More
                </button>
            </div>
            {modalActive.isActive && (
                <ActionProduct
                    close={() => setModalActive({ isActive: false, product: null })}
                    product={modalActive.product}
                    setProducts={setProducts}
                />
            )}
        </div>
    );
};

export default Products;
