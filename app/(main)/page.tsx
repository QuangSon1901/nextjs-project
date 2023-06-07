import HomeLayout from '@/app/components/HomeLayout';
import getCurrentUser from '@/libs/getCurrentUser';
import Products from '../components/Customer/Products';

export const metadata: { title: string } = {
    title: 'Dev IT',
};

export default async function Page() {
    const user = await getCurrentUser();

    return (
        <HomeLayout infoUser={user}>
            <Products />
        </HomeLayout>
    );
}
