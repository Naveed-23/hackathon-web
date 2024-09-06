import supabase from './supabase'; 

export default async function getHackathon(searchText = '', statusFilters: string[] = [], levelFilters: string[] = []) {
  // Start by selecting all hackathons
  let query = supabase
    .from('hackathon')
    .select('*');

  // Apply search filter (if searchText is provided)
  if (searchText) {
    query = query.ilike('title', `%${searchText}%`);
  }

  // Apply status filters (if any are selected)
  if (statusFilters.length > 0) {
    query = query.in('status', statusFilters);
  }

  // Apply level filters (if any are selected)
  if (levelFilters.length > 0) {
    query = query.in('level', levelFilters);
  }

  // Fetch the filtered data from Supabase
  const { data, error } = await query;

  if (error) {
    console.error('Error fetching hackathons:', error);
    return null;
  }

  return data;
}
