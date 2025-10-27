// Admin authentication and edit mode types

export interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  exitEditMode: () => void;
  openLoginModal: () => void;
  openChangePasswordModal: () => void;
}

export interface EditableTextProps {
  children: React.ReactNode;
  fieldName: string;
  pageSlug: string;
  initialValue: string;
  multiline?: boolean;
  label?: string;
}

export interface EditableSectionProps {
  children: React.ReactNode;
  sectionId: string;
  pageSlug: string;
  title?: string;
  content?: string;
  onSave?: () => void;
  isDeletable?: boolean;
}

export interface AddSectionButtonProps {
  pageSlug: string;
  onSectionAdded?: () => void;
}
