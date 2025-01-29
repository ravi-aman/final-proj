import { useState } from "react";

interface ToDoFormProps {
    onSubmit: (title: string) => void;
}

export default function ToDoForm({ onSubmit }: ToDoFormProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title);
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Enter a task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>
        </form>
    );
}
