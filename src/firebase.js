import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { auth, db } from "/config.js";

export function registerUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    user.updateProfile({
      displayName: name,
    });
    return user;
  })
  .catch((error) => {
    // if (error.code === 'auth/uid-already-exists') {
    //   emailError.innerHTML = 'E-mail já cadastrado';
    // } else if (error.code === 'auth/email-already-in-use') {
    //   emailError.innerHTML = 'E-mail já cadastrado';
    // } else if (error.code === 'auth/invalid-email') {
    //   emailError.innerHTML = 'E-mail invalido';
    // } else {
    //   emailError.innerHTML = 'Preencha novamente.';
    // }
  });
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const saveUser = () => {
  const user = auth.currentUser;
  return user;
};
// export function saveUserUpdate(name) {
//   return auth.currentUser
//     .updateProfile({
//       displayName: name,
//     })
//     .then(() => true)
//     .catch((error) => error);
// }

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

export const createPost = async (postText, displayName) => {
  const postUser = await addDoc(collection(db, 'post'), {
    name: displayName,
    data:new Date(),
    post: postText,
    like: [],
  })
  .then(() => true)
  .catch((error) => error);
 return postUser;
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


export function stayLoggedIn(uid) {
  return onAuthStateChanged(auth, (user) => {
    uid(user !== null);
  });
}

export function logout() {
  auth.signOut().then(() => {
    alert('Saiu');
    window.location.hash = '';
  }).catch(() => {
    alert('Erro ao fazer logout');
  });
}