import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="dmsans text-lg">DM Sans обычный</div>
      <div className="dmsans font-bold text-xl">DM Sans Bold</div>
      <div className="dmsans font-medium text-lg">DM Sans Medium</div>
      <div className="dmsans font-light text-base">DM Sans Light</div>
      <div className="dmsans font-semibold text-lg italic">
        DM Sans SemiBold Italic
      </div>

      <div className="bricolage text-2xl font-bold">Bricolage Bold</div>
      <div className="bricolage text-xl">Bricolage обычный</div>
    </>
  );
}

export default App;
