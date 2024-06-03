import { useMemo, useEffect } from "react"; // Import necessary hooks from the React library

export function useKeyboard() {
  const keyboard: Record<string, boolean> = useMemo(() => ({}), []); // Create a memoized object to store keyboard state

  // Event handler for keydown event
  const keydown = (e: KeyboardEvent) => (keyboard[e.key.toLowerCase()] = true); // Set the corresponding key in the keyboard object to true when pressed

  // Event handler for keyup event
  const keyup = (e: KeyboardEvent) => (keyboard[e.key.toLowerCase()] = false); // Set the corresponding key in the keyboard object to false when released

  useEffect(() => {
    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
    };
  });

  return keyboard; // Return the keyboard object with the current keyboard state
}
