import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/config/site";

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  url: manualUrl,
  type = "website",
  noIndex = false,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const location = useLocation();
  const fullUrl = manualUrl ? `${SITE_URL}${manualUrl}` : `${SITE_URL}${location.pathname}${location.search}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-6 overflow-x-auto no-scrollbar py-1">
      <ol className="flex items-center space-x-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
        <li className="flex items-center">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
            {item.path ? (
              <Link to={item.path} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Seo;
