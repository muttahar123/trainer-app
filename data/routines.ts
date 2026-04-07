export type Exercise = {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: number;
  reps: number;
  videoUrl?: string; // We'll use a placeholder or local asset
};

export type Routine = {
  id: string;
  name: string;
  target: string;
  exercises: Exercise[];
};

export const routines: Routine[] = [
  {
    id: "r1",
    name: "Push Day Workout",
    target: "Chest, Shoulders & Triceps",
    exercises: [
      {
        id: "e1",
        name: "Barbell Bench Press",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        sets: 4,
        reps: 8,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder dummy video
      },
      {
        id: "e2",
        name: "Overhead Press",
        muscleGroups: ["Shoulders", "Triceps"],
        sets: 3,
        reps: 10,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e3",
        name: "Tricep Pushdown",
        muscleGroups: ["Triceps"],
        sets: 3,
        reps: 12,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e4",
        name: "Lateral Raises",
        muscleGroups: ["Shoulders"],
        sets: 4,
        reps: 15,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      }
    ]
  },
  {
    id: "r2",
    name: "Pull Day Workout",
    target: "Back & Biceps",
    exercises: [
      {
        id: "e5",
        name: "Deadlift",
        muscleGroups: ["Back", "Legs"],
        sets: 3,
        reps: 5,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e6",
        name: "Pull-ups",
        muscleGroups: ["Back", "Biceps"],
        sets: 3,
        reps: 8,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e7",
        name: "Barbell Curl",
        muscleGroups: ["Biceps"],
        sets: 3,
        reps: 12,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      }
    ]
  },
  {
    id: "r3",
    name: "Leg Day Workout",
    target: "Quads, Hamstrings & Calves",
    exercises: [
      {
        id: "e8",
        name: "Barbell Squat",
        muscleGroups: ["Quads", "Glutes"],
        sets: 4,
        reps: 8,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e9",
        name: "Leg Press",
        muscleGroups: ["Quads"],
        sets: 3,
        reps: 10,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "e10",
        name: "Calf Raises",
        muscleGroups: ["Calves"],
        sets: 4,
        reps: 15,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      }
    ]
  }
];

// Determine the routine based on day of week for simple UX without backend
export function getTodaysRoutine(): Routine {
  const day = new Date().getDay(); // 0 is Sunday, 1 is Monday ...
  // Monday: Push, Tuesday: Pull, Wednesday: Legs
  // Thursday: Push, Friday: Pull, Saturday: Legs
  // Sunday: Rest (we'll just default to Push for demo purposes)
  
  if (day === 1 || day === 4 || day === 0) return routines[0];
  if (day === 2 || day === 5) return routines[1];
  return routines[2];
}
