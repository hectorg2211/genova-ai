'use client'
import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CripsChat = () => {
  useEffect(() => {
    Crisp.configure('485fa72d-b86d-4a7b-999d-b27698446793')
  }, [])

  return null
}

export default CripsChat
