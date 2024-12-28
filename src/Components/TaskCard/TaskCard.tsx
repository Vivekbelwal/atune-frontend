import { useEffect, useState } from "react";
import "./TaskCard.css";

export type Task = {
  name: string;
  decription: string;
};

function TaskCard() {
  const [task, setTask] = useState<Task | null>(null);
  useEffect(() => {
    setTask({
      name: "Task 1",
      decription: "Description",
    });
  }, []);

  if (task)
    return (
      <div className="task-card">
        <div className="task-name">Name:{task.name ?? "No task"}</div>
        <div className="task-decription">
          Description:{task.decription ?? "No task"}
        </div>
      </div>
    );
}

export default TaskCard;
