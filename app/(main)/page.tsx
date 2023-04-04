import HomeLayout from '@/app/components/HomeLayout';
import getCurrentUser from '@/libs/getCurrentUser';

export const metadata: { title: string } = {
    title: 'Dev IT',
};

export default async function Page() {
    const user = await getCurrentUser();

    return (
        <HomeLayout infoUser={user}>
            <section className="px-10 mt-4 text-xl font-bold text-center">Welcome to Dev IT</section>;
        </HomeLayout>
    );
}
