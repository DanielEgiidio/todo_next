"use client";

import { useState, useEffect } from "react";
import styles from "../styles/modal.module.scss";

interface UserNameModalProps {
  onNameSet: (name: string) => void;
}

export default function UserNameModal({ onNameSet }: UserNameModalProps) {
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      onNameSet(storedName);
    }
  }, [onNameSet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput) {
      localStorage.setItem("userName", nameInput);
      onNameSet(nameInput);
      setNameInput("");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Bem-vindo!</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.label}>
              Qual é o seu nome?
            </label>
            <input
              id="name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className={styles.input}
              placeholder="Digite seu nome"
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
