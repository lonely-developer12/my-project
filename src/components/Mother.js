import { Todos } from "./Todos"; // Uvozimo komponentu Todos iz datoteke Todos.js

import React from "react"; // Uvozimo React biblioteku

const Mother = () => { // Definišemo funkcionalnu komponentu Mother
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white"> 
      {/* Div koji služi kao kontejner za cijelu aplikaciju */}
      {/* Klase su korištene za stilizovanje i pozicioniranje elementa */}
      <div className="text-center p-4 md:p-10">
        {/* Div koji služi kao kontejner za komponentu Todos */}
        {/* Klase su korištene za centriranje sadržaja i dodavanje margina */}
        <Todos /> {/* Renderujemo komponentu Todos */}
      </div>
    </div>
  );
};

export default Mother; // Izvozimo komponentu Mother