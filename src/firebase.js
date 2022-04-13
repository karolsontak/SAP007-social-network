import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
//import { collection } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import { auth } from "/config.js";

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function saveUserUpdate(name) {
  return auth.currentUser
    .updateProfile({
      displayName: name,
    })
    .then(() => true)
    .catch((error) => error);
}

const provider = new GoogleAuthProvider();
export const signInGoogle = () => {
  return signInWithPopup(auth, provider)
  .then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
  })

};

// const user = getFirestore(app);
// export function saveUser (user, email, name) {
//   return addDoc().collection('users').doc(email).set({
//     name: name,
//     email: email,
//   })
//     .then(() => true)
//     .catch((error) => error);
// };

// export async function saveUser(){
//   const collectionUsers = await addDoc[collection(auth, "users"), {
//     name: user,
//     email: email,
//   }];
//   const usersSnapshot = getDocs(collectionUsers);
//   return usersSnapshot.docs.map(doc => doc.data());
// }
