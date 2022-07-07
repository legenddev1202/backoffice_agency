import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './firebaseServiceConfig';
import {realDb, auth } from '../../../@fake-db/db/firebase'

class FirebaseService {
	init(success) {
		
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			success(false);
			return;
		}
		

		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
		
	
		this.db = realDb;
		this.auth = auth;
		success(true);
	}

	getUserData = userId => {
		
		if (!firebase.apps.length) {
			return false;
		}
		
		return new Promise((resolve, reject) => {
			this.db
				.ref(`admin/${userId}`)
				.once('value')
				.then(snapshot => {
					const user = snapshot.val();					
					resolve(user);
				});
		});
	};

	updateUserData = user => {
		if (!firebase.apps.length) {
			return false;
		}

		localStorage.setItem("@UID", user.uid)
		localStorage.setItem("@BELONGTO", user.belongTo)

		
		return realDb.ref(`${user.role}/${user.uid}`).set({...user, id:user.uid, active:true});
	};

	updateUserLoginData = user => {
		if (!firebase.apps.length) {
			return false;
		}

		localStorage.setItem("@UID", user.uid)
		localStorage.setItem("@BELONGTO", user.belongTo)

		
		return realDb.ref(`temp/`).set({});
	};


	onAuthStateChanged = callback => {
		if (!auth) {
			return;
		}
		auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!auth) {
			return;
		}
	
		auth.signOut();
	};
}

const instance = new FirebaseService();

export default instance;
