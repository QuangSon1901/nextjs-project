import HomeLayout from '@/app/components/HomeLayout';
import getCurrentUser from '@/libs/getCurrentUser';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    return <HomeLayout infoUser={user}>{children}</HomeLayout>;
}
