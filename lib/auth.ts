import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize() {
        // TODO: Implement proper authentication
        return { id: "1", email: "test@example.com" };
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
}; 