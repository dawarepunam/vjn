import { 
  COMPANY_CONTACT, 
  SERVICES_DATA, 
  CLIENTS_DATA, 
  WORK_SHOWCASE_ITEMS, 
  ServiceItem, 
  ClientItem, 
  ProjectWorkItem 
} from './companyData';

/**
 * STRAPI CMS CONNECTOR & FALLBACK SYSTEM
 * This client enables seamless connection to Strapi backend when STRAPI_API_URL is configured.
 * If Strapi is offline or unconfigured, it gracefully falls back to the typed brochure source of truth.
 */

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function fetchFromStrapi<T>(endpoint: string): Promise<T | null> {
  if (!STRAPI_BASE_URL) return null;
  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {})
      },
      next: { revalidate: 60 } // Next.js ISR revalidation
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.warn(`[Strapi Client] Connection to ${endpoint} failed, falling back to local brochure data.`, error);
    return null;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  const strapiData = await fetchFromStrapi<ServiceItem[]>('services?populate=*');
  if (strapiData && strapiData.length > 0) {
    return strapiData;
  }
  return Object.values(SERVICES_DATA);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const strapiData = await fetchFromStrapi<ServiceItem[]>(`services?filters[slug][$eq]=${slug}&populate=*`);
  if (strapiData && strapiData.length > 0) {
    return strapiData[0];
  }
  return SERVICES_DATA[slug];
}

export async function getClients(): Promise<ClientItem[]> {
  const strapiData = await fetchFromStrapi<ClientItem[]>('clients?populate=*');
  if (strapiData && strapiData.length > 0) {
    return strapiData;
  }
  return CLIENTS_DATA;
}

export async function getWorkProjects(): Promise<ProjectWorkItem[]> {
  const strapiData = await fetchFromStrapi<ProjectWorkItem[]>('projects?populate=*');
  if (strapiData && strapiData.length > 0) {
    return strapiData;
  }
  return WORK_SHOWCASE_ITEMS;
}

export async function getCompanyContact() {
  return COMPANY_CONTACT;
}
