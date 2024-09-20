"use client";

import { useState } from "react";
import styles from "./styles/page.module.scss";
import DeleteTaskModal from "./components/DeleteTaskModal";
import AddTaskModal from "./components/AddTaskModal";
import { Square, SquareCheck, Trash } from "lucide-react";
import Image from "next/image";
import Logo from "./assets/logo.png";
import { Task } from "./types/tasks";
import { useTasks } from "./hooks/useTasks";
import { useUserName } from "./hooks/useUserName";
import UserNameModal from "./components/UserNameModal";

const initialTasks: Task[] = [
  { id: 1, title: "Lavar as mãos", completed: false },
  { id: 2, title: "Fazer um bolo", completed: false },
  { id: 3, title: "Lavar a louça", completed: false },
  { id: 4, title: "Levar o lixo para fora", completed: true },
];

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks(initialTasks);
  const { userName, saveUserName } = useUserName();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className={styles.container}>
      {!userName && <UserNameModal onNameSet={saveUserName} />}

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" className={styles.logoIcon} />
        </div>
        <h1 className={styles.welcome}>
          Bem-vindo de volta, {userName || "Usuário"}
        </h1>
        <p className={styles.date}>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.taskSection}>
          <h2 className={styles.sectionTitle}>Suas tarefas de hoje</h2>
          {activeTasks.length > 0 ? (
            <ul className={styles.taskList}>
              {activeTasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <label className={styles.checkboxContainer}>
                    <Square
                      size={26}
                      onClick={() => toggleTask(task.id)}
                      color="#0796D3"
                      strokeWidth={1}
                    />
                    <span className={styles.taskTitle}>{task.title}</span>
                  </label>
                  <button
                    onClick={() => {
                      setTaskToDelete(task);
                      setShowDeleteModal(true);
                    }}
                    className={styles.deleteButton}
                  >
                    <Trash size={24} color="#00000061" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>
              Adicione uma nova tarefa no seu dia.
            </p>
          )}
        </div>

        <div className={styles.taskSection}>
          <h2 className={styles.sectionTitle}>Tarefas finalizadas</h2>
          {completedTasks.length > 0 ? (
            <ul className={styles.taskList}>
              {completedTasks.map((task) => (
                <li
                  key={task.id}
                  className={`${styles.taskItem} ${styles.completedTask}`}
                >
                  <label className={styles.checkboxContainer}>
                    <SquareCheck
                      size={26}
                      onClick={() => toggleTask(task.id)}
                      className={styles.checkIcon}
                      color="#0796D3"
                      strokeWidth={1}
                      style={{ backgroundColor: "#f5f8ff" }}
                    />
                    <span className={styles.taskTitle}>{task.title}</span>
                  </label>
                  <button
                    onClick={() => {
                      setTaskToDelete(task);
                      setShowDeleteModal(true);
                    }}
                    className={styles.deleteButton}
                  >
                    <Trash size={20} color="#00000061" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>
              Você ainda não finalizou nenhuma tarefa.
            </p>
          )}
        </div>
      </main>

      <button
        className={styles.addButton}
        onClick={() => setShowAddModal(true)}
      >
        Adicionar nova tarefa
      </button>

      {showAddModal && (
        <AddTaskModal onClose={() => setShowAddModal(false)} onAdd={addTask} />
      )}

      {showDeleteModal && taskToDelete && (
        <DeleteTaskModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => {
            deleteTask(taskToDelete.id);
            setShowDeleteModal(false);
          }}
          taskTitle={taskToDelete.title}
        />
      )}
    </div>
  );
}
