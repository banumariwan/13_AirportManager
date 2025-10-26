import React, { useState } from "react";

function App() {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: "",
    destination: "",
    departureTime: "",
    status: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // add new flight
  const handleAddFlight = (e) => {
    e.preventDefault();
    if (
      !formData.flightNumber ||
      !formData.destination ||
      !formData.departureTime ||
      !formData.status
    )
      return;

    const newFlight = {
      id: Date.now(),
      ...formData,
    };

    setFlights([...flights, newFlight]);
    setFormData({ flightNumber: "", destination: "", departureTime: "", status: "" });
  };

  // delete flight
  const handleDelete = (id) => {
    setFlights(flights.filter((f) => f.id !== id));
  };

  // update flight status (like toggling)
  const handleUpdateStatus = (id, newStatus) => {
    setFlights(
      flights.map((f) =>
        f.id === id ? { ...f, status: newStatus } : f
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✈️ Airport Flight Manager</h1>

      <form onSubmit={handleAddFlight} style={styles.form}>
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number (e.g. QR902)"
          value={formData.flightNumber}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination (e.g. London)"
          value={formData.destination}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Status</option>
          <option value="On Time">🟢 On Time</option>
          <option value="Delayed">🟠 Delayed</option>
          <option value="Cancelled">🔴 Cancelled</option>
        </select>
        <button type="submit" style={styles.button}>
          Add Flight
        </button>
      </form>

      <div style={styles.tableSection}>
        <h2>📋 Flight Schedule</h2>
        {flights.length === 0 ? (
          <p>No flights scheduled yet...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Flight</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.departureTime}</td>
                  <td
                    style={{
                      color:
                        flight.status === "On Time"
                          ? "green"
                          : flight.status === "Delayed"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {flight.status}
                  </td>
                  <td>
                    <select
                      onChange={(e) => handleUpdateStatus(flight.id, e.target.value)}
                      style={styles.smallSelect}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Change
                      </option>
                      <option value="On Time">On Time</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleDelete(flight.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    padding: "40px",
  },
  title: {
    color: "#0078D7",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "40px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#0078D7",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  tableSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "90%",
    margin: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "8px",
  },
  smallSelect: {
    padding: "6px",
    borderRadius: "6px",
  },
};

export default App;
