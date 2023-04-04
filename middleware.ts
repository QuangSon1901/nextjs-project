import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import routerConfig from './router/router';
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from './libs/constance';

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;

    if (path.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(process.env.API_URL + routerConfig.login);
        }
        try {
            const verifyToken = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
            if (verifyToken.payload.role === 'CUSTOMER') {
                return NextResponse.redirect(process.env.API_URL + routerConfig.home);
            }

            switch (true) {
                case path.startsWith('/dashboard/user'):
                    if (verifyToken.payload.role !== 'ADMIN') {
                        return NextResponse.redirect(process.env.API_URL + routerConfig.home);
                    }
                default:
                    return NextResponse.next();
            }
        } catch (err) {
            return NextResponse.redirect(process.env.API_URL + routerConfig.login);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
