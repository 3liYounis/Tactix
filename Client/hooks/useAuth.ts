// Custom hook for authentication
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { AuthService, AuthState } from '../services/authService';
import { firebaseConfig } from '../services/firebaseConfig';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: false,
  });

  // Keep auth state in sync with Firebase via AuthService subscriber
  useEffect(() => {
    const authService = AuthService.getInstance();
    // Prime local state with current value
    setAuthState(authService.getAuthState());
    const unsubscribe = authService.subscribe((state) => setAuthState(state));
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const authService = AuthService.getInstance();
    const result = await authService.signIn(email, password);

    if (result.success) {
      const authState = authService.getAuthState();
      setAuthState(authState);
    }

    return result;
  }, []);

  const signUp = useCallback(async (email: string, password: string, confirmPassword: string) => {
    const authService = AuthService.getInstance();
    const result = await authService.signUp(email, password, confirmPassword);

    if (result.success) {
      const authState = authService.getAuthState();
      setAuthState(authState);
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    const authService = AuthService.getInstance();
    await authService.signOut();

    // Clear auth state
    setAuthState(prev => ({ ...prev, isLoggedIn: false, user: null }));
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const authService = AuthService.getInstance();
    return await authService.resetPassword(email);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const authService = AuthService.getInstance();
    try {
      WebBrowser.maybeCompleteAuthSession();

      // Use the default redirect URI for Expo
      const redirectUri = AuthSession.makeRedirectUri();

      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };

      const request = new AuthSession.AuthRequest({
        clientId: firebaseConfig.GOOGLE_WEB_CLIENT_ID as string,
        redirectUri,
        responseType: AuthSession.ResponseType.IdToken,
        scopes: ['openid', 'email', 'profile'],
        extraParams: {},
        usePKCE: false,
      });

      console.log('Redirect URI:', redirectUri);
      console.log('Client ID:', firebaseConfig.GOOGLE_WEB_CLIENT_ID);

      const resultAsync = await request.promptAsync(discovery);

      if (resultAsync.type !== 'success') {
        return { success: false, error: 'Google sign-in cancelled' };
      }

      const idToken = resultAsync.params?.id_token as string;
      if (!idToken) {
        return { success: false, error: 'Failed to get ID token from Google' };
      }

      const result = await authService.signInWithGoogle(idToken);
      if (result.success)
        setAuthState(authService.getAuthState());
      return result;
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      return { success: false, error: error?.message ?? 'Failed to sign in with Google' };
    }
  }, []);

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
  };
};
