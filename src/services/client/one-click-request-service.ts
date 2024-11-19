/**
 * Make 1-Click related requests to next API serverless functions
 * Once in the server side, we can then call the 1-Click API to avoid exposing the API key
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 */

import {
  IntegrationType,
  OneClickGetResponse,
  OneClickPatchRequest,
  OneClickPatchResponse,
  OneClickPostRequest,
  OneClickPostResponse,
} from '@/types/OneClick.types';
import { flow } from 'lodash';

const headers = {
  'Content-Type': 'application/json',
};

/**
 * Request to next API to do a POST 1-Click request
 * @see https://docs.verified.inc/endpoints#post-1-click
 * You can see the implementation in src/pages/api/1-click/index.ts
 */
export const postOneClick = async (
  flowIntegrationType: IntegrationType,
  payload: OneClickPostRequest,
): Promise<OneClickPostResponse> => {
  console.log(payload, flowIntegrationType);
  return fetch('/api/1-click', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  })
    .then((response) => response.json())
    .then((response) =>
      checkIntegrationMismatch(flowIntegrationType, response),
    );
};

/**
 * Check if the integration type in the response matches the flow integration type
 * If it doesn't match, return an error response
 */
const checkIntegrationMismatch = (
  flowIntegrationType: IntegrationType,
  response: OneClickPostResponse,
): OneClickPostResponse => {
  console.log(response);
  // if the response is an error, we don't need to check the integration type
  if ('data' in response || 'className' in response) {
    return response;
  }

  let responseIntegrationType: IntegrationType | null = null;
  if ('url' in response) {
    responseIntegrationType = IntegrationType['Hosted'];
  } else if ('code' in response) {
    responseIntegrationType = IntegrationType['Semi-Hosted'];
  } else if ('identity' in response) {
    responseIntegrationType = IntegrationType['Non-Hosted'];
  }

  if (
    // At this point, we know that responseIntegrationType is not null, but if were to be null, we would want to return the response
    responseIntegrationType !== null &&
    responseIntegrationType !== flowIntegrationType
  ) {
    return {
      name: 'IntegrationTypeMismatch',
      message: `You are using the ${flowIntegrationType} flow in this app, but your brand's integration type is set to ${responseIntegrationType} Please update this setting to ${flowIntegrationType} in the Dashboard.`,
      code: 400,
      className: 'IntegrationTypeMismatch',
      data: {
        errorCode: 'INTEGRATION_TYPE_MISMATCH',
      },
    };
  }

  return response;
};

/**
 * Request to next API to do a PATCH 1-Click request
 * @see https://docs.verified.inc/endpoints#patch-1-click
 * You can see the implementation in src/pages/api/1-click/index.ts
 */
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

/**
 *
 * Request to next API to a GET 1-Click request
 * @see https://docs.verified.inc/endpoints#get-1-click
 * You can see the implementation in src/pages/api/1-click/index.ts
 */
export const getOneClick = async (
  uuid: string,
  code?: string,
): Promise<OneClickGetResponse> => {
  return fetch(`/api/1-click?uuid=${uuid}${code ? `&code=${code}` : ''}`, {
    method: 'GET',
    headers,
  }).then((response) => response.json());
};
