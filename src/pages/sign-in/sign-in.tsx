import React, { FormEvent, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { loginUser } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { EMAIL_PATTERN } from '../../consts/validation-patterns.ts';
import {
  getAuthHasError,
  getAuthStatus,
} from '../../store/user-process/user-process.selector.ts';
import { AuthorizationStatus } from '../../enums/authorization-status.ts';

export default function SignIn(): React.JSX.Element {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(getAuthHasError);

  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (emailRef.current !== null && passwordRef.current !== null) {
      if (!EMAIL_PATTERN.test(emailRef.current?.value)) {
        setError('Please enter a valid email address');
        return;
      }

      if (
        !(
          /[a-z]/i.test(passwordRef.current.value) &&
          /[0-9]/.test(passwordRef.current.value)
        )
      ) {
        setError(
          'Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character'
        );
        return;
      }

      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      ).catch(() => {
        setError('Ошибка сервера');
      });
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {(error || hasError) && (
            <div className="sign-in__message">
              <p>{error}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div
              className={`sign-in__field ${
                error ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="login-element"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div
              className={`sign-in__field ${
                error ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password-element"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              data-testid="sign-in-btn"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
