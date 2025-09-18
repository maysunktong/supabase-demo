export default function Home() {
  const post = {
    title: "Post title",
    author: "JK Rowlin",
  };

  return (
    <>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.author}</p>
        </div>
      )}
    </>
  );
}
