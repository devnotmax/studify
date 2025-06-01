import React, { useState } from "react";
import ConfigModal from "../../components/modals/ConfigModal/ConfigModal";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Abrir Configuración</button>
      <h1>Bienvenido a la Página de Inicio</h1>
      <ConfigModal isOpen={showModal} onClose={() => setShowModal(false)} width="60%"/>
    </>
  );
};

export default Home;
