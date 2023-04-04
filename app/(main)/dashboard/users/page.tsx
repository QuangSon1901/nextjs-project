import Users from '@/app/components/Users';

export const metadata: { title: string } = {
    title: 'User | Dev IT',
};

export default async function Page() {
    return (
        <section className="px-10 mt-4">
            <header>
                <div className="flex space-x-4 items-center">
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <span>Tables display sets of data. They can be fully customized</span>
            </header>
            <Users />
        </section>
    );
}
