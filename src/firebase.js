import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { 
  auth, 
  db 
} from "/config.js";

export const current = () => {
  const user = auth.currentUser;
  return user;
};

// export const uid = () => {
//   const userUid = auth.currentUser.uid;
//   return userUid;
// };

export function registerUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name,
    });
    return user;
  })
  .catch((error) => {
  });
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
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

export const createPost = async (postText) => {
  const postUser = await addDoc(collection(db, 'post'), {
    photo: current().photoURL,
    displayName: current().displayName,
    email: current().email,
    data: new Date().toLocaleDateString('pt-BR'),
    post: postText,
    like: [],
    user: current().uid,
  })
  .then(() => true)
  .catch((error) => error);
 return postUser;
};

export async function getAllPosts() {
  const collPost = collection(db, 'post');
  const postSnapshot = await getDocs(collPost);
  const listPost = postSnapshot.docs.map(doc => doc.data());
  return listPost;
}

export const logout = () => {
  const logoutUser = auth.signOut();
  return logoutUser;
};


// export function saveUserUpdate(name) {
//   return auth.currentUser
//     .updateProfile({
//       displayName: name,
//     })
//     .then(() => true)
//     .catch((error) => error);
// }

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


// export function stayLoggedIn(uid) {
//   return onAuthStateChanged(auth, (user) => {
//     uid(user !== null);
//   });
// }

