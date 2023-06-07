import '@/app/globals.css';
import ToastProvider from '@/app/components/ToastProvider';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.js';
import ToastContainer from '../components/ToastContainer';
import 'react-markdown-editor-lite/lib/index.css';
import ReduxProvider from '../components/ReduxProvider';
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="">
            <body>
                <ReduxProvider>
                    <ToastProvider>{children}</ToastProvider>
                </ReduxProvider>
                <ToastContainer />
            </body>
        </html>
    );
}
