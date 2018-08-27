import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCuvV_7vkFe1Zt7Zj5iY_9jMbj66St7BEw",
    authDomain: "catch-of-the-day-mgasca.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-mgasca.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
