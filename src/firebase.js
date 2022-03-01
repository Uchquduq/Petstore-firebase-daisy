import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyCwpebi9KCRlDBmahw_a3LjnzuvpD4JB-8",
  authDomain: "petstore-dd85d.firebaseapp.com",
  projectId: "petstore-dd85d",
  storageBucket: "petstore-dd85d.appspot.com",
  messagingSenderId: "1057980054886",
  appId: "1:1057980054886:web:3182af2fa3b06d24c81ca7",
  measurementId: "G-FCMQCR5DQE",
  databaseURL: "https://petstore-dd85d-default-rtdb.firebaseio.com"
});

export const db = app.database();

export const productsRef = db.ref('products');


