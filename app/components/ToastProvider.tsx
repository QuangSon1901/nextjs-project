'use client';

import { ToastContainer } from 'react-toastify';

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <ToastContainer />
        </div>
    );
}
