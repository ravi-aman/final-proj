"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiPlus} from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface Todo {
    id: number;
    title: string;
    tags: string[];
    dueDate: string;
    priority: "Low" | "Medium" | "High";
    completed: boolean;
}

export default function AdvancedToDoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [newTags, setNewTags] = useState<string>("");
    const [newDueDate, setNewDueDate] = useState<string>("");
    const [newPriority, setNewPriority] = useState<"Low" | "Medium" | "High">(
        "Low"
    );
    const [filterTag, setFilterTag] = useState<string>("");
    const [filterPriority, setFilterPriority] = useState<string>("");

    const addTodo = () => {
        if (newTodo.trim() === "") return; // Prevent adding empty tasks
        const newTask: Todo = {
            id: Date.now(),
            title: newTodo,
            tags: newTags.split(",").map((tag) => tag.trim()),
            dueDate: newDueDate,
            priority: newPriority,
            completed: false,
        };
        setTodos([...todos, newTask]);
        setNewTodo("");
        setNewTags("");
        setNewDueDate("");
        setNewPriority("Low");
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        const matchesTag =
            filterTag === "" || todo.tags.includes(filterTag.toLowerCase());
        const matchesPriority =
            filterPriority === "" || todo.priority === filterPriority;
        return matchesTag && matchesPriority;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-purple-500 flex flex-col items-center py-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full bg-white shadow-2xl rounded-lg p-8"
            >
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-10 animate-pulse">
                    Advanced To-Do Manager 🚀
                </h1>

                {/* Add To-Do Form */}
                <div className="space-y-4 mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Enter a new task"
                            className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-purple-400 transition shadow-sm"
                        />
                        <motion.button
                            onClick={addTodo}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-800 transition"
                        >
                            <FiPlus size={18} />
                            Add Task
                        </motion.button>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newTags}
                            onChange={(e) => setNewTags(e.target.value)}
                            placeholder="Add tags (comma-separated)"
                            className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-blue-400 transition shadow-sm"
                        />
                        <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-green-400 transition shadow-sm"
                        />
                        <select
                            value={newPriority}
                            onChange={(e) =>
                                setNewPriority(e.target.value as "Low" | "Medium" | "High")
                            }
                            className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-red-400 transition shadow-sm"
                        >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                        </select>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                        placeholder="Filter by tag"
                        className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-blue-400 transition shadow-sm"
                    />
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="border border-gray-300 rounded-full px-5 py-3 focus:ring-4 focus:ring-red-400 transition shadow-sm"
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                </div>

                {/* To-Do List */}
                <ul className="space-y-4">
                    <AnimatePresence>
                        {filteredTodos.map((todo) => (
                            <motion.li
                                key={todo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className={`flex items-center justify-between p-5 rounded-lg shadow-md bg-gray-100 ${todo.completed ? "opacity-75" : ""
                                    }`}
                            >
                                <div>
                                    <h3
                                        className={`text-lg font-bold ${todo.completed ? "line-through text-gray-500" : ""
                                            }`}
                                    >
                                        {todo.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Tags: {todo.tags.join(", ") || "No tags"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Due: {todo.dueDate || "No due date"}
                                    </p>
                                    <p
                                        className={`text-sm font-bold ${todo.priority === "High"
                                                ? "text-red-600"
                                                : todo.priority === "Medium"
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                            }`}
                                    >
                                        Priority: {todo.priority}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <motion.button
                                        onClick={() => toggleComplete(todo.id)}
                                        whileHover={{ scale: 1.1 }}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <AiOutlineCheckCircle size={24} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => deleteTodo(todo.id)}
                                        whileHover={{ scale: 1.1 }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 size={24} />
                                    </motion.button>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {/* No Tasks Message */}
                {filteredTodos.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-gray-500 mt-6"
                    >
                        No tasks match your filters! 🧐
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
