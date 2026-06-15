import { useState, useCallback } from 'react';

/**
 * Hook for UK postcode lookup using Pathway Academy custom CORS proxy
 * 
 * Uses custom instructions API:
 * - CORS Proxy: https://cf-cors-air.pathway-group.workers.dev/api/?url=
 * - API URL: https://pathwaygroup.co.uk/dev/hubhook/hspics/src/postcodes/v2/api/asf?postcode=
 */

export interface PostcodeData {
  postcode: string;
  region?: string;
  local_authority?: string;
  local_area?: string;
  area_name?: string;
  latitude?: number;
  longitude?: number;
}

interface PostcodeResponse {
  status: number;
  effective: boolean;
  postcode?: string;
  whitelist?: {
    postcode: string;
    region: string;
    local_authority: string;
    local_area: string;
  };
  asf?: {
    postcode: string;
    area_name: string;
  };
  api_data?: {
    latitude: number;
    longitude: number;
  };
}

export function usePostcodeLookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (postcode: string): Promise<PostcodeData | null> => {
    if (!postcode || postcode.length < 5) {
      setError('Invalid postcode');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Normalize postcode (remove spaces, uppercase)
      const normalized = postcode.toUpperCase().replace(/\s+/g, '');

      // Use CORS proxy with API
      const corsProxy = 'https://cf-cors-air.pathway-group.workers.dev/api/?url=';
      const apiUrl = `https://pathwaygroup.co.uk/dev/hubhook/hspics/src/postcodes/v2/api/asf?postcode=${normalized}`;
      const fullUrl = `${corsProxy}${encodeURIComponent(apiUrl)}`;

      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: PostcodeResponse = await response.json();

      if (data.status !== 200 || !data.effective) {
        setError('Postcode not found or not available');
        return null;
      }

      // Extract location data
      const result: PostcodeData = {
        postcode: normalized,
        region: data.whitelist?.region || data.api_data?.latitude ? 'Found' : undefined,
        local_authority: data.whitelist?.local_authority,
        local_area: data.whitelist?.local_area,
        area_name: data.asf?.area_name,
        latitude: data.api_data?.latitude,
        longitude: data.api_data?.longitude,
      };

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to lookup postcode';
      setError(message);
      console.error('[Postcode Lookup] Error:', message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookup, loading, error };
}
