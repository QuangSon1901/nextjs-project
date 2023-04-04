import DashboardLayout from '@/app/components/DashboardLayout';
import getCurrentUser from '@/libs/getCurrentUser';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    return <DashboardLayout infoUser={user}>{children}</DashboardLayout>;
}
