// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    
    const { cep } = req.body; // Obtém o CEP passado no corpo da requisição

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
