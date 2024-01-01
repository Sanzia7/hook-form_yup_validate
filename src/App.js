import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useRef} from 'react'
import {useStore} from './useStore'
import styles from './App.module.css'

const sendFormData = (formData) => {
	console.log(formData)
}

const fieldsSchema = yup.object().shape({
	email: yup.string().nullable().email(),
	password: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный password. Допустимые символы: буквы, цифры и нижнее подчёркивание.'
		)
		.min(3, 'Неверный password. Должно быть не меньше 3 символов.')
		.max(20, 'Неверный password. Должно быть не больше 20 символов.'),
	repeatPassword: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный password. Должно быть полное соответствие с уже введённым паролем'
		),
})

export default function App() {
	const {getState, updateState, resetState} = useStore()
	const {email, password, repeatPassword} = getState()
	const onChange = ({target}) => updateState(target.name, target.value)

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const repeatPasswordError = errors.repeatPassword?.message

	const submitButtonRef = useRef(null)

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendFormData)}>
				{emailError && (
					<div className={styles.errorLabel}>{emailError}</div>
				)}
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					name="email"
					type="email"
					{...register('email')}
					value={email}
					placeholder="Почта:"
					onChange={onChange}
				/>
				<input
					name="password"
					type="password"
					{...register('password')}
					value={password}
					placeholder="Пароль:"
					onChange={onChange}
				/>
				<input
					name="repeatPassword"
					type="password"
					{...register('repeatPassword')}
					value={repeatPassword}
					placeholder="Повторный пароль:"
					onChange={onChange}
				/>
				<button
					type="submit"
					// disabled={!!emailError} || {!!password }|| {!!repeatPassword}
					ref={submitButtonRef}
					onClick={resetState}
				>
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
