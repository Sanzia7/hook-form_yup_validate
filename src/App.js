import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef } from 'react'
import { Field } from './field'
import { fieldsSchema } from './fields-schema'
import styles from './app.module.css'

export default function App() {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { touchedFields, isValid, errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onTouched',
	})

	const submitButtonRef = useRef(null)

	const onSubmit = ({ email, password }) => {
		console.log({ email, password })
	}

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus()
		}
	}, [isValid])

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					type="email"
					placeholder="Email"
					error={errors.email?.message}
					{...register('email')}
				/>
				<Field
					type="password"
					placeholder="Password"
					error={errors.password?.message}
					{...register('password', {
						onchange: () =>
							touchedFields.repeatPassword && trigger('repeatPassword'),
					})}
				/>
				<Field
					type="password"
					placeholder="Repeat Password"
					error={errors.repeatPassword?.message}
					{...register('repeatPassword')}
				/>
				<button type="submit" disabled={!isValid} ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}

// Основная разница — встроенная валидация в React Hook Form предоставляет базовую функциональность валидации на основе стандартов HTML, таких как обязательное поле, проверка на паттерн и т. д., в то время как использование Yup позволяет более гибко настраивать и проводить сложную валидацию с использованием Yup-схем.

//npm install @hookform/resolvers yup
///^[w_]*$/

// ссылки на документацию:
//https://react-hook-form.com/
// https://react-hook-form.com/get-started#schemavalidation
// Schema Validation

// option + z перенос длинных строк
