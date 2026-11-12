/**
 * Dynamic 3-Digit Cryptographic Passcode Generator & Validator
 * Generates an independent, random 3-digit code for each student session.
 * Never fixed to 269!
 */

export interface GeneratedCode {
  digits: [number, number, number];
  fullCode: string;
}

const STORAGE_KEY_STUDENT_CODE = 'after_last_bell_passcode_student_v5';
const STORAGE_KEY_TEACHER_CODE = 'after_last_bell_passcode_teacher_v5';

/**
 * Generates 3 random single digits (0-9)
 */
export function generateRandomPasscode(): GeneratedCode {
  const array = new Uint8Array(3);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    array[0] = Math.floor(Math.random() * 256);
    array[1] = Math.floor(Math.random() * 256);
    array[2] = Math.floor(Math.random() * 256);
  }

  const d1 = (array[0] % 9) + 1; // 1-9 for clarity
  const d2 = (array[1] % 9) + 1;
  const d3 = (array[2] % 9) + 1;

  return {
    digits: [d1, d2, d3],
    fullCode: `${d1}${d2}${d3}`,
  };
}

/**
 * Loads or initializes the passcode for the specified mode
 */
export function getOrCreatePasscode(isTeacher: boolean): GeneratedCode {
  const key = isTeacher ? STORAGE_KEY_TEACHER_CODE : STORAGE_KEY_STUDENT_CODE;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed.digits) &&
        parsed.digits.length === 3 &&
        typeof parsed.fullCode === 'string'
      ) {
        return parsed as GeneratedCode;
      }
    }
  } catch {}

  const newCode = generateRandomPasscode();
  savePasscode(isTeacher, newCode);
  return newCode;
}

export function savePasscode(isTeacher: boolean, code: GeneratedCode): void {
  const key = isTeacher ? STORAGE_KEY_TEACHER_CODE : STORAGE_KEY_STUDENT_CODE;
  try {
    localStorage.setItem(key, JSON.stringify(code));
  } catch {}
}

export function resetPasscode(isTeacher: boolean): GeneratedCode {
  const newCode = generateRandomPasscode();
  savePasscode(isTeacher, newCode);
  return newCode;
}
