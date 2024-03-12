"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchPosts = useCallback(
    async (currentPage: number) => {
      setIsLoading(true);
      try {
        const start = rowsPerPage * currentPage;
        const postsReq = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${rowsPerPage}`
        );
        const res: Post[] = await postsReq.json();
        setPosts(res);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    },
    [rowsPerPage]
  );

  const handleNav = (pageNumber: number) => {
    const currentPage = page + pageNumber;
    setPage(currentPage);
    fetchPosts(currentPage);
  };

  useEffect(() => {
    const currentPage = Number(router.query?.page) || 0;
    setPage(currentPage);
    fetchPosts(currentPage);
  }, [router.query?.page, fetchPosts]);

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
              <button disabled={page === 0} onClick={() => handleNav(-1)}>
                Prev
              </button>
              <span>
                Page: {page + 1} ({page * rowsPerPage + 1} to{" "}
                {(page + 1) * rowsPerPage})
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

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@mui/material";

// interface Post {
//   id: number;
//   userId: number;
//   title: string;
// }

// const RedirectingPage = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Adjusted to display 10 rows per page
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//       const data: Post[] = await res.json();
//       setPosts(data);
//     };
//     fetchData();
//   }, []);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>User Id</TableCell>
//             <TableCell align="justify">Title</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {(rowsPerPage > 0
//             ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : posts
//           ).map((post) => (
//             <TableRow
//               key={post.id}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {post.userId}
//               </TableCell>
//               <TableCell align="justify">{post.title}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[10]} // Only option is 10 rows per page
//         component="div"
//         count={posts.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// };

// export default RedirectingPage;
