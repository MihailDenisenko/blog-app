import React from 'react'
import styles from './SignIn.module.scss'
import FormSignIn from './FormSignIN';
import { useForm } from 'react-hook-form';


export default function SignIn() {

   const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm();

  return (
		<div className={styles.signIN}>
			<div className={styles.signIN__fol}></div>
			<div className={styles.signIN__form}></div>
			<FormSignIn />

			
		</div>
	);
}
