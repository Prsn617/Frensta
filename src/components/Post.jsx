import React, { useState } from "react";
import "./css/Post.css";
import { auth, db } from "../firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Post({ post }) {
  // const uid = post.uid;
  const [commentt, setComment] = useState("");
  const [display, setDisplay] = useState("hidden");

  let name = auth.currentUser.displayName;
  let author = {
    name: auth.currentUser.displayName,
    id: auth.currentUser.uid,
    pic: auth.currentUser.photoURL,
  };
  let numbers = post.likes.number < 0 ? 0 : post.likes.number;
  let liker = post.likes.likers;
  let commentts = post.comments;

  const likePost = async (e, id) => {
    const postsRef = doc(db, "posts", id);

    if (e.target.checked === true) {
      await updateDoc(postsRef, {
        likes: { number: numbers + 1, likers: [...liker, name] },
      });
    } else {
      await updateDoc(postsRef, {
        likes: { number: numbers - 1, likers: liker.filter((e) => e !== name) },
      });
    }
  };

  const showComments = async (id) => {
    setDisplay("block");
  };

  const commentPost = async (id) => {
    const postsRef = doc(db, "posts", id);
    await updateDoc(postsRef, {
      comments: [...commentts, { commentor: author, comment: commentt }],
    });
    window.location.reload();
  };

  const checkIfLiked = (post) => {
    console.log(`Commmmm:${post.likes.likers}`);
    if (post.likes.likers.includes(name)) {
      return true;
    }
    return false;
  };

  const deletePost = async (id) => {
    const postsRef = doc(db, "posts", id);
    await deleteDoc(postsRef);
  };

  return (
    <div className="post-container">
      {post.author.id === auth.currentUser.uid && (
        <button
          className="delPost"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          <span className="material-icons">delete</span>
        </button>
      )}

      <div className="userPosts">
        <img src={post.author.pic} alt="User" />
        <div className="userDetail">
          <b>
            <label className="name">{post.author.name}</label>
          </b>
          <span className="posts">{post.postText}</span>
        </div>
      </div>
      <div className="reactions">
        <input
          onChange={(e) => {
            likePost(e, post.id);
          }}
          type="checkbox"
          id={post.id}
          defaultChecked={checkIfLiked(post)}
        />
        <label htmlFor={post.id} className="heart">
          {numbers}
        </label>
        <button
          className="cmtBtn"
          onClick={() => {
            showComments(post.id);
          }}
        >
          Comment
        </button>
        <div className={display}>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              commentPost(post.id);
            }}
          >
            <input
              type="text"
              placeholder="Write a comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button type="submit" className="hidden">
              Go
            </button>
          </form>
          {commentts.map((com) => (
            <div className="comm">
              <img src={com.commentor.pic} alt="Com" />
              <span>
                <label>
                  <b>{com.commentor.name}</b>
                </label>
                <label>{com.comment}</label>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
