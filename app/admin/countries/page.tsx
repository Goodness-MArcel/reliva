// app/admin/countries/page.tsx
import Link from "next/link";
import { getAllCountries } from "@/lib/countries";
import { Globe, Plus, ArrowRight } from "lucide-react";

export default async function AdminCountriesPage() {
  const countries = await getAllCountries();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Countries Directory</h1>
          <p className="text-sm text-charcoal/70">
            View and edit immigration destinations and their associated visa pathways.
          </p>
        </div>

        {/* Later you can wire this to a create country modal or form page */}
        <button
          type="button"
          onClick={() => alert("Country creation form coming up next!")}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold/90 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add New Country
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-navy/10 bg-navy/5 text-xs font-semibold text-navy">
              <th className="p-4 pl-6">Country</th>
              <th className="p-4">Region</th>
              <th className="p-4">Capital</th>
              <th className="p-4">Pathways</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5 text-sm">
            {countries.map((country) => (
              <tr key={country.id} className="transition-colors hover:bg-ivory/50">
                <td className="p-4 pl-6 font-medium text-navy flex items-center gap-3">
                  <span className="text-2xl">{country.flagEmoji}</span>
                  <div>
                    <p className="font-bold">{country.name}</p>
                    <p className="text-xs text-charcoal/50">Code: {country.code}</p>
                  </div>
                </td>
                <td className="p-4 text-charcoal/80">{country.region}</td>
                <td className="p-4 text-charcoal/80">{country.capital}</td>
                <td className="p-4">
                  <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-navy">
                    {country.pathways.length} active
                  </span>
                </td>
                <td className="p-4 pr-6 text-right">
                  <Link
                    href={`/countries/${country.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-gold transition-colors"
                  >
                    Preview
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}