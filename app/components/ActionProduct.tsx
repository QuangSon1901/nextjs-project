'use client';
import React from 'react';
import { Formik } from 'formik';
import { addProducts, editProducts } from './Products';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Brand, Category } from '@prisma/client';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-hot-toast';
import MarkdownIt from 'markdown-it';
import FsEditor from '@/plugin/FsEditor';
// import FsEditor from '@/plugin/FsEditor';

MdEditor.use(FsEditor);

export const getBrands = async () => {
    const res = await fetch(`/api/brands`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const getCategorys = async () => {
    const res = await fetch(`/api/categories`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};
const mdParser = new MarkdownIt({ html: true });
const ActionProduct = ({ close, product, setProducts }: { close: any; product: any; setProducts: any }) => {
    const [selectList, setSelectList] = useState<{ brands: any; categories: any }>({ brands: [], categories: [] });
    useEffect(() => {
        const data = async () => {
            const fetchCategories = await getCategorys();
            const fetchBrands = await getBrands();
            setSelectList({ brands: fetchBrands.brands, categories: fetchCategories.categories });
        };
        data();
    }, []);

    return (
        <div className={`fixed inset-0 items-center justify-center bg-overlay flex`}>
            <Formik
                initialValues={{
                    title: product ? product.title : '',
                    brandID: product ? product.brandID : '',
                    price: product ? product.price : 0,
                    content: product ? product.content : '',
                    categoryID: product ? product.categoryID : '',
                    description: product ? product.description : '',
                }}
                onSubmit={(values) => {
                    if (product) {
                        const fetchEditProduct = async () => {
                            const res = await editProducts({
                                title: values.title,
                                price: values.price,
                                description: values.description,
                                content: values.content,
                                brandID: Number(values.brandID),
                                categoryID: Number(values.categoryID),
                                id: product.id,
                            });
                            if (res.status !== 200) {
                                toast.error('Internal Server Error!');
                                return;
                            }
                            toast.success('Add product success!');
                            setProducts(res.products);
                        };
                        fetchEditProduct();
                    } else {
                        const fetchAddProduct = async () => {
                            const res = await addProducts({
                                title: values.title,
                                price: values.price,
                                description: values.description,
                                content: values.content,
                                brandID: Number(values.brandID),
                                categoryID: Number(values.categoryID),
                            });

                            if (res.status !== 200) {
                                toast.error('Internal Server Error!');
                                return;
                            }
                            toast.success('Add product success!');
                            setProducts(res.products);
                        };
                        fetchAddProduct();
                    }
                    close();
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title is required!'),
                    brandID: Yup.string().required('Brand is required!'),
                    price: Yup.number().required('Price is required!'),
                    categoryID: Yup.string().required('Vategory is required!'),
                    description: Yup.string().required('Description is required!'),
                })}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        handleSubmit,
                    }: {
                        values: any;
                        touched: any;
                        errors: any;
                        handleChange: any;
                        handleBlur: any;
                        setFieldValue: any;
                        handleSubmit: any;
                    } = props;
                    return (
                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-md">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-bold ">{product ? 'Edit product' : 'Add new product'}</h1>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    onClick={close}
                                    className="w-6 h-6 cursor-pointer"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex gap-8">
                                <div className="flex flex-col gap-6 my-8">
                                    <label htmlFor="title">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Title :
                                        </div>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Enter the title"
                                            value={values.title}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={`w-[300px] h-10 px-4 outline-none border border-borderColor rounded-md ${
                                                errors.title && touched.title ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {errors.title && touched.title && (
                                            <div className="text-red-500">{errors.title}</div>
                                        )}
                                    </label>
                                    <label htmlFor="brand">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Brand :
                                        </div>
                                        <select
                                            name="brandID"
                                            value={values.brandID}
                                            onChange={handleChange}
                                            className={`w-[300px] h-10 px-4 outline-none border border-borderColor rounded-md ${
                                                errors.brandID && touched.brandID ? 'border-red-500' : ''
                                            }`}
                                        >
                                            <option value="0" label="Select a brand">
                                                Select a brand
                                            </option>
                                            {selectList.brands &&
                                                selectList.brands.length > 0 &&
                                                selectList.brands.map((brand: Brand, index: any) => (
                                                    <option key={index} value={brand.id} label={brand.name}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.brandID && touched.brandID && (
                                            <div className="text-red-500">{errors.brandID}</div>
                                        )}
                                    </label>
                                    <label htmlFor="price">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Price :
                                        </div>
                                        <input
                                            id="price"
                                            type="number"
                                            name="price"
                                            placeholder="Enter the price"
                                            value={values.price}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={`w-[300px] h-10 px-4 outline-none border border-borderColor rounded-md ${
                                                errors.price && touched.price ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {errors.price && touched.price && (
                                            <div className="text-red-500">{errors.price}</div>
                                        )}
                                    </label>
                                    <label htmlFor="category">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Category :
                                        </div>
                                        <select
                                            name="categoryID"
                                            onChange={handleChange}
                                            value={values.categoryID}
                                            className={`w-[300px] h-10 px-4 outline-none border border-borderColor rounded-md ${
                                                errors.categoryID && touched.categoryID ? 'border-red-500' : ''
                                            }`}
                                        >
                                            <option value="" label="Select a category">
                                                Select a category
                                            </option>
                                            {selectList.categories &&
                                                selectList.categories.length > 0 &&
                                                selectList.categories.map((category: Category, index: any) => (
                                                    <option key={index} value={category.id} label={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {errors.categoryID && touched.categoryID && (
                                            <div className="text-red-500">{errors.categoryID}</div>
                                        )}
                                    </label>
                                    <label htmlFor="description">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Description :
                                        </div>
                                        <input
                                            id="description"
                                            type="text"
                                            name="description"
                                            placeholder="Enter the description"
                                            value={values.description}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            className={`w-[300px] h-10 px-4 outline-none border border-borderColor rounded-md ${
                                                errors.description && touched.description ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {errors.description && touched.description && (
                                            <div className="text-red-500">{errors.description}</div>
                                        )}
                                    </label>
                                    <button type="submit" className="bg-primary-600 rounded-md text-white py-2">
                                        {product ? 'Edit product' : 'Add product'}
                                    </button>
                                </div>
                                <div className="flex flex-col gap-6 my-8">
                                    <label htmlFor="content" className="h-full">
                                        <div className="relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                            Content :
                                        </div>
                                        <div className="flex gap-8 h-full">
                                            <MdEditor
                                                className="w-[1000px] h-full max-h-[500px]  px-4 outline-none border border-borderColor rounded-md"
                                                defaultValue={values.content}
                                                renderHTML={(text) => mdParser.render(text)}
                                                onChange={({ html, text }) => setFieldValue('content', text)}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ActionProduct;
