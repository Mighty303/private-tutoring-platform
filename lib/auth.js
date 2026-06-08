import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getDb } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const sql = getDb();
        const role = user.email === process.env.ADMIN_EMAIL ? "admin" : "student";

        // Upsert user into database
        await sql`
          INSERT INTO users (google_id, email, name, image, role)
          VALUES (${account.providerAccountId}, ${user.email}, ${user.name}, ${user.image}, ${role})
          ON CONFLICT (google_id) DO UPDATE SET
            email = EXCLUDED.email,
            name = EXCLUDED.name,
            image = EXCLUDED.image
        `;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const sql = getDb();
        const rows = await sql`SELECT id, role FROM users WHERE email = ${user.email}`;
        if (rows.length > 0) {
          token.dbId = rows[0].id;
          token.role = rows[0].role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.dbId) {
        session.user.dbId = token.dbId;
      }
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
