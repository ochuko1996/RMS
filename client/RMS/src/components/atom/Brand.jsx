import React from 'react'

function Brand({src, name, className}) {
  return (
    <img className={className} src={src} alt={name} />
  )
}

export default Brand