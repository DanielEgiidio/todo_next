"use client";
import { useState, useEffect } from "react";
import { Task } from "../types/tasks";

export const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch {
        setTasks(initialTasks);
        localStorage.setItem("tasks", JSON.stringify(initialTasks));
      }
    } else {
      setTasks(initialTasks);
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }
  }, [initialTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks([
      ...tasks,
      { id: Date.now(), title, completed: false, isNew: true },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, isNew: false }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};
