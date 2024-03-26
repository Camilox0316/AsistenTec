import { useState } from "react";

import {AvailableAssistance} from "../components/AvailableAssistance";
import '../css modules/AvailableAssistance.css';

export function ViewHomeStudent() {

  return (
    <div>
      <AvailableAssistance 
        title="POO GR 2" 
        semester="I Semestre 2022" 
        professor="Mario Barboza Artavia" 
        type="Horas Estudiante" 
        status="Pendiente"
        superType="Assistance"  
        />
    </div>
  );
}
