// PrioritySelect.jsx

const PrioritySelect = ({ value, onChange }) => {
  // Definišemo funkcionalnu komponentu PrioritySelect koja prima dva propa: value (trenutna vrijednost prioriteta) i onChange (funkcija koja se poziva kada se promijeni vrijednost prioriteta)
  const getBackgroundColor = (priority) => {
    // Funkcija koja vraća odgovarajuću boju pozadine na osnovu vrijednosti prioriteta
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <select
      value={value} // Postavljamo vrijednost prioriteta na osnovu propa value
      onChange={onChange} // Postavljamo onChange event handler na osnovu propa onChange
      className="w-full text-gray-800 p-2 rounded-lg outline-none mb-2 appearance-none text-center" // Stilizovanje select elementa
      style={{
        backgroundColor: getBackgroundColor(value), // Postavljamo boju pozadine na osnovu vrijednosti prioriteta
        color: value === "medium" ? "black" : "white", // Postavljamo boju teksta na crnu ako je prioritet 'medium', inače bijelu
      }}
    >
      <option
        value="low"
        style={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
        }}
      >
        Low
      </option>
      <option
        value="medium"
        style={{
          backgroundColor: "yellow",
          color: "black",
          textAlign: "center",
        }}
      >
        Medium
      </option>
      <option
        value="high"
        style={{ backgroundColor: "red", color: "white", textAlign: "center" }}
      >
        High
      </option>
    </select>
  );
};

export default PrioritySelect; // Izvozimo komponentu PrioritySelect
