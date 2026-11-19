// lib/countries.ts
import { cacheTag } from "next/cache";
import { db } from "./db";
import { countries } from "./schema";
import { eq, ilike, or } from "drizzle-orm";

// 1. Fetch all countries with their pathways (used for admin overview & directory)
export async function getAllCountries() {
  "use cache";
  cacheTag("countries-list");

  return await db.query.countries.findMany({
    with: { pathways: true },
  });
}

// 2. Lightweight autocomplete suggestion
export async function getCountrySuggestions(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return await db
    .select({
      id: countries.id,
      name: countries.name,
      slug: countries.slug,
      flagEmoji: countries.flagEmoji,
      region: countries.region,
    })
    .from(countries)
    .where(
      or(
        ilike(countries.name, `%${trimmed}%`),
        ilike(countries.code, `%${trimmed}%`),
        ilike(countries.region, `%${trimmed}%`)
      )
    )
    .limit(6);
}

// 3. Main search directory
export async function searchCountries(query?: string) {
  "use cache";
  cacheTag("countries-list");

  const trimmed = query?.trim();

  if (!trimmed) {
    return await db.query.countries.findMany({
      with: { pathways: true },
    });
  }

  return await db.query.countries.findMany({
    where: or(
      ilike(countries.name, `%${trimmed}%`),
      ilike(countries.code, `%${trimmed}%`),
      ilike(countries.region, `%${trimmed}%`)
    ),
    with: { pathways: true },
  });
}

// 4. Individual country detail page
export async function getCountryWithPathways(slug: string) {
  "use cache";
  cacheTag("countries-list", `country-${slug.toLowerCase()}`);

  return await db.query.countries.findFirst({
    where: eq(countries.slug, slug.toLowerCase()),
    with: { pathways: true },
  });
}