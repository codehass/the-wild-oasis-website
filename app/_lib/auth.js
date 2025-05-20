// import NextAuth from "next-auth";
// // import GoogleProvider from "next-auth/providers/google";
// import Google from "next-auth/providers/google";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET
//     })
//   ]
// }

// export const { auth, handlers: { GET, POST }, } = NextAuth(authConfig);

// import { NextAuth } from "@auth/nextjs";

// import Google from "@auth/core/providers/google";

// const authConfig = {
//   trustHost: true,
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
// };

// export const { auth, handlers } = NextAuth(authConfig);
// console.log("handlers: ", handlers)
// export const { GET, POST } = handlers;

// app/auth.js
// import Google from "@auth/core/providers/google";
// import { NextAuth } from "@auth/nextjs";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut
// } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET
//     })
//   ],
//   secret: process.env.AUTH_SECRET,
//   trustHost: true // Required for Vercel/localhost
// });

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    //   async signIn({ user, account, profile }) {
    //     try {
    //       const existingGuest = await getGuest(user.email);

    //       if (!existingGuest)
    //         await createGuest({ email: user.email, fullName: user.name });

    //       return true;
    //     } catch {
    //       return false;
    //     }
    //   },
    //   async session({ session, user }) {
    //     const guest = await getGuest(session.user.email);
    //     session.user.guestId = guest.id;
    //     return session;
    //   },
    // },
    // pages: {
    //   signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);