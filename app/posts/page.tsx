"use client";
import React, { useEffect, useState } from "react";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjusted to display 10 rows per page
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(1);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper} style={{ background: "#378CE7" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="justify">Id</TableCell>
              <TableCell align="justify">Title</TableCell>
              <TableCell align="justify">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? posts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : posts
            ).map((post) => (
              <TableRow
                key={post.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Link
                    color="inherit"
                    underline="none"
                    href={`./posts/${post.id}`}
                  >
                    {post.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    color="inherit"
                    underline="none"
                    href={`./posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    color="inherit"
                    underline="none"
                    href={`./posts/${post.id}`}
                  >
                    {post.body}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TablePagination
          rowsPerPageOptions={[5]} // Only option is 10 rows per page
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};
export default Posts;
// import React, { useCallback, useEffect, useState, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// type Post = {
//   id: number;
//   userId: number;
//   title: string;
//   body: string;
// };

// const styles = {
//   post: {
//     background: "red",
//     margin: 20,
//   },
// };

// const Posts = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const itemsPerPage = 5;

//   const fetchPosts = useCallback(async (currentPage: number) => {
//     setIsLoading(true);
//     try {
//       const start = itemsPerPage * (currentPage - 1);
//       const postsReq = await fetch(
//         `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${itemsPerPage}`
//       );
//       const res: Post[] = await postsReq.json();
//       setPosts(res);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   }, []);

//   const handleNav = (pageNumber: number) => {
//     const currentPage = page + pageNumber;
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", currentPage.toString());
//     router.push(`/posts?${params.toString()}`);
//   };

//   useEffect(() => {
//     const currentPage = searchParams.get("page") ?? page;
//     setPage(Number(currentPage));
//     fetchPosts(Number(currentPage));
//   }, [searchParams, page, fetchPosts]);

//   return (
//     <Suspense>
//       <div>
//         {isLoading && <div>Loading...</div>}
//         {!isLoading && posts.length > 0 && (
//           <div>
//             {posts.map((post: Post) => (
//               <div style={styles.post} key={post.id}>
//                 Id: {post.id} <br />
//                 Title: {post.title} <br />
//                 Body: {post.body}
//               </div>
//             ))}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 marginBottom: 24,
//               }}
//             >
//               <button disabled={page === 1} onClick={() => handleNav(-1)}>
//                 Prev
//               </button>
//               <span>
//                 Page: {page} ({(page - 1) * itemsPerPage + 1} to{" "}
//                 {page * itemsPerPage})
//               </span>
//               <button onClick={() => handleNav(1)}>Next</button>
//             </div>
//           </div>
//         )}
//         {!isLoading && posts.length === 0 && <div>No Posts</div>}
//       </div>
//     </Suspense>
//   );
// };

// export default Posts;
