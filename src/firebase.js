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
  updateDoc, 
  deleteDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { 
  auth, 
  db 
} from "/config.js";

export const current = () => {
  const user = auth.currentUser;
  return user;
};

export function registerUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const photoUser = './img/anonimo.png';
    updateProfile(user, {
      displayName: name,
      photo: photoUser,
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
    hour: new Date().toLocaleTimeString([], {timeStyle: 'short'}),
    post: postText,
    like: [],
    user: current().uid,
  })
  .then(() => true)
  .catch((error) => error);
 return postUser;
};

export async function getAllPosts() {
  const collPost = query (collection(db, 'post'), orderBy ('data', 'desc'), orderBy ('hour', 'desc'));
  const postSnapshot = await getDocs(collPost);
  const listPost = postSnapshot.docs.map(doc => {
    const id = doc.id;
    const data = doc.data();
    const post = {
      id, 
      ...data,
    }
    return post;
  });
  return listPost;
};

export const deletePost = async (idPost) => {
  const del = await deleteDoc(doc(db, 'post', idPost)); 
  return del;
};

export async function getPostById(idPost) {
  const post = await getDoc(doc(db, 'post', idPost)); 
  return post.data();
}

export async function likePost (idPost) {
  const postId = await getPostById(idPost);
  const loggedUser = current().uid;
  let likes = postId.like;
  let liked;
  if (postId.like.includes(loggedUser)) {
    liked = false;
    likes = likes.filter((id) => id !== loggedUser)
  } else {
    liked = true;
    likes.push(loggedUser)
  }
  await updateDoc(doc(db, 'post', idPost), {
    like: likes 
  })
  return {
    liked,
    count: likes.length
  }
};

// export async function like (id, user){
//   const collectionPost = await db.collection('post');
//   const promiseLike =  collectionPost
//   .doc(id)
//   .getDocs()
//   .then((post) => {
//     let likes = post.data().like;
//     if (likes.includes(user)) {
//       likes = likes.filter((userLikedId) => userLikedId !== user);
//     } else {
//       likes.push(user);
//     }

//     return collectionPost
//       .doc(id)
//       .update({
//         likes,

//       });
//   });
// return promiseLike;
// };

export const logout = () => {
  const logoutUser = auth.signOut();
  return logoutUser;
};

export function stayLoggedIn(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user !== null);
  });
}


// export async function like (id, user){
//   const collectionPost = await db.collection('post');
//   const promiseLike =  collectionPost
//   .doc(id)
//   .getDocs()
//   .then((post) => {
//     let likes = post.data().like;
//     if (likes.includes(user)) {
//       likes = likes.filter((userLikedId) => userLikedId !== user);
//     } else {
//       likes.push(user);
//     }

//     return collectionPost
//       .doc(id)
//       .update({
//         likes,

//       });
//   });
// return promiseLike;
// }
    
