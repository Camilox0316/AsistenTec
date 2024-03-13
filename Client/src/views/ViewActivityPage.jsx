import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ViewActivityPage() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
   
      <div className="p-4 flex justify-center items-center w-full h-screen">
 
      </div>

  );
}
