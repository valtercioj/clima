import { ChangeEvent, useState } from 'react'
import { Clima} from "@/utils/types"
import { ImLocation2 } from 'react-icons/im';

export interface Iendereco {
  bairro: string
  cep: string
  ddd: string
  localidade: string
  logradouro: string
  uf: string
}


export default function Home() {
  const [cep, setCep] = useState<string>()
  const [clima, setClima] = useState<Clima>()
  const [endereco, setEndereco] = useState<Iendereco>()

  function handleCepValue(e: ChangeEvent<HTMLInputElement>){
    setCep(e.target.value)
  }
  

  function handleSubmit(){
    fetch('/api/cep', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cep: cep }), // Envie os dados no corpo da requisição como uma string JSON
    })
      .then(response => response.json())
      .then(data => {
        setEndereco(data); // Valor processado retornado pela API
      })
      .catch(error => {
        console.error(error);
      });
      fetch('/api/clima', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: endereco?.localidade }), // Envie os dados no corpo da requisição como uma string JSON
      })
        .then(response => response.json())
        .then(data => {
          
          setClima(data); // Valor processado retornado pela API
        })
        .catch(error => {
          console.error(error);
        });
     
  }

  return (
    <div className='w-screen flex flex-col justify-center mx-auto'>
      <div className='flex items-center w-full justify-center'>
        <label htmlFor="cep" className='mr-8'>Digite seu cep</label>
        <input type="text" name="cep" id="cep" placeholder='cep' className='border border-black p-1' value={cep} onChange={e => handleCepValue(e)}/>
      </div>
      
      <button className='border border-black bg-red-500 text-white w-20 mx-auto mt-6' onClick={() => handleSubmit()}>Acessar</button>
     
     {endereco && (
      <div className="relative overflow-x-auto w-3/5 mx-auto mt-20">
       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
         <tr>
           <th scope="col" className="px-6 py-3">Bairro</th>
           <th scope="col" className="px-6 py-3">Cep</th>
           <th scope="col" className="px-6 py-3">DDD</th>
           <th scope="col" className="px-6 py-3">Cidade</th>
           <th scope="col" className="px-6 py-3">Endereco</th>
         </tr>
       </thead>
       <tbody className='dark:text-white'>
         <tr className="bg-white border-b-4 dark:bg-gray-800 dark:border-gray-700">
           <td className="px-6 py-4">{endereco.bairro}</td>
           <td className="px-6 py-4">{endereco.cep}</td>
           <td className="px-6 py-4">{endereco.ddd}</td>
           <td className="px-6 py-4">{endereco.localidade}</td>
           <td className="px-6 py-4">{endereco.logradouro}</td>
         </tr>
        
       </tbody>
     </table>
     </div>
     )}

      {clima?.coord && (
        <div className="bg-[#5c54ed] rounded-lg shadow-md p-8 w-96 mx-auto mt-20 text-white">
        <div className='flex items-center w-full h-full justify-center py-8'>
          <span className='text-2xl'><ImLocation2 /></span>
        <h2 className="text-2xl font-bold ">{clima?.name}</h2>
        </div>
        <div className="flex items-center mb-4 justify-center">
          <span className="text-6xl font-bold mr-2">{parseInt(clima.main?.temp).toString()}°C</span>
          
        </div>
        <div className='flex items-center justify-center'>
        <p className="text-white">{clima.weather[0].description}</p>
        <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} alt="" />
        </div>
      </div>
      )}
     
    </div>
  )
}
