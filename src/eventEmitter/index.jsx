import { useEventEmitter } from "../hooks/useEventEmitter";

const EventCta = () => {
  const { triggerEvent } = useEventEmitter("customEvent");
  return (
    <div>
      <h1>Event Emitter</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => triggerEvent({ message: "Hello from EventCta!" })}
      >
        Click
      </button>
    </div>
  );
};

export default EventCta;
