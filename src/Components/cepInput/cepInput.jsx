/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState } from "react";

export default function cepInput() {

  const [value, setValue] = useState("");
  const [api, setApi] = useState({})

  function handleAdicionar(e) {

    e.preventDefault();

    const Api = async (cep) => {
      const cepString = cep.toString()
      const dadosApi = await fetch(`https://viacep.com.br/ws/${cepString}/json/`)
      const respostaDados = await dadosApi.json()
      setApi(respostaDados)
      console.log(respostaDados)
    }
    Api(value)
  }
  return (
    <div className="container" >
      <form className="form">
        <label>
          <h1>Busca cep</h1>
        </label>
        <input
          className="cepInput"
          onChange={(event) => setValue(event.target.value)}
          type="text"
          name="name"
        />
        <input className="btn" onClick={handleAdicionar} type="submit" value="Buscar" />
      </form>
      <div>
        <ul className="returnApi">
          {api ? <>
          <li>{api.logradouro}</li>
          <li>{api.bairro}</li>
          <li>{api.localidade}</li>
          <li>{api.complemento}</li>
          <li>{api.cep}</li>
          <li>{api.ddd}</li>
          <li>{api.uf}</li></> : null}
        </ul>
      </div>
    </div>
  )
}