import '@/app/globals.css';
import Header from '@/app/components/Header';
import { getInfoUser } from '@/libs/auth';

export default function HomeLayout({ children, infoUser }: { children: React.ReactNode; infoUser: any }) {
    const info = getInfoUser();
    return (
        <div className="flex bg-bgMain w-screen h-screen overflow-hidden">
            <div className="w-full h-full overflow-y-auto">
                <Header infoUser={info || infoUser || null} />
                <main>{children}</main>
            </div>
        </div>
    );
}
