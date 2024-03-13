"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const styles = {
  post: {
    background: "red",
    margin: 20,
  },
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = 5;

  const fetchPosts = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    try {
      const start = itemsPerPage * (currentPage - 1);
      const postsReq = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${itemsPerPage}`
      );
      const res: Post[] = await postsReq.json();
      setPosts(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleNav = (pageNumber: number) => {
    const currentPage = page + pageNumber;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    router.push(`/posts?${params.toString()}`);
  };

  useEffect(() => {
    const currentPage = searchParams.get("page") ?? page;
    setPage(Number(currentPage));
    fetchPosts(Number(currentPage));
  }, [searchParams, page, fetchPosts]);

  return (
    <Suspense>
      <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && posts.length > 0 && (
          <div>
            {posts.map((post: Post) => (
              <div style={styles.post} key={post.id}>
                Id: {post.id} <br />
                Title: {post.title} <br />
                Body: {post.body}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: 24,
              }}
            >
              <button disabled={page === 1} onClick={() => handleNav(-1)}>
                Prev
              </button>
              <span>
                Page: {page} ({(page - 1) * itemsPerPage + 1} to{" "}
                {page * itemsPerPage})
              </span>
              <button onClick={() => handleNav(1)}>Next</button>
            </div>
          </div>
        )}
        {!isLoading && posts.length === 0 && <div>No Posts</div>}
      </div>
    </Suspense>
  );
};

export default Posts;
