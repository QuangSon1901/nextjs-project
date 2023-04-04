import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true, deleted: true, createdAt: true },
        orderBy: {
            createdAt: 'desc',
        },
        take: 10,
    });
    return NextResponse.json({ users });
}
