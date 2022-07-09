import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { mocked } from "jest-mock";
import { startAsync } from 'expo-auth-session';
import fetchMock from "jest-fetch-mock";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-auth-session');

fetchMock.enableMocks();

describe('Auth Hook', () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem("@gofinances:user");
  });
  
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });
  
    const userTest = {
      id: 'any_id',
      email: 'any@email.com',
      name: 'any_name',
      photo: 'any_photo.png',
    };

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});