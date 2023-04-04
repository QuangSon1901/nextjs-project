import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request): Promise<Response> {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ categories });
}
