import { Table, TableHead } from "@mui/material";
import React from "react";
interface Post {
  id: number;
  userId: number;
  title: string;
}
const RedirectingPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  return (
    <>
      <Table>
        <TableHead>
          <tr>
            <th>User Id</th>
            <th>Title</th>
          </tr>
        </TableHead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RedirectingPage;
