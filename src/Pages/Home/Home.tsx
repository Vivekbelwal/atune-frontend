import { TaskBoard, TaskCard } from "../../Components";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="page">
        <div className="task-section">
          <TaskCard />
        </div>
        <div className="board-section">
          <TaskBoard />
        </div>
      </div>
    </>
  );
}

export default Home;
