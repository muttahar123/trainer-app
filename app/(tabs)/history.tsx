import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useWorkoutStore } from '../../store/workoutStore';
import { FontAwesome } from '@expo/vector-icons';

export default function HistoryScreen() {
  const { history, clearHistory } = useWorkoutStore();

  const renderItem = ({ item }: { item: any }) => {
    const date = new Date(item.date).toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    });

    return (
      <View className="bg-[#1C1C1E] rounded-2xl p-5 mb-4 shadow-lg border border-zinc-800 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg font-bold mb-1">{item.routineName}</Text>
          <View className="flex-row items-center">
            <FontAwesome name="calendar" size={12} color="#888" />
            <Text className="text-zinc-400 text-sm ml-2">{date}</Text>
            <View className="w-1 h-1 bg-zinc-600 rounded-full mx-2" />
            <FontAwesome name="clock-o" size={12} color="#888" />
            <Text className="text-zinc-400 text-sm ml-1">{item.durationMinutes} min</Text>
          </View>
        </View>
        <FontAwesome name="chevron-right" size={14} color="#555" />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#121212] px-6 pt-6">
      <View className="flex-row justify-between items-end mb-6">
        <Text className="text-white text-3xl font-extrabold">Logbook</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} className="pb-1">
            <Text className="text-red-400 font-semibold text-sm">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View className="flex-1 items-center justify-center mb-20">
          <FontAwesome name="inbox" size={48} color="#333" className="mb-4" />
          <Text className="text-zinc-500 font-medium text-lg">No workouts completed yet.</Text>
          <Text className="text-zinc-600 text-sm mt-2 text-center">Your finished workouts will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}
