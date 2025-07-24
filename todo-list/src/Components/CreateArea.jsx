import React, { useState, useRef, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const formRef = useRef();
  const titleInputRef = useRef();
  const textareaRef = useRef();

  function handleChange(e) {
    setNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitNote(e) {
    e.preventDefault();
    props.onAdd(note);
    setNote({ title: "", content: "" });
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);

    
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 0);
  }

  
  useEffect(() => {
    if (!isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  // Click outside to collapse
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          ref={textareaRef}
        />
        {isExpanded && (
          <button type='submit' onClick={submitNote}>
            <IoAddSharp />
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
