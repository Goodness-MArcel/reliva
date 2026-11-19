import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==========================================
// 1. BETTER AUTH & USER TABLES
// ==========================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  passport: text("passport").notNull().default("Nigeria"), // Custom field for Reliva!
  role: text("role").notNull().default("user"), // "user" | "admin" for Admin Panel access
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ==========================================
// 2. RELIVA COUNTRIES & PATHWAYS TABLES
// ==========================================

export const countries = pgTable("countries", {
  id: text("id").primaryKey(), // e.g., "ca"
  slug: text("slug").notNull().unique(), // e.g., "canada"
  name: text("name").notNull(),
  code: text("code").notNull(), // e.g., "CA"
  flagEmoji: text("flag_emoji").notNull(),
  region: text("region").notNull(),
  capital: text("capital").notNull(),
  currency: jsonb("currency")
    .$type<{ code: string; symbol: string }>()
    .notNull(),
  languages: jsonb("languages").$type<string[]>().notNull(),
  tagline: text("tagline").notNull(),
  overview: text("overview").notNull(),
  highlights: jsonb("highlights")
    .$type<{
      avgProcessingTime: string;
      postStudyWork: string;
      prTimeline: string;
    }>()
    .notNull(),
  officialImmigrationPortal: text("official_immigration_portal").notNull(),
  lastVerified: timestamp("last_verified").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const visaPathways = pgTable("visa_pathways", {
  id: text("id").primaryKey(), // e.g., "ca-study-permit"
  countryId: text("country_id")
    .notNull()
    .references(() => countries.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(), // e.g., "study-permit"
  title: text("title").notNull(),
  category: text("category").notNull(), // "Study" | "Work" | "Permanent Residency" | "Job Seeker"
  summary: text("summary").notNull(),
  processingTime: text("processing_time").notNull(),
  applicationFee: text("application_fee").notNull(),
  duration: text("duration").notNull(),
  prEligible: boolean("pr_eligible").notNull().default(false),
  requirements: jsonb("requirements").$type<string[]>().notNull(),
  documents: jsonb("documents").$type<string[]>().notNull(),
  steps: jsonb("steps")
    .$type<{ step: number; title: string; description: string }[]>()
    .notNull(),
  officialUrl: text("official_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Junction table for user's middleware-protected Saved Countries page
export const savedCountries = pgTable(
  "saved_countries",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    countryId: text("country_id")
      .notNull()
      .references(() => countries.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.countryId] })]
);

// ==========================================
// 3. DRIZZLE RELATIONS (For Nested Queries)
// ==========================================

export const userRelations = relations(user, ({ many }) => ({
  savedCountries: many(savedCountries),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  pathways: many(visaPathways),
  savedBy: many(savedCountries),
}));

export const visaPathwaysRelations = relations(visaPathways, ({ one }) => ({
  country: one(countries, {
    fields: [visaPathways.countryId],
    references: [countries.id],
  }),
}));

export const savedCountriesRelations = relations(savedCountries, ({ one }) => ({
  user: one(user, {
    fields: [savedCountries.userId],
    references: [user.id],
  }),
  country: one(countries, {
    fields: [savedCountries.countryId],
    references: [countries.id],
  }),
}));