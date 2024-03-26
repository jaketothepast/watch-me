import { atom } from "jotai";

// Handle our various state values here, and use them throughout the application. Define Jotai atoms
//

/**
 * Atom for tracking application state. Can be one of editing, or session
 **/
export const stateAtom = atom('editing');
