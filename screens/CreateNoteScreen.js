import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AppContext } from '../AppContext';

const CreateNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { notes, setNotes } = useContext(AppContext);

  const saveNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      isBookmarked: false,
    };
    setNotes([...notes, newNote]);
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

export default CreateNoteScreen;
