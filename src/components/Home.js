import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Post from "./Post";
import Profile from "./Profile";
import "./css/Home.css";

export default function Home({ signOut, user }) {
  const [postText, setPostText] = useState("");
  const postsRef = collection(db, "posts");
  const [postList, setPostList] = useState([]);

  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(postsRef, {
      postText,
      likes: { number: 0, likers: [] },
      comments: [],
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        pic: auth.currentUser.photoURL,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postsRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPost();
  }, []);

  return (
    <>
      <nav>
        <button>Frensta</button>
        <button onClick={signOut}>Sign Out</button>
      </nav>
      <main className="homeMain">
        <div className="Posts">
          <div className="createPost">
            <img src={user.photoURL} alt="User" />
            <form action="">
              <input
                placeholder=" What are your thoughts?..."
                rows="1"
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
              />
              <button type="submit" onClick={createPost}>
                Post
              </button>
            </form>
          </div>
          {postList.map((post) => (
            <Post key={post.author.uid} post={post} />
          ))}
        </div>
        <Profile user={user} />
      </main>
    </>
  );
}
