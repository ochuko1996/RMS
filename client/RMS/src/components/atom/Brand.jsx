import React from 'react'
import { Link } from 'react-router-dom'

function Brand({src, name, className}) {
  return (
    <Link to={"/"}>
      <img className={className} src={src} alt={name} />
    </Link>
  )
}

export default Brand