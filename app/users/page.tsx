'use client'
import { Table, TableHead } from "@mui/material";
import React, { useEffect, useState } from "react";
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 300 },
];
const postTableStyles={
  height: '650px',
};
// interface Post {
//   id: number;
//   userId: number;
//   title: string;
// }
const RedirectingPage =  () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setPosts(json))
}, []);

  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const posts: Post[] = await res.json();
  return ()
  
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
