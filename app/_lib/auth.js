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

import { NextAuth } from "@auth/nextjs";

import Google from "@auth/core/providers/google";

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

export const { auth, handlers } = NextAuth(authConfig);
console.log("handlers: ", handlers)
export const { GET, POST } = handlers;

