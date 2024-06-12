import React, { useRef, useEffect, useCallback } from "react";
import { useState } from "react";
import uuid from "react-uuid"; // Biblioteka za generisanje jedinstvenih ID-jeva
import Todoitem from "./Todoitem"; // Komponenta za prikaz pojedinačnog todo elementa
import PrioritySelect from "./PrioritySelect"; // Komponenta za odabir prioriteta
import note from "./img/note.png";

export const Todos = () => {
  // Stanja za upravljanje greškama, modalnim prozorom za uređivanje i podacima za uređivanje
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [editTodoDescription, setEditTodoDescription] = useState("");
  const [editTodoPriority, setEditTodoPriority] = useState("");

  // Referentne vrednosti za inpute
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const priorityInputRef = useRef(null);

  // Stanje za todo elemente, inicijalizovano iz localStorage ili praznim nizom
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Učitavanje todo elemenata iz localStorage pri renderovanju komponente
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Funkcija za čuvanje todo elemenata u localStorage
  const saveTodosToLocalStorage = useCallback((todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, []);

  // Funkcija za dodavanje novog todo elementa
  const addTodoHandler = () => {
    const title = titleInputRef.current.value.trim();
    const description = descriptionInputRef.current.value.trim();
    const priority = priorityInputRef.current.value;
    const name = title; // Koristi se title kao name svojstvo

    if (title === "" || description === "") {
      setError("Please enter both title and description");
      return;
    }

    const todoData = {
      id: uuid(), // Generisanje jedinstvenog ID-ja
      title: title,
      description: description,
      name: name,
      priority: priority,
      text: description + " " + name, // Kombinovanje opisa i naslova u text svojstvo
      completed: false,
    };

    const newTodos = [todoData, ...todos]; // Dodavanje novog todo elementa na početak niza
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos); // Čuvanje ažuriranih todo elemenata u localStorage
    setError(""); // Resetovanje greške
    titleInputRef.current.value = ""; // Resetovanje inputa za naslov
    descriptionInputRef.current.value = ""; // Resetovanje inputa za opis
  };

  // Funkcija za promenu statusa završenosti todo elementa
  const toggleCompleted = useCallback(
    (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
    },
    [todos, saveTodosToLocalStorage]
  );

  // Funkcija za otvaranje modalnog prozora za uređivanje todo elementa
  const openEditModal = useCallback(
    (id, title, description, priority) => {
      setShowEditModal(true);
      setEditTodoId(id);
      setEditTodoTitle(title);
      setEditTodoDescription(description);
      setEditTodoPriority(priority);
    },
    [
      setShowEditModal,
      setEditTodoId,
      setEditTodoTitle,
      setEditTodoDescription,
      setEditTodoPriority,
    ]
  );

  // Funkcija za zatvaranje modalnog prozora za uređivanje todo elementa
  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditTodoId(null);
    setEditTodoTitle("");
    setEditTodoDescription("");
    setEditTodoPriority("");
  }, []);

  // Čišćenje modalnog prozora za uređivanje pri demontiranju komponente
  useEffect(() => {
    return closeEditModal;
  }, [closeEditModal]);

  // Funkcija za ažuriranje statusa završenosti todo elementa i zatvaranje modalnog prozora
  const updateTodoStatus = useCallback(
    (id) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
      closeEditModal();
    },
    [todos, saveTodosToLocalStorage, closeEditModal]
  );

  // Funkcija za ažuriranje prioriteta todo elementa
  const updatePriority = useCallback(
    (id, newPriority) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      );
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
    },
    [todos, saveTodosToLocalStorage]
  );

  // Funkcija za brisanje todo elementa
  const deleteTodoHandler = useCallback(
    (id) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      saveTodosToLocalStorage(updatedTodos);
    },
    [todos, saveTodosToLocalStorage]
  );

  // Funkcija za ažuriranje naslova, opisa i prioriteta todo elementa
  const updateTodoTitleAndDescriptionAndPriority = useCallback(() => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editTodoId
        ? {
            ...todo,
            title: editTodoTitle,
            description: editTodoDescription,
            priority: editTodoPriority,
            text: editTodoDescription + " " + editTodoTitle, // Ažuriranje text svojstva
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    closeEditModal();
  }, [
    todos,
    editTodoId,
    editTodoTitle,
    editTodoDescription,
    editTodoPriority,
    saveTodosToLocalStorage,
    closeEditModal,
  ]);

  // Renderovanje komponente
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <img
          src={note}
          alt="Opis slike"
          style={{
            maxWidth: "67px",
            height: "67px",
            margin: "auto",
          }}
        />
        <h1 style={{lineheight: '2'}} className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-12">
          My todo app
        </h1>
        <div className="flex flex-col items-center rounded-lg bg-gray-100 mb-4 space-y-2">
          {/* Input za naslov todo elementa */}
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Please enter a todo"
            className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />

          {/* Input za opis todo elementa */}
          <input
            ref={descriptionInputRef}
            type="text"
            placeholder="Please enter a description"
            className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />

          {/* Selektor za prioritet todo elementa */}
          <select
            ref={priorityInputRef}
            className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg outline-none mb-2 text-center"
            style={{ textAlign: "center" }}
          >
            <option
              style={{ backgroundColor: "green", textAlign: "center" }}
              value="low"
            >
              Low
            </option>
            <option
              style={{ backgroundColor: "yellow", textAlign: "center" }}
              value="medium"
            >
              Medium
            </option>
            <option
              style={{ backgroundColor: "red", textAlign: "center" }}
              value="high"
            >
              High
            </option>
          </select>
        </div>
        {/* Dugme za dodavanje novog todo elementa */}
        <button
          onClick={addTodoHandler}
          className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
        >
          Add Todo
        </button>
      </div>
      {/* Prikaz greške ako postoji */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div>
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {/* Mapiranje todo elemenata i renderovanje Todoitem komponente */}
          {todos.map((todo) => (
            <Todoitem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              text={todo.text}
              completed={todo.completed}
              onDelete={deleteTodoHandler}
              updateTodo={updateTodoStatus}
              openEditModal={openEditModal}
              description={todo.description}
              updatePriority={updatePriority}
              priority={todo.priority}
              toggleCompleted={toggleCompleted}
            />
          ))}
          {/* Modalni prozor za uređivanje todo elementa */}
          {showEditModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg">
                {/* Selektor za prioritet */}
                <PrioritySelect
                  value={editTodoPriority}
                  onChange={(e) => setEditTodoPriority(e.target.value)}
                />
                {/* Input za naslov */}
                <input
                  type="text"
                  placeholder="Please enter a title"
                  value={editTodoTitle || ""}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                  className="bg-gray-200 border border-gray-300 rounded-lg p-2 mb-2 block w-full text-black"
                />
                {/* Input za opis */}
                <input
                  type="text"
                  placeholder="Please enter a description"
                  value={editTodoDescription || ""}
                  onChange={(e) => setEditTodoDescription(e.target.value)}
                  className="bg-gray-200 border border-gray-300 rounded-lg p-2 mb-2 block w-full text-black"
                />
                {/* Selektor za prioritet */}
                <select
                  value={editTodoPriority}
                  onChange={(e) => setEditTodoPriority(e.target.value)}
                  className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg outline-none mb-2"
                  style={{
                    textAlign: "center",
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
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    High
                  </option>
                </select>
                <div>
                  {/* Dugme za čuvanje izmena */}
                  {editTodoTitle && editTodoDescription ? (
                    <button
                      onClick={updateTodoTitleAndDescriptionAndPriority}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <p className="text-red-700">
                      {" "}
                      Please enter both title and description
                    </p>
                  )}
                  {/* Dugme za otkazivanje izmena */}
                  <button
                    onClick={closeEditModal}
                    className="bg-blue-500 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
