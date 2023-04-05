import Test from '@/app/components/Test';
import fs from 'fs';
export const metadata: { title: string } = {
    title: 'Dashboard | Dev IT',
};

export default async function Page() {
    const files = fs.readdirSync('./public/images');

    return (
        <section className="px-10 mt-4">
            <Test />
        </section>
    );
}
