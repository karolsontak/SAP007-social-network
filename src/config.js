/* eslint-disable no-unused-vars */
import { initializeApp, getAuth, getFirestore } from './export.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAZf-VOOI__art51kU5_YzbrS99bPR5NXw',
  authDomain: 'young-social-network.firebaseapp.com',
  databaseURL: 'https://young-social-network-default-rtdb.firebaseio.com',
  projectId: 'young-social-network',
  storageBucket: 'young-social-network.appspot.com',
  messagingSenderId: '81827701203',
  appId: '1:81827701203:web:79cefd59735be7c86e0f26',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
