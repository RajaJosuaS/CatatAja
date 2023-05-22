import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';
import NoteCard from '../components/NoteCard';

const SearchScreen = () => {
  const { notes } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const filteredNotes = notes.filter((note) => {
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();
    const keyword = searchText.toLowerCase();
    return title.includes(keyword) || content.includes(keyword);
  });

  const handleNotePress = (note) => {
    navigation.navigate('EditNoteScreen', { note });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search notes"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {searchText !== '' && (
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => <NoteCard note={item} isBookmarkScreen={false} showBookmarkButton={false} editable={filteredNotes.length > 0} handleNotePress={handleNotePress} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default SearchScreen;
