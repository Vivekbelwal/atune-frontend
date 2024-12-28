import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Task as TaskType } from "./TaskBoard.types";

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "8px",
            margin: "0 0 8px 0",
            border: "1px solid lightgray",
            borderRadius: "4px",
            background: "#fff",
            // Ensure drag styles are properly applied by spreading them last
            ...(provided.draggableProps.style || {}),
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
