"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "../styles/modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "O título é obrigatório." }) // Verifica se o título não é vazio
    .min(4, { message: "O título deve ter pelo menos 4 caracteres." }), // Verifica se o título tem pelo menos 4 caracteres
});

// Define explicitamente a estrutura do formulário
type FormData = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function AddTaskModal({ onClose, onAdd }: AddTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: FormData) => {
    onAdd(data.title);
    reset();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Nova tarefa</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <label htmlFor="title" className={styles.label}>
              Titulo
            </label>
            <input
              type="text"
              placeholder="Digite"
              {...register("title")}
              className={styles.input}
            />
            {errors.title && (
              <p className={styles.errorMessage}>
                {errors.title.message?.toString()}
              </p>
            )}
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.addButton}>
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
