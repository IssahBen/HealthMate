/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { generateId } from "./generatedId";
import { useData } from "./DataContext";
const GoalContext = createContext(undefined);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [activeGoal, setActiveGoal] = useState(null);
  const { destroyAccount, setDestroyAccount } = useData();
  const GOALS_KEY = "goals";

  // Load goals from SecureStore on initial render
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await SecureStore.getItemAsync(GOALS_KEY);
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          setGoals(parsedGoals);

          if (parsedGoals.length > 0 && !activeGoal) {
            setActiveGoal(parsedGoals[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load goals from SecureStore:", error);
      }
    };

    loadGoals();
  }, []);

  // Save goals to SecureStore whenever they change
  useEffect(() => {
    const saveGoals = async () => {
      try {
        await SecureStore.setItemAsync(GOALS_KEY, JSON.stringify(goals));
      } catch (error) {
        console.error("Failed to save goals to SecureStore:", error);
      }
    };

    saveGoals();
  }, [goals]);

  useEffect(() => {
    if (!destroyAccount) return;
    const deleteAllGoals = async () => {
      console.log("Deleting all goals...");
      try {
        await SecureStore.setItemAsync(GOALS_KEY, JSON.stringify([]));
        // Clear from storage
        setGoals([]); // Clear from state
        setActiveGoal(null); // Clear active goal';
        return "success";
      } catch (error) {
        console.error("Failed to delete all goals:", error);
      }
    };
    deleteAllGoals();
  }, [destroyAccount]);

  const addGoal = (title, totalHours, hoursPerDay) => {
    const newGoal = {
      id: generateId(),
      title,
      totalHours,
      hoursPerDay,
      progress: Array(totalHours).fill(false),
      createdAt: new Date().toISOString(),
    };

    setGoals((prev) => [...prev, newGoal]);
    setActiveGoal(newGoal);
  };

  const updateGoalProgress = (goalId, index) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const updatedProgress = [...goal.progress];
          updatedProgress[index] = !updatedProgress[index];
          const updatedGoal = { ...goal, progress: updatedProgress };

          if (activeGoal?.id === goalId) {
            setActiveGoal(updatedGoal);
          }

          return updatedGoal;
        }
        return goal;
      })
    );
  };

  const resetGoal = (goalId) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const updatedGoal = {
            ...goal,
            progress: Array(goal.totalHours).fill(false),
          };

          if (activeGoal?.id === goalId) {
            setActiveGoal(updatedGoal);
          }

          return updatedGoal;
        }
        return goal;
      })
    );
  };

  const deleteGoal = (goalId) => {
    const remaining = goals.filter((goal) => goal.id !== goalId);
    setGoals(remaining);

    if (activeGoal?.id === goalId) {
      setActiveGoal(remaining.length > 0 ? remaining[0] : null);
    }
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        activeGoal,
        setActiveGoal,
        addGoal,
        updateGoalProgress,
        resetGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error("useGoal must be used within a GoalProvider");
  }
  return context;
};
