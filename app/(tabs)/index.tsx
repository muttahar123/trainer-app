import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { getTodaysRoutine } from '../../data/routines';
import { useWorkoutStore } from '../../store/workoutStore';
import { FontAwesome } from '@expo/vector-icons';

export default function DashboardScreen() {
  const routine = getTodaysRoutine();
  const { startWorkout, activeRoutine } = useWorkoutStore();

  const handleStart = () => {
    if (activeRoutine?.id !== routine.id) {
      startWorkout(routine);
    }
    router.push(`/workout/${routine.id}`);
  };

  return (
    <ScrollView className="flex-1 bg-[#121212] px-6 pt-6">
      
      {/* Header section */}
      <View className="mb-8">
        <Text className="text-zinc-400 font-bold tracking-widest uppercase text-xs">Today's Focus</Text>
        <Text className="text-white text-3xl font-extrabold mt-1">{routine.name}</Text>
        <View className="flex-row items-center mt-2">
          <FontAwesome name="male" size={16} color="#34C759" />
          <Text className="text-zinc-300 ml-2 font-medium">{routine.target}</Text>
        </View>
      </View>

      {/* Routine Preview Card */}
      <View className="bg-[#1C1C1E] rounded-3xl p-6 shadow-xl border border-zinc-800">
        <View className="flex-row justify-between items-center mb-6 border-b border-zinc-800 pb-4">
          <Text className="text-white text-xl font-bold">Exercises</Text>
          <Text className="text-zinc-400 font-medium">{routine.exercises.length} Total</Text>
        </View>

        {routine.exercises.map((ex, i) => (
          <View key={ex.id} className="flex-row items-center mb-4">
            <View className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center mr-4">
              <Text className="text-zinc-400 font-bold text-xs">{i + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">{ex.name}</Text>
              <Text className="text-zinc-500 text-sm">{ex.sets} sets x {ex.reps} reps</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity 
        className="mt-8 bg-[#34C759] py-4 rounded-2xl items-center shadow-lg"
        onPress={handleStart}
        activeOpacity={0.8}
      >
        <Text className="text-black font-extrabold text-lg uppercase tracking-wider">
          {activeRoutine ? 'Resume Workout' : 'Start Workout'}
        </Text>
      </TouchableOpacity>

      <View className="h-12" />
    </ScrollView>
  );
}
