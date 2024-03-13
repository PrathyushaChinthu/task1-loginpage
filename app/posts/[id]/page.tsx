"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Props = {};

const PostId = (props: Props) => {
  const router = useRouter();
  // console.log(router);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>PostId</div>;
};

export default PostId;
