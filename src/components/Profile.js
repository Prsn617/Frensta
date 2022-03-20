import React from "react";

export default function Profile({ user }) {
  return (
    <div className="profile">
      <img src={user.photoURL} alt="User" />
      <label>{user.displayName}</label>
    </div>
  );
}
