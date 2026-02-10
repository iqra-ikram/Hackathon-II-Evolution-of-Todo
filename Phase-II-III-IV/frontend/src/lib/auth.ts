import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

console.log("Initializing Better Auth...");
console.log("DB URL exists:", !!process.env.DATABASE_URL);
console.log("Secret exists:", !!process.env.BETTER_AUTH_SECRET);

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    // session: {
    //     strategy: "jwt",
    // },
    plugins: [
        nextCookies(),
    ]
});
