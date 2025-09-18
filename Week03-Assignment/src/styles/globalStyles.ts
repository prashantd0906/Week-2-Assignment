export const useStyle = {
  container: {
    display: "flex",
    flexDirection: "column", // make children stack vertically
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "16px", // add some space around
    background: "linear-gradient(135deg, #667eea 0%, #9785a8ff 100%)",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: "32px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "16px", // spacing between input fields
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "16px",
  },
  button: {
    mt: 2,
    py: 1.5,
    borderRadius: 4,
  },
  errorText: {
    mt: 1,
    textAlign: "center",
    color: "#f44336",
  },
  footerText: {
    mt: 2,
    fontSize: "0.9rem",
    textAlign: "center",
  },
};
