import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('checkou aqui');
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
    const { phone, email, birthDate } = req.body;
    const apiKey = process.env.ONE_CLICK_API_KEY;
    const apiURL = process.env.ONE_CLICK_API_URL;
    if (!apiKey || !apiURL) throw new Error('ONE_CLICK envs not set');

    const response = await fetch(`${apiURL}/1-click`, {
      method: 'POST',
      body: JSON.stringify({ phone, email, birthDate }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
    }).then((response) => response.json());
    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || 'Failed to post 1-click. Try again later',
    });
  }
}

async function patchOneClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { birthDate } = req.body;
    const { uuid } = req.query;
    const apiKey = process.env.ONE_CLICK_API_KEY;
    const apiURL = process.env.ONE_CLICK_API_URL;
    if (!apiKey || !apiURL) throw new Error('ONE_CLICK envs not set');

    const response = await fetch(`${apiURL}/1-click/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify({ birthDate }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
    }).then((response) => response.json());
    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || 'Failed to patch 1-click. Try again later',
    });
  }
}

async function getOneClick(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uuid, userInput } = req.query;
    console.log('uuid', uuid);
    console.log('userInput', userInput);

    const apiKey = process.env.ONE_CLICK_API_KEY;
    const apiURL = process.env.ONE_CLICK_API_URL;
    if (!apiKey || !apiURL) throw new Error('ONE_CLICK envs not set');

    const response = await fetch(
      `${apiURL}/1-click/${uuid}?code=${userInput}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: apiKey,
        },
      },
    ).then((response) => response.json());
    return res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      message: error.message || 'Failed to get 1-click. Try again later',
    });
  }
}
