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
import { checkHasAdditionalInformationError } from '@/utils/1-click';

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
  console.log('One Click Post Response', response);

  const hasAdditionalInformationError =
    checkHasAdditionalInformationError(response);

  let responseIntegrationType: IntegrationType | null = null;
  if ('url' in response) {
    responseIntegrationType = IntegrationType['Hosted'];

    // If additional information is coming from the POST response, it's a Non-Hosted flow
  } else if ('identity' in response || hasAdditionalInformationError) {
    responseIntegrationType = IntegrationType['Non-Hosted'];

    // It's important to check for both uuid and code. Because error messages also have code.
  } else if ('code' in response && 'uuid' in response) {
    responseIntegrationType = IntegrationType['Semi-Hosted'];
  }

  // If responseIntegrationType is still null, it indicates an error (other than ADDITIONAL_INFORMATION_REQUIRED,
  // which was already handled during the non-hosted check). In this case, we simply return the response.
  if (
    responseIntegrationType &&
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
