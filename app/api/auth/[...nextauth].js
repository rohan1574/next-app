import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Ensure this path is correct
    error: '/auth/error',   // Optional: Custom error page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Add custom sign-in logic if needed
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  // Additional NextAuth.js options
});
