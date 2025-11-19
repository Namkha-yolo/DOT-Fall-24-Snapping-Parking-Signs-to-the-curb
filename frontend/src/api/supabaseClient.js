/**
 * Supabase client for querying parking signs data
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hagpdodzhbyvnuwdrbox.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ3Bkb2R6aGJ5dm51d2RyYm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MjM3MzMsImV4cCI6MjA3OTA5OTczM30.J0PMRB2kBxp2AOANPueAf6fbCIIL3jCviKWRd2gSuz8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Find parking signs within a radius of a location
 * @param {number} latitude - Center point latitude
 * @param {number} longitude - Center point longitude
 * @param {number} radiusMeters - Search radius in meters (default: 500m)
 * @param {number} limit - Maximum number of results (default: 100)
 * @returns {Promise<Array>} Array of parking signs with distance
 */
export async function findSignsNearby(latitude, longitude, radiusMeters = 500, limit = 100) {
  try {
    // Use RPC (Remote Procedure Call) for spatial queries
    const { data, error } = await supabase.rpc('find_signs_nearby', {
      lat: latitude,
      lng: longitude,
      radius: radiusMeters,
      max_results: limit
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching nearby signs:', error);
    throw error;
  }
}

/**
 * Get all signs within a bounding box (for map viewport)
 * @param {Object} bounds - Map bounds {north, south, east, west}
 * @param {number} limit - Maximum results
 * @returns {Promise<Array>} Array of parking signs
 */
export async function getSignsInBounds(bounds, limit = 1000) {
  try {
    const { north, south, east, west } = bounds;

    const { data, error } = await supabase
      .from('parking_signs')
      .select('*')
      .gte('latitude', south)
      .lte('latitude', north)
      .gte('longitude', west)
      .lte('longitude', east)
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching signs in bounds:', error);
    throw error;
  }
}

/**
 * Search signs by sign code
 * @param {string} signCode - Sign code to search for
 * @returns {Promise<Array>} Array of matching signs
 */
export async function searchBySignCode(signCode) {
  try {
    const { data, error } = await supabase
      .from('parking_signs')
      .select('*')
      .ilike('sign_code', `%${signCode}%`)
      .limit(100);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error searching by sign code:', error);
    throw error;
  }
}

/**
 * Search signs by description
 * @param {string} searchTerm - Search term for description
 * @returns {Promise<Array>} Array of matching signs
 */
export async function searchByDescription(searchTerm) {
  try {
    const { data, error } = await supabase
      .from('parking_signs')
      .select('*')
      .ilike('sign_description', `%${searchTerm}%`)
      .limit(100);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error searching by description:', error);
    throw error;
  }
}

/**
 * Get sign by ID
 * @param {number} id - Sign ID
 * @returns {Promise<Object>} Sign object
 */
export async function getSignById(id) {
  try {
    const { data, error } = await supabase
      .from('parking_signs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching sign by ID:', error);
    throw error;
  }
}
