import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useWorkoutStore } from '../../store/workoutStore';
import ExerciseCard from '../../components/ExerciseCard';
import { FontAwesome } from '@expo/vector-icons';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const { activeRoutine, finishWorkout, cancelWorkout } = useWorkoutStore();

  useEffect(() => {
    // If there's no active routine but the screen is mounted, redirect back
    if (!activeRoutine) {
      router.replace('/(tabs)');
    }
  }, [activeRoutine]);

  if (!activeRoutine) return null;

  const handleFinish = () => {
    Alert.alert(
      "Complete Workout",
      "Are you sure you want to finish this session?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Finish", 
          style: "default",
          onPress: () => {
            finishWorkout();
            router.push('/(tabs)/history');
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Workout",
      "Do you really want to end this session? Your progress will be lost.",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: () => {
            cancelWorkout();
            router.replace('/(tabs)');
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{
          title: "Active Workout",
          headerStyle: { backgroundColor: '#1C1C1E' },
          headerTintColor: '#FFF',
          headerLeft: () => (
            <TouchableOpacity onPress={handleCancel} className="ml-4">
              <Text className="text-red-400 font-semibold text-base py-2">End</Text>
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {activeRoutine.exercises.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E]/95 border-t border-zinc-800 p-6 pt-4 pb-8">
        <TouchableOpacity 
          className="bg-[#34C759] py-4 rounded-xl flex-row justify-center items-center shadow-lg"
          onPress={handleFinish}
        >
          <FontAwesome name="check-circle" size={20} color="black" />
          <Text className="text-black font-extrabold text-lg ml-3 tracking-wide">FINISH WORKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
