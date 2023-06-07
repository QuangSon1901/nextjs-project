'use client';

import Product from '@/app/components/Customer/Product';

export default function Page({ params }: { params: { pid: string } }) {
    return (
        <div>
            <Product pid={params.pid} />
        </div>
    );
}
