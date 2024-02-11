import { forwardRef } from 'react'
import styles from './app.module.css'

export const Field = forwardRef(({ error, ...props }, ref) => {
	return (
		<div>
			<input ref={ref} {...props} />
			{error && <p className={styles.errorLabel}>{error}</p>}
		</div>
	)
})
