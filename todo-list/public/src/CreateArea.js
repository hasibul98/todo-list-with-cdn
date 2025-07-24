function CreateArea(props) {
  const [isExpanded, setExpanded] = React.useState(false);
  const [note, setNote] = React.useState({
    title: "",
    content: "",
  });

  const formRef = React.useRef();
  const titleInputRef = React.useRef();
  const contentTextAreaRef = React.useRef();

  function handleChange(e) {
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submitNote(e) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    e.preventDefault();
    setExpanded(false); 
  }

  function expand() {
    setExpanded(true);
  }

  // Effect for handling click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Effect for focusing textarea when expanded
  React.useEffect(() => {
    if (isExpanded && contentTextAreaRef.current) {
      contentTextAreaRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div>
      <form className='create-note' ref={formRef}>
        {isExpanded && (
          <input
            name='title'
            onChange={handleChange}
            value={note.title}
            placeholder='title'
            ref={titleInputRef}
          />
        )}
        <textarea
          name='content'
          onChange={handleChange}
          value={note.content}
          placeholder='take a note'
          rows={isExpanded ? 3 : 1}
          onClick={expand}
          ref={contentTextAreaRef}
        />
        {isExpanded && (
          <button type='submit' onClick={submitNote}>
            ➕
          </button>
        )}
      </form>
    </div>
  );
}
