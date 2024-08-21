import React from "react";

function Success() {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Online Payment Successful !</h1>
      <h3>
        ---A Representative of the Restaurant will call on the Number or
        Whatsapp to Confirm Order. <br />
        <br />
        --Please Wait..!
      </h3>
      <button
        style={styles.button}
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#1c1c1c",
  },
  text: {
    color: "white",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "none",
    borderRadius: "5px",
    color: "#1c1c1c",
  },
};

export default Success;
