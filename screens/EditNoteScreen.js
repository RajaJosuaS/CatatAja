import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AppContext } from '../AppContext';

const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { notes, setNotes } = useContext(AppContext);

  const saveNote = () => {
    const updatedNotes = notes.map((item) => (item.id === note.id ? { ...item, title, content } : item));
    setNotes(updatedNotes);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ fontSize: 24, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{ flex: 1, fontSize: 18, paddingTop: 20 }}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Save" onPress={saveNote} />
    </View>
  );
};

export default EditNoteScreen;
