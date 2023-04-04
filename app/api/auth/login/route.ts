import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { object, string } from 'yup';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password } = await request.json();
    let userSchema = object().shape({
        password: string().required('Password is required.'),
        email: string().required('Email is required.').email('Email is not valid.'),
    });

    try {
        await userSchema.validate({ email, password }, { abortEarly: false, context: { value: 'GR' } });
    } catch (error: any) {
        const schemaErrors: any = {};
        error.inner?.map((error: any) => {
            schemaErrors[error.path] = error.message;
        });
        return NextResponse.json({ errors: schemaErrors }, { status: 400 });
    }

    try {
        // throw new Error('Internal Server Error!');
        const user: any = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!(user && bcrypt.compareSync(password, user.password))) {
            return NextResponse.json({ errors: { email: 'Username or password is incorrect!' } }, { status: 400 });
        }

        let resUser = { id: user.id, name: user.name, email: user.email, role: user.role };

        const token = jwt.sign(resUser, process.env.COOKIE_SECRET as string, { expiresIn: 24 * 60 * 60 });
        const response = NextResponse.json({ message: 'Login successfully!', token }, { status: 200 });
        response.cookies.set('token', token, { maxAge: 24 * 60 * 60 });

        return response;
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
