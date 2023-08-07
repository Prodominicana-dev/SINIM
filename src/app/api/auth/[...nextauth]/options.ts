import type { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import { CredentialsProvider } from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";

export const options: NextAuthOptions = {
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn(user) {
      return "/dashboard";
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
};
