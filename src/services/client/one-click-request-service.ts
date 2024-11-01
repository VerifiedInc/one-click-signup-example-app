/**
 * Make 1-click related requests to next API serverless functions
 * Once in the server side, we can then call the 1-click API to avoid exposing the API key
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 */

import { OneClickRequest, OneClickResponse } from '@/types/OneClick.types';

const headers = {
  'Content-Type': 'application/json',
};

export const postOneClick = async (
  payload: OneClickRequest,
): Promise<OneClickResponse> => {
  return fetch('/api/1-click', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};
