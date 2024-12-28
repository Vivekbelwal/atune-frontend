import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import Task from "./Task";
import { Column as ColumnType } from "./TaskBoard.types";

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div
      style={{
        margin: "8px",
        border: "1px solid lightgray",
        borderRadius: "4px",
        width: "30%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ padding: "8px", margin: 0 }}>{column.name}</h3>
      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: "8px",
              background: "#f4f5f7",
              minHeight: "100px",
              flexGrow: 1,
            }}
          >
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
