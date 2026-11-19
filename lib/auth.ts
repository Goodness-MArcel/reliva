import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      passport: {
        type: "string",
        required: true,
        defaultValue: "Nigeria",
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // Prevents users from setting themselves as admin on signup/update
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60, // Cache for 10 minutes (in seconds)
    },
  },
});