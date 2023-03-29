import { apiRequest } from "/util/network";
import {
    useQuery,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from 'react-query';

const queryClient = new QueryClient();

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
    return (
        <QueryClientProviderBase client={queryClient}>
            {props.children}
        </QueryClientProviderBase>
    );
}

export function InvalidateQueryForId(id) {
    queryClient.invalidateQueries(['item', { id }]);
}

export function useSite(id) {
    const cacheKey = ['item', { id }];
    const query = () => apiRequest(`item-get?id=${id}`);
    return useQuery(cacheKey, query, { enabled: !!id });
}

export function useSiteByName(id) {
    const cacheKey = ['item', { id }];
    const query = () => apiRequest(`item-get?name=${id}`);
    return useQuery(cacheKey, query, { enabled: !!id });
}

// Fetch all items by owner (hook)
export function useSitesByOwner() {
    const cacheKey = ['ownedItems'];
    const query = () => apiRequest(`item?owned=true`);
    return useQuery(cacheKey, query, { enabled: true });
}

// Create a new item
export async function createSite(data) {
    const response = await apiRequest('item', 'POST', data);
    // await createIPFS(response._id);
    // Invalidate and refetch queries that could have old data
    await queryClient.invalidateQueries(['ownedItems']);
    return response;
}
// Update a new item
export async function updateSite(id, data) {
  const response = await apiRequest(`item?id=${id}`, 'PATCH', data);
  await Promise.all([
    queryClient.invalidateQueries(['item', { id }]),
    queryClient.invalidateQueries(['ownedItems']),
  ]);
  return response;
}

// Delete an item
// Update a new item
export async function deleteSite(id) {
  const response = await apiRequest('item', 'DELETE', id);
  await Promise.all([
    queryClient.invalidateQueries(['item', { id }]),
    queryClient.invalidateQueries(['ownedItems']),
  ]);
  return response;
}

// Update a new item
export async function deployToIPFS(id) {
    const response = await apiRequest(`ipfs-upload`, 'POST', {id});
    await Promise.all([
        queryClient.invalidateQueries(['item', { id }]),
      ]);
    return response;
  }

// Fetch build data for site (by name)
export function useSiteBuildByName(siteName) {
  const cacheKey = ['siteBuild', { siteName }];
  const query = () => apiRequest(`builds?siteName=${siteName}`);
  return useQuery(cacheKey, query, { enabled: !!siteName });
}

export function invalidateSiteBuildCache(siteName) {
  queryClient.invalidateQueries(['siteBuild', { siteName }]);
}