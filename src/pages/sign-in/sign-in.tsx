import React from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

export default function SignIn(): React.JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          {/* Для дальнейшей разработки страницы
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div> */}
          {/* Для дальнейшей разработки страницы
          <div className="sign-in__message">
            <p>
              We can’t recognize this email <br /> and password combination.
              Please try again.
            </p>
          </div>*/}
          <div className="sign-in__fields">
            {/* sign-in__field--error для отображения ошибки*/}
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
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
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
