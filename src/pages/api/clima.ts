import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const apiKey = 'c3f6aa8d900ae85246a4b851c69daba6';
    const { city } = req.body; // Obtém o CEP passado no corpo da requisição
    const params = 'windSpeed';
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    fetch(apiWeatherURL, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }).then((response) => response.json()).then((jsonData) => {
        res.status(200).json(jsonData);
      });
  }
}
