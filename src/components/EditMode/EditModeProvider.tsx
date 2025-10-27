'use client';

import React, { createContext, useContext, useState } from 'react';
import { AdminLoginModal } from './AdminLoginModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { EditModeContextType } from '@/src/types/admin';

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  exitEditMode: () => {},
  openLoginModal: () => {},
  openChangePasswordModal: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const toggleEditMode = () => {
    if (isEditMode) {
      // If already in edit mode, just toggle off
      setIsEditMode(false);
    } else {
      // If not in edit mode, show login modal
      setLoginModalOpen(true);
    }
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsEditMode(true);
  };

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        exitEditMode,
        openLoginModal,
        openChangePasswordModal,
      }}
    >
      {children}

      <AdminLoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />
    </EditModeContext.Provider>
  );
}
