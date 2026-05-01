export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  url: string;
  source: "Local" | "Reed" | "Adzuna" | "CV-Library";
  postedDate?: string;
  description?: string;
}

// In production, you would typically use a server-side proxy or a dedicated middleware.
// For Lovable/Vite, we can use a public CORS proxy as a fallback if the builtin one isn't configured for all domains.
const PROXY_URL = "https://api.allorigins.win/raw?url=";

function proxy(url: string): string {
  return `${PROXY_URL}${encodeURIComponent(url)}`;
}

export async function fetchReedJobs(query: string): Promise<Job[]> {
  try {
    const url = `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(query)}&location=Staffordshire`;
    const response = await fetch(proxy(url));
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).map((j: any) => ({
      id: `reed-${j.jobId}`,
      title: j.jobTitle,
      company: j.employerName,
      location: j.locationName,
      salary: j.minimumSalary ? `£${j.minimumSalary} - £${j.maximumSalary}` : "Competitive",
      type: j.contractType || "Permanent",
      url: j.jobUrl,
      source: "Reed",
      postedDate: j.date,
      description: j.jobDescription,
    }));
  } catch (e) {
    console.error("Error fetching Reed jobs:", e);
    return [];
  }
}

export async function fetchAdzunaJobs(query: string): Promise<Job[]> {
  try {
    const appId = "66f3680a";
    const appKey = "68c9e5e783407981358999909249052b";
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(query)}&where=Staffordshire`;
    const response = await fetch(proxy(url));
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).map((j: any) => ({
      id: `adzuna-${j.id}`,
      title: j.title,
      company: j.company.display_name,
      location: j.location.display_name,
      salary: j.salary_min ? `£${Math.round(j.salary_min)} - £${Math.round(j.salary_max)}` : "Competitive",
      type: j.contract_type || "Permanent",
      url: j.redirect_url,
      source: "Adzuna",
      postedDate: j.created,
      description: j.description,
    }));
  } catch (e) {
    console.error("Error fetching Adzuna jobs:", e);
    return [];
  }
}

export async function fetchCVLibraryJobs(query: string): Promise<Job[]> {
  try {
    const url = `https://www.cv-library.co.uk/cgi-bin/rss.xml?q=${encodeURIComponent(query)}&l=Staffordshire`;
    const response = await fetch(proxy(url));
    if (!response.ok) return [];
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = Array.from(xml.querySelectorAll("item"));

    return items.map((item) => {
      const title = item.querySelector("title")?.textContent || "";
      const [jobTitle, rest] = title.split(" at ");
      const [company, location] = (rest || "").split(" in ");

      return {
        id: `cvl-${item.querySelector("guid")?.textContent || Math.random()}`,
        title: jobTitle || title,
        company: company || "Unknown",
        location: location || "Staffordshire",
        salary: "See website",
        type: "Permanent",
        url: item.querySelector("link")?.textContent || "",
        source: "CV-Library",
        postedDate: item.querySelector("pubDate")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
      };
    });
  } catch (e) {
    console.error("Error fetching CV-Library jobs:", e);
    return [];
  }
}

export async function fetchAllJobs(query: string, sources: string[]): Promise<Job[]> {
  const promises: Promise<Job[]>[] = [];
  if (sources.includes("Reed")) promises.push(fetchReedJobs(query));
  if (sources.includes("Adzuna")) promises.push(fetchAdzunaJobs(query));
  if (sources.includes("CV-Library")) promises.push(fetchCVLibraryJobs(query));

  const results = await Promise.all(promises);
  return results.flat().sort((a, b) => {
    const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
    const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
    return dateB - dateA;
  });
}
