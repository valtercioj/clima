import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

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
  const [clima, setClima] = useState()
  const [endereco, setEndereco] = useState<Iendereco>()

  function handleCepValue(e){
    setCep(e.target.value)
  }
  

  function handleSubmit(){
    // fetch('/api/cep', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ cep: cep }), // Envie os dados no corpo da requisição como uma string JSON
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setEndereco(data); // Valor processado retornado pela API
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch('/api/clima', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ lat:latitude, long:longitude }), // Envie os dados no corpo da requisição como uma string JSON
            })
              .then(response => response.json())
              .then(data => {
                setClima(data); // Valor processado retornado pela API
              })
              .catch(error => {
                console.error(error);
              });
          },
          error => {
            console.error('Erro ao obter a localização:', error);
          }
        );
      } else {
        console.error('Geolocalização não é suportada pelo navegador.');
      }
     
  }
  console.log(endereco)
  return (
    <div className='w-screen flex flex-col justify-center mx-auto'>
      <div className='flex items-center w-full justify-center'>
        <label htmlFor="cep" className='mr-8'>Digite seu cep</label>
        <input type="text" name="cep" id="cep" placeholder='cep' className='border border-black p-1' value={cep} onChange={e => handleCepValue(e)}/>
      </div>
      
      <button className='border border-black bg-red-500 text-white w-20 mx-auto mt-6' onClick={() => handleSubmit()}>Acessar</button>
     
     
      {endereco && (
         <ul className='ml-10'>
          <li>Bairro: {endereco.bairro}</li>
          <li>cep: {endereco.cep}</li>
          <li>ddd: {endereco.ddd}</li>
          <li>Cidade: {endereco.localidade}</li>
          <li>Endereco: {endereco.logradouro}</li>
        </ul>
      )};
    </div>
  )
}
