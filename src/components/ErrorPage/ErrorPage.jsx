import React from 'react'
import styles from './ErrorPage.module.scss'
import logoError from '../../assets/image/software-error.png'
import { useNavigate } from 'react-router-dom'
useNavigate

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div>
      <img onClick={() => { navigate('/') }} className={styles.img} src={logoError} alt='' />
    </div>
  )
}
