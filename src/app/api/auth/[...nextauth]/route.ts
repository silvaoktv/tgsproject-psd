import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handLer = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handLer as GET, handLer as POST }
