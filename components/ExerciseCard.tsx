import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Exercise } from '../data/routines';
import { useWorkoutStore, SetData } from '../store/workoutStore';
import { FontAwesome } from '@expo/vector-icons';
import VideoPlayer from './VideoPlayer';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { workoutProgress, updateSet } = useWorkoutStore();
  const sets = workoutProgress[exercise.id] || [];

  return (
    <View className="bg-[#1C1C1E] rounded-2xl p-4 mb-4 shadow-lg border border-zinc-800">
      {/* Exercise Header */}
      <View className="mb-4">
        <Text className="text-white text-xl font-bold">{exercise.name}</Text>
        <Text className="text-zinc-400 text-sm mt-1">
          Target: {exercise.muscleGroups.join(', ')}
        </Text>
      </View>

      {/* Video Demonstration */}
      {exercise.videoUrl && (
        <View className="mb-6 rounded-xl overflow-hidden">
          <VideoPlayer videoUrl={exercise.videoUrl} />
        </View>
      )}

      {/* Header Row for Sets */}
      <View className="flex-row items-center mb-2 px-2">
        <Text className="text-zinc-500 font-semibold w-12 text-center text-xs tracking-widest uppercase">Set</Text>
        <Text className="text-zinc-500 font-semibold flex-1 text-center text-xs tracking-widest uppercase">Target</Text>
        <Text className="text-zinc-500 font-semibold flex-1 text-center text-xs tracking-widest uppercase">Lbs</Text>
        <Text className="text-zinc-500 font-semibold flex-1 text-center text-xs tracking-widest uppercase">Reps</Text>
        <Text className="text-zinc-500 font-semibold w-12 text-center text-xs tracking-widest uppercase"><FontAwesome name="check" size={12} /></Text>
      </View>

      {/* Sets List */}
      {sets.map((set: SetData, index: number) => {
        const isCompleted = set.completed;

        return (
          <View 
            key={index} 
            className={`flex-row items-center py-2 px-2 mb-2 rounded-lg 
              ${isCompleted ? 'bg-[#2C3E2A] border border-[#406834]' : 'bg-[#2A2A2C] border border-transparent'}`}
          >
            {/* Set Number */}
            <Text className="text-zinc-300 font-bold w-12 text-center text-lg">{index + 1}</Text>
            
            {/* Target Reps */}
            <Text className="text-zinc-400 flex-1 text-center font-medium">{exercise.reps} reps</Text>
            
            {/* Weight Input */}
            <View className="flex-1 px-1">
              <TextInput
                value={set.weight ? set.weight.toString() : ''}
                onChangeText={(val) => updateSet(exercise.id, index, { weight: Number(val) || 0 })}
                keyboardType="numeric"
                className={`bg-[#1C1C1E] text-white p-2 rounded-md text-center font-bold
                  ${isCompleted ? 'opacity-70' : ''}`}
                placeholder="0"
                placeholderTextColor="#555"
                editable={!isCompleted}
              />
            </View>

            {/* Reps Input */}
            <View className="flex-1 px-1">
              <TextInput
                value={set.reps ? set.reps.toString() : ''}
                onChangeText={(val) => updateSet(exercise.id, index, { reps: Number(val) || 0 })}
                keyboardType="numeric"
                className={`bg-[#1C1C1E] text-white p-2 rounded-md text-center font-bold
                  ${isCompleted ? 'opacity-70' : ''}`}
                placeholder="0"
                placeholderTextColor="#555"
                editable={!isCompleted}
              />
            </View>

            {/* Checkmark Button */}
            <View className="w-12 items-center justify-center">
              <TouchableOpacity
                onPress={() => updateSet(exercise.id, index, { completed: !isCompleted })}
                className={`w-8 h-8 rounded-full items-center justify-center 
                  ${isCompleted ? 'bg-[#34C759]' : 'bg-zinc-600'}`}
              >
                <FontAwesome name="check" size={14} color="white" />
              </TouchableOpacity>
            </View>

          </View>
        );
      })}
    </View>
  );
}
