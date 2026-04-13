import React from "react";

import "./jiraBoard.css";

const COLUMNS = ["To Do", "In Progress", "Done"];

const TICKETS = [
  { id: 1, title: "Task 1", status: "To Do" },
  { id: 4, title: "Task 4", status: "To Do" },
  { id: 7, title: "Task 7", status: "To Do" },
  { id: 10, title: "Task 10", status: "To Do" },
  { id: 2, title: "Task 2", status: "In Progress" },
  { id: 5, title: "Task 5", status: "In Progress" },
  { id: 8, title: "Task 8", status: "In Progress" },
  { id: 11, title: "Task 11", status: "In Progress" },
  { id: 3, title: "Task 3", status: "Done" },
  { id: 6, title: "Task 6", status: "Done" },
  { id: 9, title: "Task 9", status: "Done" },
  { id: 12, title: "Task 12", status: "Done" },
];

const retrieveTickets = (tickets, status) => {
  return tickets.filter((ticket) => ticket.status === status);
};

const JiraBoard = () => {
  const [cards, setCards] = React.useState(TICKETS);
  const [dropTarget, setDropTarget] = React.useState("");
  const [draggedCardId, setDraggedCardId] = React.useState(null);

  const handleDrop = (column) => {
    const updatedCards = cards.map((card) => {
      if (card.id === draggedCardId) {
        return { ...card, status: column };
      }
      return card;
    });
    setCards(updatedCards);
    setDropTarget("");
    setDraggedCardId(null);
  };
  const handleDragStart = (id) => {
    console.log("drag start", id);
    setDraggedCardId(id);
  };
  const handleDragOver = (e, column) => {
    e.preventDefault();
    setDropTarget(column);
  };

  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <div
          key={column}
          className={`column ${dropTarget === column ? "drag-over" : ""}`}
          onDrop={() => handleDrop(column)}
          onDragOver={(e) => handleDragOver(e, column)}
        >
          <h3>{column}</h3>
          <div className="tickets">
            {retrieveTickets(cards, column).map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket ${ticket.status.toLowerCase().replace(" ", "-")}`}
                onDragStart={() => handleDragStart(ticket.id)}
                draggable
              >
                <p>{ticket.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JiraBoard;
