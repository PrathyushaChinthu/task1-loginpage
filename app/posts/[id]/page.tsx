"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Post } from "../page";

const styles: any = {
  post: {
    background: "#378CE7",
    color: "black",
    width: "100%", // Adjusted width
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "2rem", // Adjusted padding
    marginBottom: "2rem", // Adjusted margin bottom
  },
  button: {
    padding: "1rem",
    margin: "1rem",
    borderRadius: "15px",
    boxShadow: "#f95959",
    color: "black",
    backgroundColor: "#f95959",
  },
  link: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
  },
};

const PostId = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await res.json();
        setPost(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Link href={"/posts"}>
            <button style={styles.button}>&lt;</button>
          </Link>
          <div style={styles.post}>
            <div>Id: {post?.id}</div>
            <div>Title: {post?.title}</div>
            <div>Body: {post?.body}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostId;
