// src/pages/LoginPage.jsx
import React from "react";
import "./index.scss";

import PreHeader from "../../components/pre-header";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function LoginPage() {
  /* impede recarregar enquanto não houver backend, depois remover */
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="login-container">
      <PreHeader />
      <Header />

      <main className="login-main"> 
        <div className="login-card">
          <img src="/logo192.png" alt="Logo" className="login-logo" />

          <h2 className="login-title">Login</h2>

          <button className="social-btn facebook-btn">
            Continue with Facebook
          </button>
          <button className="social-btn google-btn">
            Continue with Google
          </button>

          <div className="separator-wrapper">
            <hr className="separator-line" />
            <span className="separator-text">OR</span>
            <hr className="separator-line" />
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              required
            />

            <div className="forgot-wrapper">
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="access-btn">
              Access
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
