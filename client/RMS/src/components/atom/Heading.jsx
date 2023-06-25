import React from 'react'

function Heading({className, children}) {
  return (
    <h1 className={className}>
        {children}
    </h1>
  )
}

export default Heading