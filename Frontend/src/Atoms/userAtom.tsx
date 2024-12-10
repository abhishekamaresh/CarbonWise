import { atom } from 'recoil';

interface UserState {
  username: string;
  email: string;
  userId: string;
  token: string;
}

export const UserAtom = atom<UserState | null>({
  key: 'UserAtom',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      // Check if there's a saved user in sessionStorage or localStorage
      const savedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (savedUser) {
        setSelf(JSON.parse(savedUser));  // Set the user from sessionStorage or localStorage
      }

      // Sync the atom with sessionStorage or localStorage on change
      onSet((newValue) => {
        if (newValue) {
          sessionStorage.setItem('user', JSON.stringify(newValue));  // Save user to sessionStorage
        } else {
          sessionStorage.removeItem('user');  // Remove user from sessionStorage
        }
      });
    },
  ],
});
