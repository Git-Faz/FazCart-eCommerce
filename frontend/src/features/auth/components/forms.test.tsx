import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { renderWithProviders } from '@/test/test-utils';
import * as authSlice from '@/features/auth/authSlice';

vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn(), info: vi.fn() } }));

describe('auth forms', () => {
  it('shows login validation errors without dispatching', () => {
    const dispatch = vi.spyOn(authSlice, 'login');
    renderWithProviders(<LoginForm />);

    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.getByText('Enter a valid username')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('dispatches valid login credentials', () => {
    const loginThunk = vi.spyOn(authSlice, 'login').mockReturnValue({ type: 'auth/login' } as never);
    renderWithProviders(<LoginForm />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'faz' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'secret1' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

    expect(loginThunk).toHaveBeenCalledWith({ username: 'faz', password: 'secret1' });
  });

  it('validates registration fields and dispatches valid data', () => {
    const registerThunk = vi.spyOn(authSlice, 'register').mockReturnValue({ type: 'auth/register' } as never);
    renderWithProviders(<RegisterForm />);

    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByText('Enter proper email')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid username')).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'new@example.com' } });
    fireEvent.change(inputs[1], { target: { value: 'new-user' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'secret1' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

    expect(registerThunk).toHaveBeenCalledWith({
      email: 'new@example.com',
      username: 'new-user',
      password: 'secret1',
    });
  });
});
