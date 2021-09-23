import React from 'react'

const Input = ({ id, label, value, setValue, ...props }) => {

  function handleChange({target}) {
    setValue(target.value)
  }

  return (
    <div className="cepInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={handleChange} {...props}/>
    </div>
  )
}

export default Input
