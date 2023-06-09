export default function Read(props: { params: { id: string } }) {
  console.log("🚀 ~ file: page.tsx:2 ~ Read ~ params:", props.params);
  return (
    <>
      <h2>Read</h2>
      parameter id - {props.params.id}
    </>
  );
}
