import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon } from '../icons/UserIcon';

const UserInfo: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-3 p-4 border-t border-gray-200">
      <div className="w-10 h-10 bg-greenPastel rounded-full flex items-center justify-center">
        <UserIcon className="w-6 h-6 text-text" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-secondaryText truncate">
          {user.email}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="text-xs text-secondaryText hover:text-text transition-colors"
        title="Cerrar sesión"
      >
        Salir
      </button>
    </div>
  );
};

export default UserInfo; 