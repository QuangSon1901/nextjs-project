import Sidebar from '@/app/components/Sidebar';
import '@/app/globals.css';
import Header from '@/app/components/Header';
import Breadcump from '@/app/components/Breadcump';
import { getInfoUser } from '@/libs/auth';

export default function DashboardLayout({ children, infoUser }: { children: React.ReactNode; infoUser: any }) {
    const info = getInfoUser();
    return (
        <div className="flex bg-bgMain w-screen h-screen overflow-hidden">
            <div className="w-2/12">
                <Sidebar />
            </div>
            <div className="w-10/12 h-full overflow-y-auto">
                <Header infoUser={info || infoUser || null} />
                <Breadcump />
                <main>{children}</main>
            </div>
        </div>
    );
}
