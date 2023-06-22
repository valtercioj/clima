import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const apiKey = '912ee1a2-1101-11ee-92e6-0242ac130002-912ee24c-1101-11ee-92e6-0242ac130002';
    const { lat, long } = req.body; // Obtém o CEP passado no corpo da requisição
    const params = 'windSpeed';
    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}&params=${params}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }).then((response) => response.json()).then((jsonData) => {
        res.status(200).json(jsonData);
      });
  }
}
