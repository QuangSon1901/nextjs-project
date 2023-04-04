import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { object, string } from 'yup';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    let userSchema = object().shape({
        password: string().required('Password is required.').min(6, 'Password minimum 6 characters'),
        email: string().required('Email is required.').email('Email is not valid.'),
        name: string().required('Name is required').min(2, 'Full Name minimum 2 characters'),
    });

    try {
        await userSchema.validate({ name, email, password }, { abortEarly: false, context: { value: 'GR' } });
    } catch (error: any) {
        const schemaErrors: any = {};
        error.inner?.map((error: any) => {
            schemaErrors[error.path] = error.message;
        });
        return NextResponse.json({ errors: schemaErrors }, { status: 400 });
    }

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (checkUser) {
            return NextResponse.json({ errors: { email: 'This email already exists!' } }, { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: { name, email, password: bcrypt.hashSync(password, 10) },
        });

        if (!newUser) throw new Error('Internal Server Error!');

        let resUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };

        const token = jwt.sign(resUser, process.env.COOKIE_SECRET as string, { expiresIn: '24h' });
        const response = NextResponse.json(
            { message: 'Resgiter successfully!', token },
            {
                status: 200,
            },
        );
        response.cookies.set('token', token, { maxAge: 24 * 60 * 60 });

        return response;
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
