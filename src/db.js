import * as firebase from 'firebase';

var config = {
	apiKey: 'AIzaSyCsFIxu7mqwrjVxPP0y8qaVPDDGenuPo2s',
	authDomain: 'cashflow-ecd26.firebaseapp.com',
	databaseURL: 'https://cashflow-ecd26.firebaseio.com',
	projectId: 'cashflow-ecd26',
};
firebase.initializeApp(config);

var db = firebase.database();

export default db;
