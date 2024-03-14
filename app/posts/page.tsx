"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
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
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjusted to display 5 rows per page
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const fetchData = useCallback(
    async (currentPage: number) => {
      setIsLoading(true);
      try {
        const start = rowsPerPage * currentPage;
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${rowsPerPage}`
        );
        const data: Post[] = await res.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [rowsPerPage]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchData(newPage);
    // Update URL with the new page number
    router.push(`/posts?page=${newPage}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page number when changing rows per page
    fetchData(0); // Fetch data for the first page after changing rows per page
    // Update URL with the new rows per page and reset to page 0
    router.push(`/posts?page=0&rowsPerPage=${newRowsPerPage}`);
  };

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "0", 10);
    setPage(currentPage);
    fetchData(currentPage);
  }, [searchParams, fetchData]);

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
      <Typography
        variant="h3"
        sx={{
          marginBottom: "0.5rem",
          fontFamily: "Monospace",
          fontStyle: "italic",
          color: "black",
          fontWeight: "900",
          padding: "0.5rem",
        }}
      >
        Posts
      </Typography>
      <TableContainer
        component={Paper}
        style={{ width: "90%", background: "#378CE7" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="justify">Id</TableCell>
              <TableCell align="justify">Title</TableCell>
              <TableCell align="justify">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                component={Link}
                color="inherit"
                underline="none"
                onClick={() => router.push(`/posts/${post.id}`)} // Use router.push for navigation
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
          component="div"
          count={100} // Placeholder count for total number of items
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* Render current page number */}
        <Typography variant="button">Page {page + 1}</Typography>
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
