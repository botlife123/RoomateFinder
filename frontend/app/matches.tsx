import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Matches() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      <Text style={styles.subtitle}>See who's interested in rooming with you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
