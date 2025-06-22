/**
 * @namespace Types
 */

/**
 * Represents a single intern within the management system.
 * @typedef {object} Types.Intern
 * @property {number} id - The unique identifier for the intern.
 * @property {string} name - The full name of the intern.
 * @property {string} email - The email address of the intern.
 * @property {string} department - The department the intern is assigned to.
 * @property {'Onboarding' | 'Completed' | 'Pending Docs'} status - The current status of the intern.
 * @property {string} avatar - The URL to the intern's avatar image.
 * @property {Types.InternDocuments} documents - An object containing the intern's documents.
 */

/**
 * @typedef {object} Types.InternDocument
 * @property {{name: string, size: number}} file - The file object.
 * @property {string} uploadDate - The ISO 8601 date string of when the file was uploaded.
 */

/**
 * Represents the documents associated with an intern.
 * Each property can hold a document object or be null.
 * @typedef {object} Types.InternDocuments
 * @property {Types.InternDocument | null} resume - The intern's resume.
 * @property {Types.InternDocument | null} governmentId - The intern's government-issued ID.
 * @property {Types.InternDocument | null} signedAgreement - The signed internship agreement.
 * @property {Types.InternDocument | null} joiningLetter - The official joining letter.
 */

// This file is for documentation purposes and to provide type definitions for JSDoc.
// It is not imported or used directly in the application's runtime.
export {};

// Intern data structure and status options
export const INTERN_STATUSES = ['Onboarding', 'Completed', 'Pending Docs'];

// Example intern object structure:
// {
//   id: string,
//   name: string,
//   email: string,
//   department: string,
//   status: 'Onboarding' | 'Completed' | 'Pending Docs',
//   documents: {
//     resume: File | null,
//     governmentId: File | null,
//     signedAgreement: File | null,
//     joiningLetter: File | null,
//   },
//   avatar?: string
// }