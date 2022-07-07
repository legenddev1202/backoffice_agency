const prodConfig = {
    // apiKey: "AIzaSyA9-SEj9YryrHubRJuHyWnfxZW6SigT9UY",
    // authDomain: "panendo-57b6b.firebaseapp.com",
    // databaseURL: "https://panendo-57b6b.firebaseio.com",
    // projectId: "panendo-57b6b",
    // storageBucket: "panendo-57b6b.appspot.com",
    // messagingSenderId: "121108700194",
    // appId: "1:121108700194:web:eb9d140a8f1f9a2a047e7b",
    // measurementId: "G-LCJY8L66Y8"
};

const devConfig = {
	// apiKey: "AIzaSyA9-SEj9YryrHubRJuHyWnfxZW6SigT9UY",
    // authDomain: "panendo-57b6b.firebaseapp.com",
    // databaseURL: "https://panendo-57b6b.firebaseio.com",
    // projectId: "panendo-57b6b",
    // storageBucket: "panendo-57b6b.appspot.com",
    // messagingSenderId: "121108700194",
    // appId: "1:121108700194:web:eb9d140a8f1f9a2a047e7b",
    // measurementId: "G-LCJY8L66Y8"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
