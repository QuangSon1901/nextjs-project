import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getInfoUser = () => {
    const cookieStore = cookies();
    const token: any = cookieStore.get('token')?.value;
    if (!token) false;
    try {
        const decoded: any = jwt.verify(token, process.env.COOKIE_SECRET as any);
        return { id: decoded.id, name: decoded?.name, email: decoded.email };
    } catch (error) {
        return false;
    }
};
