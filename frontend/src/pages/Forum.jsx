import React, { useState } from "react";
import Button from "../compoents/ui/button.jsx";
import { Card, CardContent } from "../compoents/ui/card.jsx";
import { ArrowUp, ArrowDown } from "lucide-react";
import "./Forum.css";
import Navbar from "../compoents/ui/Navbar.jsx";

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      title:
        "What's a small habit that unexpectedly changed your life?I’m not talking about the usual “waking up early” or “going to the gym” (though those are great too). I mean the tiny things—stuff you almost didn’t think would matter but ended up making a huge difference.\nFor me, it was putting my phone in another room before bed. I used to scroll for hours, and now I actually fall asleep faster and wake up feeling human. Didn’t expect such a small change to make such a big impact.\nWhat’s yours?",
      votes: 4,
    },
    {
      title:
        "What’s an “unwritten rule” of life that more people should know?There are so many things no one teaches you but can make life so much easier once you figure them out. For example:If someone is being rude to you, staying calm makes them look worse, not you.If you’re always late, set your clock 5 minutes ahead (it actually helps).You can tell a lot about a person by how they treat service workers.What’s a small life lesson that more people should know?",
      votes: 3,
    },
    {
      title:
        "What’s a game that completely consumed you for weeks?You know the type. The one where you wake up thinking about it, play for hours, then suddenly it’s 3 AM and you have work in the morning. 😅For me, it was Stardew Valley—I told myself I’d “just check on my farm” and next thing I knew, I was optimizing crops like a Wall Street analyst.What was yours?",
      votes: 7,
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() === "") return;
    const post = { title: newPost, votes: 0 };
    setPosts([...posts, post]);
    setNewPost("");
  };

  const handleVote = (index, type) => {
    const updatedPosts = [...posts];
    updatedPosts[index].votes += type === "up" ? 1 : -1;
    setPosts(updatedPosts);
  };

  return (
    <div className="forum-container">
      <Navbar></Navbar>
      <h1 className="forum-title">Community Forum</h1>

      <div className="post-input-container">
        <input
          className="post-input-field"
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button className="post-submit-button" onClick={handlePostSubmit}>
          Post
        </Button>
      </div>

      <div className="posts-container">
        {posts.map((post, index) => (
          <Card key={index} className="post-card">
            <CardContent className="post-content">
              <div className="vote-controls">
                <Button variant="ghost" onClick={() => handleVote(index, "up")}>
                  <ArrowUp className="vote-icon" />
                </Button>
                <span className="vote-count">{post.votes}</span>
                <Button
                  variant="ghost"
                  onClick={() => handleVote(index, "down")}
                >
                  <ArrowDown className="vote-icon" />
                </Button>
              </div>
              <h2 className="post-title">{post.title}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forum;
