function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentPath, setCurrentPath] = React.useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  let content;
  const pathParts = currentPath.split('/');
  const route = pathParts[0];
  const id = pathParts[1];

  if (route === "" || route === "#home") {
    content = (
      <>
        <CreateArea onAdd={addNote} />
        <div className="flex-container">
          {notes.map((noteItem, index) => (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </>
    );
  } else if (route === "#about") {
    content = <About />;
  } else if (route === "#blog") {
    if (id) {
      content = <BlogPost postId={id} posts={blogPosts} />;
    } else {
      content = <BlogList posts={blogPosts} />;
    }
  }

  return (
    <div>
      <Header />
      <nav>
        <a href="#home">Home</a> | <a href="#about">About</a> | <a href="#blog">Blog</a>
      </nav>
      {content}
      <Footer />
    </div>
  );
}
