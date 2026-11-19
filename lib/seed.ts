// db/seed.ts
import "dotenv/config";
import { db } from "./db";
import { countries, visaPathways } from "./schema";
import starterData from "@/data/countries.json";

async function seed() {
  for (const country of starterData) {
    const { pathways, lastVerified, ...countryFields } = country;

    await db
      .insert(countries)
      .values({
        ...countryFields,
        lastVerified: new Date(lastVerified),
      })
      .onConflictDoNothing();

    for (const pathway of pathways) {
      await db
        .insert(visaPathways)
        .values({
          ...pathway,
          countryId: country.id,
        })
        .onConflictDoNothing();
    }
  }
  console.log("Seeded Reliva countries and pathways.");
}

seed().catch(console.error);