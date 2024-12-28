import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { BoardState } from "./TaskBoard.types";
import Column from "./Column";

const initialData: BoardState = {
  todo: {
    id: "todo",
    name: "To Do",
    tasks: [
      { id: "1", content: "Task 1" },
      { id: "2", content: "Task 2" },
      { id: "3", content: "Task 3" },
    ],
  },
  inProgress: {
    id: "inProgress",
    name: "In Progress",
    tasks: [
      { id: "4", content: "Task 4" },
      { id: "5", content: "Task 5" },
    ],
  },
  done: {
    id: "done",
    name: "Done",
    tasks: [{ id: "6", content: "Task 6" }],
  },
};

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState<BoardState>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a valid droppable
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get source and destination columns
    const sourceColumn = columns[source.droppableId as keyof BoardState];
    const destinationColumn =
      columns[destination.droppableId as keyof BoardState];

    if (!sourceColumn || !destinationColumn) {
      return;
    }

    // Create new arrays to avoid mutating state directly
    const sourceTasks = Array.from(sourceColumn.tasks);
    const [removedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      sourceTasks.splice(destination.index, 0, removedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
      });
    } else {
      // Moving to a different column
      const destinationTasks = Array.from(destinationColumn.tasks);
      destinationTasks.splice(destination.index, 0, removedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          tasks: destinationTasks,
        },
      });
    }
  };

  const list = [
    { id: "1", name: 0 },
    { id: "2", name: 1 },
    { id: "3", name: 2 },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
        <h3 style={{ padding: "8px", margin: 0 }}>{"Droppable"}</h3>

        <Droppable droppableId={"A"}>
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
              {list.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
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
                          ...(provided.draggableProps.style || {}),
                        }}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>

    // <DragDropContext onDragEnd={onDragEnd}>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       padding: "20px",
    //       minHeight: "100vh",
    //     }}
    //   >
    //     {Object.values(columns).map((column) => (
    //       <Column key={column.id} column={column} />
    //     ))}
    //   </div>
    // </DragDropContext>
  );
};

export default TaskBoard;
