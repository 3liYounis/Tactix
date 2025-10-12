import type { User as FirebaseUser } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { AppState } from 'react-native';
import { auth } from './firebaseManager';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}

export class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
  };

  private unsubscribeAuth?: () => void;
  private listeners: ((state: AuthState) => void)[] = [];

  private constructor() {
    this.unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      this.authState = {
        isLoggedIn: !!firebaseUser,
        user: firebaseUser ? this.mapFirebaseUser(firebaseUser) : null,
        isLoading: false,
      };
      this.notifyListeners();
    });

    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        try {
          if (auth.currentUser) {
            await reload(auth.currentUser);
          }
        } catch {
          this.authState = { isLoggedIn: false, user: null, isLoading: false };
          this.notifyListeners();
        }
      }
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance)
      AuthService.instance = new AuthService();
    return AuthService.instance;
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getAuthState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getAuthState()));
  }
  getAuthState(): AuthState {
    return { ...this.authState };
  }
  private mapFirebaseUser(firebaseUser: FirebaseUser): AuthUser {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email ?? '',
      name: firebaseUser.displayName ?? (firebaseUser.email ? firebaseUser.email.split('@')[0] : ''),
      profilePicture: firebaseUser.photoURL ?? undefined,
    };
  }
  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to sign in' };
    }
  }
  async signUp(email: string, password: string, confirmPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (password !== confirmPassword)
        return { success: false, error: 'Passwords do not match' };

      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to sign up' };
    }
  }
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to send reset email' };
    }
  }
  async signInWithGoogle(idToken?: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!idToken)
        return { success: false, error: 'Google ID token is required' };
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      return { success: true };
    }
    catch (error: any) {
      return { success: false, error: error?.message ?? 'Failed to sign in with Google' };
    }
  }
}
