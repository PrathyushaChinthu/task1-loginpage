"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// const columns = [
//   { field: "id", headerName: "ID", width: 100 },
//   { field: "title", headerName: "Title", width: 300 },
// ];
// const postTableStyles = {
//   height: "650px",
// };
interface Post {
  id: number;
  userId: number;
  title: string;
}

const RedirectingPage = async () => {
  //const [posts, setPosts] = useState([]);
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //         .then((response) => response.json())
  //         .then((json) => setPosts(json))
  // }, []);ta
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="justify">Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.userId}
              </TableCell>
              <TableCell align="justify">{post.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  //     <DataGrid
  //   rows={rows}
  //   columns={columns}
  //   initialState={{
  //     pagination: {
  //       paginationModel: { page: 0, pageSize: 5 },
  //     },
  //   }}
  //   pageSizeOptions={[5, 10]}

  // />

  // <DataTable
  //         rows={posts}
  //         columns={columns}
  //         loading={!posts.length}
  //         sx={postTableStyles}
};

export default RedirectingPage;
