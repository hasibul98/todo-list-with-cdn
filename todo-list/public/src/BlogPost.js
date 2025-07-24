function BlogPost(props) {
  const postId = props.postId;
  const post = props.posts.find(p => p.id === postId);

  if (!post) {
    return <div className="blog-post"><h2>Post not found!</h2><p><a href="#blog">Back to Blog</a></p></div>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><a href="#blog">Back to Blog</a></p>
    </div>
  );
}
