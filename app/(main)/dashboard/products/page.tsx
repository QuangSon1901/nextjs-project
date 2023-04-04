import Products from '@/app/components/Products';

export const metadata: { title: string } = {
    title: 'Products | Dev IT',
};

export default async function Page() {
    return (
        <section className="px-10 mt-4">
            <header>
                <div className="flex space-x-4 items-center">
                    <h1 className="text-2xl font-bold">Products</h1>
                </div>
                <span>Tables display sets of data. They can be fully customized</span>
            </header>
            <Products />
        </section>
    );
}
