import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, Exercise } from '../data/routines';

export type SetData = {
  reps: number;
  weight: number;
  completed: boolean;
};

// Maps exercise ID to an array of sets
export type WorkoutProgress = Record<string, SetData[]>;

export type CompletedWorkout = {
  id: string; // UUID for the workout session
  routineId: string;
  routineName: string;
  date: string; // ISO string
  durationMinutes: number;
  progress: WorkoutProgress;
};

interface WorkoutState {
  activeRoutine: Routine | null;
  workoutProgress: WorkoutProgress;
  startTime: number | null;
  history: CompletedWorkout[];

  // Actions
  startWorkout: (routine: Routine) => void;
  updateSet: (exerciseId: string, setIndex: number, data: Partial<SetData>) => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;
  clearHistory: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      activeRoutine: null,
      workoutProgress: {},
      startTime: null,
      history: [],

      startWorkout: (routine: Routine) => {
        // Initialize progress tracker for the routine
        const progress: WorkoutProgress = {};
        routine.exercises.forEach((ex) => {
          progress[ex.id] = Array.from({ length: ex.sets }).map(() => ({
            reps: ex.reps, // target reps default
            weight: 0,
            completed: false,
          }));
        });

        set({
          activeRoutine: routine,
          workoutProgress: progress,
          startTime: Date.now(),
        });
      },

      updateSet: (exerciseId, setIndex, data) => {
        set((state) => {
          const exerciseSets = [...(state.workoutProgress[exerciseId] || [])];
          if (exerciseSets[setIndex]) {
            exerciseSets[setIndex] = { ...exerciseSets[setIndex], ...data };
          }
          return {
            workoutProgress: {
              ...state.workoutProgress,
              [exerciseId]: exerciseSets,
            },
          };
        });
      },

      finishWorkout: () => {
        const { activeRoutine, workoutProgress, startTime, history } = get();
        if (!activeRoutine || !startTime) return;

        const durationMinutes = Math.round((Date.now() - startTime) / 60000);

        const completedWorkout: CompletedWorkout = {
          id: Math.random().toString(36).substring(2, 9),
          routineId: activeRoutine.id,
          routineName: activeRoutine.name,
          date: new Date().toISOString(),
          durationMinutes,
          progress: workoutProgress,
        };

        set({
          history: [completedWorkout, ...history],
          activeRoutine: null,
          workoutProgress: {},
          startTime: null,
        });
      },

      cancelWorkout: () => {
        set({
          activeRoutine: null,
          workoutProgress: {},
          startTime: null,
        });
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'fitness-workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
