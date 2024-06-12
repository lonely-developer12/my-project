import React from "react"; // Uvozimo React biblioteku

function Todoitem({
  id, // Jedinstveni identifikator zadatka
  title, // Naslov zadatka
  text, // Tekst zadatka
  description, // Dodali smo novu prop za opis zadatka
  priority, // Prioritet zadatka (low, medium, high)
  onDelete, // Funkcija za brisanje zadatka
  openEditModal, // Funkcija za otvaranje modala za uređivanje zadatka
  updatePriority, // Funkcija za ažuriranje prioriteta zadatka
  completed, // Indikator da li je zadatak završen ili ne
  toggleCompleted // Funkcija za promjenu statusa zadatka (završen/nezavršen)
}) {
  const priorityStyle = { // Objekt sa stilovima za različite prioritete
    low: "text-green-500 font-normal",
    medium: "text-yellow-500 font-semibold",
    high: "text-red-500 font-bold",
  };

  const handlePriorityChange = (e) => { // Funkcija za ažuriranje prioriteta zadatka
    updatePriority(id, e.target.value);
  };

  return (
    <div className="bg-green-300 rounded-xl shadow-lg p-6 mb-4 transition duration-300 shadow-2xl">
      <div className="mb-4  transition duration-300 text-indigo-600">
        <h3
          className={`text-lg font-semibold ${completed ? "line-through" : ""}`}
        >
          {title} {/* Naslov zadatka*/} {/**/}
        </h3>
        <p
          className={`text-gray-600 ${completed ? "line-through" : ""}`}
          style={{
            textDecoration: completed ? "line-through" : "none", // Stil za precrtavanje teksta ako je zadatak završen
          }}
        >
          {text}  {/*Tekst zadatka*/}
        </p>
        {/* Dodali smo opis zadatka */}
        <p className={`text-gray-500 ${completed ? "line-through" : ""}`}>
          {description}  {/*// Opis zadatka*/}
        </p>
        <div className="flex items-center">
          <p className={`mr-2 ${priorityStyle[priority]}`}>Priority:</p> {/* Tekst "Priority:"*/}
          <span className={`px-2 py-1 rounded-md ${priorityStyle[priority]}`}>
            {typeof priority === "string" && priority.length > 0
              ? priority.charAt(0).toUpperCase() + priority.slice(1) // Formatiranje prioriteta (npr. "Low" -> "Low")
              : ""}
          </span>
          <select
            value={priority} // Trenutni prioritet zadatka
            onChange={handlePriorityChange} // Funkcija za promjenu prioriteta
            className="bg-gray-200 ml-2"
          >
            <option style={{ backgroundColor: "green" }} value="low">
              Low
            </option>
            <option style={{ backgroundColor: "yellow" }} value="medium">
              Medium
            </option>
            <option style={{ backgroundColor: "red" }} value="high">
              High
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => toggleCompleted(id)} // Funkcija za promjenu statusa zadatka
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mr-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          <svg
            className="w-5 h-5 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg> 
          {completed ? "Unmark Completed" : "Mark Completed"} {/* Tekst na dugmetu za promjenu statusa zadatka*/}
        </button> 
        <button
          onClick={() => openEditModal(id, title)} // Funkcija za otvaranje modala za uređivanje zadatka
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg mr-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          <svg
            className="w-5 h-5 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(id)} // Funkcija za brisanje zadatka
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          <svg
            className="w-5 h-5 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todoitem; // Izvozimo komponentu Todoitem