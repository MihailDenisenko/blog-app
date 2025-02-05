import React from 'react'
import styles from './HomePage.module.scss'
import { useNavigate } from 'react-router-dom'


export default function HomePage() {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate('/articles')
      }}
    >
      HomePage
    </div>
  )
}
