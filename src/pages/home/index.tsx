import React, { useState } from "react";
import ConfigModal from "../../components/modals/ConfigModal/ConfigModal";
import TextInput from "../../components/inputs/TextInput";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Abrir Configuración</button>
      <h1>Bienvenido a la Página de Inicio</h1>
      <ConfigModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        width="60%"
      />
      <div className="p-4">
        <TextInput
          label="focus"
          value=""
          onChange={(value) => console.log("Input changed:", value)}
          placeholder="25"
        />
      </div>
    </>
  );
};

export default Home;
