import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query: string | null = searchParams.get('query');
    const take: string | null = searchParams.get('take');
    const skip: string | null = searchParams.get('skip');
    if (query) {
        const search = await prisma.product.findMany({
            where: {
                title: { search: query } as any,
                description: { search: query } as any,
            },
            skip: Number(skip),
            take: Number(take),
        });
        return NextResponse.json({ products: search, status: 200 }, { status: 200 });
    }
    const products = await prisma.product.findMany({
        include: {
            Brand: true,
            Category: true,
        },
        skip: Number(skip),
        take: Number(take),
    });

    return NextResponse.json({ products, status: 200 }, { status: 200 });
}

export async function POST(request: Request): Promise<Response> {
    const body = await request.json();
    const createProduct = await prisma.product.create({
        data: {
            ...body,
        },
    });

    if (createProduct) {
        const products = await prisma.product.findMany({
            include: {
                Brand: true,
                Category: true,
            },
            skip: Number(0),
            take: Number(5),
        });
        return NextResponse.json({ products, status: 200 }, { status: 200 });
    }
    return NextResponse.json({ status: 400 }, { status: 400 });
}

export async function PUT(request: Request): Promise<Response> {
    const { id, title, description, price, brandID, categoryID, content } = await request.json();
    const updateProduct = await prisma.product.update({
        where: { id },
        data: {
            title,
            description,
            price,
            brandID,
            categoryID,
            content,
        },
    });
    if (updateProduct) {
        const products = await prisma.product.findMany({
            include: {
                Brand: true,
                Category: true,
            },
            skip: Number(0),
            take: Number(5),
        });
        return NextResponse.json({ products, status: 200 }, { status: 200 });
    }
    return NextResponse.json({ status: 400 }, { status: 400 });
}

export async function DELETE(request: Request): Promise<Response> {
    const { id } = await request.json();
    const deleteProduct = await prisma.product.delete({
        where: { id },
    });
    if (deleteProduct) {
        const products = await prisma.product.findMany();
        return NextResponse.json({ products }, { status: 200 });
    }
    return NextResponse.json({}, { status: 400 });
}
