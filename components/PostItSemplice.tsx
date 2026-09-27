import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function PostItSemplice({ titolo, testo, onClose }) {
  return (
    <View style={{
      position: 'absolute',
      top: 60,
      left: 20,
      right: 20,
      zIndex: 999, // Fondamentale per scavalcare la ScrollView
      elevation: 10,
    }}>
      <View style={{
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Effetto vetro leggero
        borderWidth: 3,
        borderColor: '#111111',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontWeight: '900', fontSize: 18, color: '#111' }}>{titolo}</Text>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <Text style={{ color: '#666', fontWeight: '900', fontSize: 18 }}>X</Text>
          </Pressable>
        </View>
        <Text style={{ color: '#333', fontSize: 15, lineHeight: 22, fontWeight: '600' }}>
          {testo}
        </Text>
      </View>
    </View>
  );
}
