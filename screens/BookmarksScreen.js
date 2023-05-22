import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../AppContext';
import NoteCard from '../components/NoteCard';

const BookmarksScreen = ({ navigation }) => {
  const { notes, bookmarks } = useContext(AppContext);

  const handleNotePress = (note) => {
    navigation.navigate('EditNote', { note });
  };

  const bookmarkedNotes = notes.filter((note) => bookmarks.some((bookmark) => bookmark.id === note.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedNotes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotePress(item)}>
            <NoteCard note={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default BookmarksScreen;