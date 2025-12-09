// src/types/index.ts
export type Player = 'white' | 'black' | null;

export interface TimeControl {
    minutes: number;
    increment: number;
}