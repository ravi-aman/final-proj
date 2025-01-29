interface ToDoItemProps {
    id: string;
    title: string;
    completed: boolean;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default function ToDoItem({ id, title, completed, onDelete, onToggle }: ToDoItemProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    className="mr-2"
                />
                <span className={completed ? "line-through" : ""}>{title}</span>
            </div>
            <button onClick={() => onDelete(id)} className="text-red-500">
                Delete
            </button>
        </div>
    );
}
