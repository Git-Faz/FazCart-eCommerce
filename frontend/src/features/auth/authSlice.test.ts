import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { login, logout, register } from './authSlice';
import * as authApi from './api';

vi.mock('./api');

const token = `header.${btoa(JSON.stringify({ sub: 42, exp: Math.floor(Date.now() / 1000) + 3600 })).replace(/=/g, '')}.signature`;

function makeStore() {
  return configureStore({ reducer: { auth: reducer } });
}

describe('auth slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('logs in, derives the user from the token, and persists the session', async () => {
    vi.mocked(authApi.login).mockResolvedValue({
      data: { token, username: 'faz', email: 'faz@example.com', role: 'USER' },
    } as never);
    const store = makeStore();

    await store.dispatch(login({ username: 'faz', password: 'secret1' }));

    expect(store.getState().auth).toMatchObject({
      user: { id: 42, username: 'faz', email: 'faz@example.com', role: ['USER'] },
      token,
      status: 'idle',
      error: null,
    });
    expect(JSON.parse(localStorage.getItem('user') ?? '')).toMatchObject({ id: 42 });
    expect(localStorage.getItem('token')).toBe(token);
  });

  it('maps unauthorized login failures to a useful message', async () => {
    vi.mocked(authApi.login).mockRejectedValue({ response: { status: 401 } });
    const store = makeStore();

    await store.dispatch(login({ username: 'bad', password: 'badpass' }));

    expect(store.getState().auth).toMatchObject({
      status: 'error',
      error: 'Invalid username or password',
    });
  });

  it('registers and stores the returned user and token', async () => {
    const user = { id: 7, username: 'new-user', email: 'new@example.com', role: ['USER'] };
    vi.mocked(authApi.register).mockResolvedValue({ data: { user, token } } as never);
    const store = makeStore();

    await store.dispatch(register({ email: user.email, username: user.username, password: 'secret1' }));

    expect(store.getState().auth).toMatchObject({ user, token, status: 'idle' });
    expect(JSON.parse(localStorage.getItem('user') ?? '')).toEqual(user);
  });

  it('logs out and clears persisted credentials', async () => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id: 42 }));
    const store = makeStore();

    store.dispatch(logout());

    expect(store.getState().auth).toEqual({ user: null, token: null, status: 'idle', error: null });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
