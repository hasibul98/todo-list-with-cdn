function BlogList(props) {
  return (
    <div className="blog-list">
      <h1>Our Blog</h1>
      {props.posts.map((post) => (
        <div key={post.id} className="blog-list-item">
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
          <a href={`#blog/${post.id}`}>Read More</a>
        </div>
      ))}
    </div>
  );
}
