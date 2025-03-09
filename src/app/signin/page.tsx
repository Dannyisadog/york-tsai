"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./signin.module.css";
import { SyntheticEvent } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  if (session) {
    window.location.href = "/";
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result && !result.error) {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}
