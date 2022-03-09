import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
const db = getFirestore();

export async function createPost( _title, _content, _author ) {
  try {
    await addDoc(collection( db, "posts" ), {
      title: _title,
      content: _content,
      author: _author,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getPosts() {
  const posts = await getDocs(collection(db, "posts"));
  return posts.docs
    .map(( e ) => {
      return { data: e.data(), id: e.id };
    })
    .reverse();
}

export async function deletePosts(id) {
  await deleteDoc(doc(db, `posts/${id}`));
}

export async function updatePosts( id, { title, content, author } ) {
  const postRef = doc( db, `posts/${id}` );
  await updateDoc(
    postRef, {
      title: title,
      content: content,
      author: author,
    }
  );
}
