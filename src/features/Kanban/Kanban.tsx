import React from "react";
import Board from "./Board";
import { IColumn } from "./interfaces";

const sampleData: IColumn[] = [
  {
    id: "1",
    title: "New",
    cards: [
      { id: "1", title: "Task 1", description: "This is task 1" },
      { id: "2", title: "Task 2", description: "This is task 2" },
    ],
  },
  {
    id: "2",
    title: "In review",
    cards: [{ id: "3", title: "Task 3", description: "This is task 3" }],
  },
  {
    id: "3",
    title: "Approved",
    cards: [{ id: "4", title: "Task 4", description: "This is task 4" }],
  },
  {
    id: "4",
    title: "Not approved",
    cards: [{ id: "5", title: "Task 5", description: "This is task 5" }],
  },
];

const Kanban = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Kanban Board</h1>
      <Board columns={sampleData} />
    </div>
  );
};

export default Kanban;
