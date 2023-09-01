import React, { useState } from 'react'
import { InlineMath } from 'react-katex'

const TexBlock = () => {
  return (
    <div>
        <InlineMath>\\frac{1}{2}</InlineMath>
    </div>
  )
}

export default TexBlock