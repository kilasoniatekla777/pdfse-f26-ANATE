import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Card } from "@/ui";

/** Placeholder home. Sprint 1 is one salon's page; discovery is on the cut list (03-build/mvp-boundary.md). */
export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex max-w-(--size-content-max) flex-col gap-6 px-(--space-page-mobile) py-(--space-section-mobile)">
      <h1 className="type-display-xl text-ink-900">IERI</h1>
      <p className="type-body text-ink-700">{t("tagline")}</p>
      <Card className="flex flex-col gap-3 p-(--space-card-mobile)">
        <Link href="/s/test-salon?src=link" className="type-nav text-clay-600">
          {t("testSalon")} →
        </Link>
      </Card>
      <div className="flex gap-3">
        {routing.locales.map((locale) => (
          <Link
            key={locale}
            href="/"
            locale={locale}
            className="type-nav rounded-pill border border-border-strong px-4 py-2 text-ink-600"
          >
            {locale === "ka" ? "ქარ" : "EN"}
          </Link>
        ))}
      </div>
    </main>
  );
}
