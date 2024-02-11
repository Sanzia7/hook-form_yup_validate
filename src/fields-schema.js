import * as yup from 'yup'

export const fieldsSchema = yup.object().shape({
	email: yup.string().required('Fill email').email('Incorrect email'),
	password: yup
		.string()
		.required('Fill your password')
		.min(8, 'Password must be at least 8 characters')
		.matches(/^\S+$/, 'Spaces in the password are unacceptable')
		.matches(/[a-zA-Z]+/, 'Password must consist of letters, numbers and symbols')
		.matches(/[0-9]+/, 'Password must consist of letters, numbers and symbols')
		.matches(/\W+/, 'Password must consist of letters, numbers and symbols'),
	repeatPassword: yup
		.string()
		.required('Repeat your password')
		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
})



// "+"  -> указывает, что количество: >1(больше одного)
