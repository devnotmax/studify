const user = {
  name: "Anita muñoz",
  email: "anitamunoz99@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=Anita&background=random",
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4 sm:px-0">
      {/* Foto de perfil */}
      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-brown shadow-md mb-4">
        <img
          src={user.avatar}
          alt="Foto de perfil"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Nombre */}
      <h2 className="text-xl font-semibold text-brown mb-1 text-center">
        {user.name}
      </h2>
      {/* Correo */}
      <p className="text-gray-500 text-sm mb-4 text-center">{user.email}</p>
      {/* Botón editar */}
      <button className="bg-brown text-white px-6 py-2 rounded-full font-medium shadow hover:bg-brown/90 transition mb-8">
        Editar perfil
      </button>
      {/* Espacio para más información */}
      <div className="w-full max-w-md mt-4">
        {/* Aquí puedes agregar más secciones, como estadísticas, logros, etc. */}
      </div>
    </div>
  );
};

export default ProfilePage;
