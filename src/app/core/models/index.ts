export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description: string;
}

export interface WorkoutSet {
  id?: number;
  setNumber: number;
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  id?: number;
  workoutId: number;
  exerciseId: number;
  exerciseName?: string;
  orderIndex: number;
  sets: WorkoutSet[];
}

export interface Workout {
  id?: number;
  name: string;
  date: string;
  notes: string;
  userId?: number;
}

export interface AuthResponse {
  token: string;
}

export interface VolumeDTO {
  date: string;
  workoutName: string;
  totalVolume: number;
}

export interface PersonalRecordDTO {
  exerciseName: string;
  maxWeight: number;
  reps: number;
  achievedAt: string;
}

export interface ProgressionDTO {
  exerciseName: string;
  date: string;
  maxWeightOnDay: number;
}

export interface WorkoutFrequencyDTO {
  week: string;
  workoutCount: number;
}
