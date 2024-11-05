/**
 * Make 1-click related requests to next API serverless functions
 * Once in the server side, we can then call the 1-click API to avoid exposing the API key
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 */

import {
  OneClickGetResponse,
  OneClickPatchRequest,
  OneClickPatchResponse,
  OneClickPostRequest,
  OneClickPostResponse,
} from '@/types/OneClick.types';

const headers = {
  'Content-Type': 'application/json',
};

export const postOneClick = async (
  payload: OneClickPostRequest,
): Promise<OneClickPostResponse> => {
  return fetch('/api/1-click', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

export const patchOneClick = async (
  uuid: string,
  payload: OneClickPatchRequest,
): Promise<OneClickPatchResponse> => {
  return fetch(`/api/1-click?uuid=${uuid}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

export const getOneClick = async (
  uuid: string,
  code?: string,
): Promise<OneClickGetResponse> => {
  return fetch(`/api/1-click?uuid=${uuid}${code ? `&code=${code}` : ''}`, {
    method: 'GET',
    headers,
  }).then((response) => response.json());
};
