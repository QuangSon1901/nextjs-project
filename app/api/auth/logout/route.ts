import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.has('token');
    const nextAuth = request.cookies.has('next-auth.session-token');
    if (token) {
        let response = NextResponse.json({ message: 'Logout successfully!' }, { status: 200 });
        response.cookies.delete('token');
        return response;
    }

    if (nextAuth) {
        let response = NextResponse.json({ message: 'Logout successfully!' }, { status: 200 });
        response.cookies.delete('next-auth.session-token');
        return response;
    }

    return NextResponse.json({ message: 'Not logged' }, { status: 403 });
}
