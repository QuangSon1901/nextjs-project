'use client';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingBlock from './LoadingBlock';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import toast, { Toaster } from 'react-hot-toast';
import routerConfig from '@/router/router';
import Link from 'next/link';
interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleRegister = async (formData: RegisterForm, setErrors: any) => {
        setLoading(true);
        Loading.circle({ svgColor: '#2563EB' });
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const { errors } = await res.json();

        if (!res.ok && errors) {
            setErrors(errors);
            setLoading(false);
            Loading.remove();
            return;
        }

        if (!res.ok && !errors) {
            toast.error(res.statusText);
            setLoading(false);
            Loading.remove();
            return;
        }
        router.push(routerConfig.home);
        setLoading(false);
        Loading.remove();
    };
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                onSubmit={(values, { setErrors }) => {
                    handleRegister(values, setErrors);
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required').min(2, 'Full Name minimum 2 characters'),
                    email: Yup.string().required('Email is required.').email('Email is not valid.'),
                    password: Yup.string().required('Password is required.').min(6, 'Password minimum 6 characters'),
                })}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }: {
                        values: any;
                        touched: any;
                        errors: any;
                        handleChange: any;
                        handleBlur: any;
                        handleSubmit: any;
                    } = props;
                    return (
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                        errors.name && touched.name ? 'border-red-500' : ''
                                    }`}
                                    placeholder="name@company.com"
                                />
                                {errors.name && touched.name && (
                                    <div className="text-red-500 text-sm">{errors.name}</div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                        errors.email && touched.email ? 'border-red-500' : ''
                                    }`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={values.password}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                                        errors.password && touched.password ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {loading ? <LoadingBlock className="" width={20} height={20} /> : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    );
                }}
            </Formik>
            <Toaster />
        </div>
    );
}
