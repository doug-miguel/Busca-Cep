import React from 'react'
import Button from './cepInput/Button'
import Input from './cepInput/Input'

import '../style/home.scss'

const Home = () => {
  const [dados, setDados] = React.useState('')
  const [response, setResponse] = React.useState([])
  const [error, setError] = React.useState(null)
  
  function handleSubmit (event) {
    event.preventDefault();
    const api = async (cep) => {
      const dadosApi = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const repo = await dadosApi.json()
      setResponse(repo)
    }
    api(dados)
  }

  function handleBlur() {
    if (dados.length === 0) {
      setError("Digite um cep");
      return true
    } else if (!/^\d{5}-?\d{3}$/.test(dados)) {
      setError("Informe um cep valido");
      return true
    } else {
      setError(null);
      return false
    }
  }

  function handleChange({ target }) {
    if (error) setError(false)
      setDados(target.value)
  }
  
  return (
    <>
    <form onSubmit={handleSubmit} className="container">
      <Input 
        id="cep" 
        label="Busca Cep" 
        value={dados} 
        setValue={setDados}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="00000-000"
      />
      {error && <p>{error}</p>}
      <Button title="Buscar"/>
    </form>
    { dados && response && <div>
      <p>Cep: {response.cep}</p>
      <p>{response.logradouro}</p>
      <p>Complemento: {response.complemento}</p>
      <p>Bairro: {response.bairro}</p>
      <p>Estado: {response.uf}</p>
      <p>DDD: {response.ddd}</p>
    </div>}
    </>
  )
}

export default Home
