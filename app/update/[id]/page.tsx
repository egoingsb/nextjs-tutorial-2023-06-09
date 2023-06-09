"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const params = useParams();
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_API_URL}topics/${params.id}`;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);
  //@ts-ignore
  const submitHandler = async (evt) => {
    evt.preventDefault();
    const title = evt.target.title.value;
    const body = evt.target.body.value;
    console.log(title, body);
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const result = await resp.json();
    router.push(`/read/${params.id}`);
    router.refresh();
    console.log(result);
  };
  return (
    <>
      <h2>Update</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </>
  );
}
