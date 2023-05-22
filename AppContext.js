import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (note) => {
    if (bookmarks.some((bookmark) => bookmark.id === note.id)) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== note.id));
    } else {
      setBookmarks([...bookmarks, note]);
    }
  };

  return (
    <AppContext.Provider value={{ notes, setNotes, bookmarks, toggleBookmark }}>
      {children}
    </AppContext.Provider>
  );
};
