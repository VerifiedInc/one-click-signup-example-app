/**
 * This API is used to interact with the 1-Click API
 * It has 3 methods:
 * - POST: To create a new 1-Click
 * - PATCH: To update a 1-Click
 * - GET: To get a 1-Click
 *
 * In a real-world scenario you would wamt to validate the user input before working with it
 * But for the sake of simplicity, we are not doing it here
 *
 * * IMPORTANT *
 * One thing that you will always want to do is to mask the SSN before sending it to the client side
 * @see https://docs.verified.inc/integration-guide#a-use-a-form-with-autofilled-inputs
 */

import {
  OneClickEntity,
  OneClickGetResponse,
  OneClickPatchResponse,
  OneClickPostResponse,
} from '@/types/OneClick.types';
import { getOneClickEnvsOrthrow } from '@/utils/api';
import { ssnFormatter } from '@/utils/ssn';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return postOneClick(req, res);
  } else if (req.method === 'PATCH') {
    return patchOneClick(req, res);
  } else if (req.method === 'GET') {
    return getOneClick(req, res);
  }
}

async function postOneClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { apiKey, apiURL } = getOneClickEnvsOrthrow();

    const response = await fetch(`${apiURL}/1-click`, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
    }).then((response) => response.json() as Promise<OneClickPostResponse>);

    // Mask the SSN before sending it to the client side
    if ('identity' in response && response.identity) {
      maskSSN(response.identity);
    }

    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status ?? 400).json({
      message: error.message || 'Failed to post 1-Click. Try again later',
    });
  }
}

async function patchOneClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uuid } = req.query;
    const { apiKey, apiURL } = getOneClickEnvsOrthrow();

    const response = await fetch(`${apiURL}/1-click/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
    }).then((response) => response.json() as Promise<OneClickPatchResponse>);

    // Mask the SSN before sending it to the client side
    if ('credentials' in response) {
      maskSSN(response);
    }

    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || 'Failed to patch 1-Click. Try again later',
    });
  }
}

async function getOneClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uuid, code } = req.query;
    const { apiKey, apiURL } = getOneClickEnvsOrthrow();

    const response = await fetch(
      `${apiURL}/1-click/${uuid}${code ? `?code=${code}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
      },
    ).then((response) => response.json() as Promise<OneClickGetResponse>);

    // Mask the SSN before sending it to the client side
    if ('credentials' in response) {
      maskSSN(response);
    }

    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || 'Failed to get 1-Click. Try again later',
    });
  }
}

/**
 * Masks the SSN of a OneClickEntity
 * It's important to mask the SSN before sending it to the client side
 * Once the user submits the form, you will need to call the 1-Click API GET to get the unmasked version of SSN again
 */
function maskSSN(oneClickEntity: OneClickEntity) {
  if (oneClickEntity.credentials.ssn) {
    oneClickEntity.credentials.ssn = ssnFormatter(
      oneClickEntity.credentials.ssn,
    );
  }
}
