"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  // @ts-ignore
  async function submitHandler(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const result = await resp.json();
    // 글목록 갱신

    // redirection
    router.push("/read/" + result.id);
    router.refresh();
  }

  return (
    <>
      <h2>Create</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </>
  );
}
