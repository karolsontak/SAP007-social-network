import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  getDoc,
} from './export.js';
import { auth, db } from "./config.js"; //eslint-disable-line

export const current = () => {
  const user = auth.currentUser;
  return user;
};

export function registerUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      });
      return user;
    },
  );
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const createPost = (postText) => addDoc(collection(db, 'post'), {
  photo: current().photoURL,
  displayName: current().displayName,
  email: current().email,
  data: new Date().toLocaleDateString('pt-BR'),
  hour: new Date().toLocaleTimeString([], { timeStyle: 'short' }),
  post: postText,
  like: [],
  user: current().uid,
});

export async function getAllPosts() {
  const collPost = query(
    collection(db, 'post'),
    orderBy('data', 'desc'),
    orderBy('hour', 'desc'),
  );
  const postSnapshot = await getDocs(collPost);
  const listPost = postSnapshot.docs.map((docColl) => {
    const id = docColl.id;
    const data = docColl.data();
    const post = {
      id,
      ...data,
    };
    return post;
  });
  return listPost;
}

export const deletePost = async (idPost) => {
  const del = await deleteDoc(doc(db, 'post', idPost));
  return del;
};
export const editPost = async (idPost, postText) => {
  await updateDoc(doc(db, 'post', idPost), {
    post: postText,
  });
};

export async function getPostById(idPost) {
  const post = await getDoc(doc(db, 'post', idPost));
  return post.data();
}

export async function likePost(idPost) {
  const postId = await getPostById(idPost);
  const loggedUser = current().uid;
  let likes = postId.like;
  let liked;
  if (postId.like.includes(loggedUser)) {
    liked = false;
    likes = likes.filter((id) => id !== loggedUser);
  } else {
    liked = true;
    likes.push(loggedUser);
  }
  await updateDoc(doc(db, 'post', idPost), {
    like: likes,
  });
  return {
    liked,
    count: likes.length,
  };
}

export const logout = () => {
  const logoutUser = auth.signOut();
  return logoutUser;
};

export function stayLoggedIn(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user !== null);
  });
}
