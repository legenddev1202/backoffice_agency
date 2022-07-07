import { authRoles } from 'app/auth';
import Register from './Register';

const RegisterConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		// {
		// 	path: '/register/:belongTo/:id',
		// 	component: Register
		// },
		{
			path: '/register/:belongTo/:id/:email',
			component: Register
		}
	]
};

export default RegisterConfig;
