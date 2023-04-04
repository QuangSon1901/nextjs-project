import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/',
    },
    // debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async signIn({ user, account, profile, email, credentials }) {
            if (!user?.email) {
                return false;
            }

            const checkUser = await prisma.user.findUnique({
                where: {
                    email: user.email as string,
                },
            });

            if (checkUser) {
                return true;
            }

            let data = {
                name: user.name,
                email: user.email,
                image: user.image,
            };

            await prisma.user.create({
                data: data as any,
            });

            return true;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
