import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

export default function PostIt({ titolo, testo, onClose }) {
  return (
    <View className="absolute top-12 left-5 right-5 z-50">
      <BlurView
        intensity={60}
        tint="light"
        className="p-5 rounded-2xl border border-white/40 overflow-hidden shadow-lg"
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-lg text-gray-900">{titolo}</Text>
          <Pressable onPress={onClose} className="p-1">
            <Text className="text-gray-500 font-bold text-lg">X</Text>
          </Pressable>
        </View>
        <Text className="text-gray-800 text-base leading-relaxed">
          {testo}
        </Text>
      </BlurView>
    </View>
  );
}
