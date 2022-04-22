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
  query,
  orderBy,
  // updateDoc, 
  deleteDoc
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
  const collPost = query(collection(db, 'post'), orderBy('data', 'desc'));
  const postSnapshot = await getDocs(collPost);
  const listPost = postSnapshot.docs.map(doc => doc.data());

  return listPost;
};

// export const editPost = async (idPost, postText) => {
//   const postIdEdit = doc(db, 'post', idPost);
//   console.log(textPost);
//   return await updateDoc(postIdEdit, { post: postText })
// };

export const deletePost = async (object) => {
  const delPost = await deleteDoc(doc(db, 'post', object)); 
  return delPost;
};

export const logout = () => {
  const logoutUser = auth.signOut();
  return logoutUser;
};

export function stayLoggedIn(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user !== null);
  });
}

