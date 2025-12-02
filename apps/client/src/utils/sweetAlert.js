import Swal from "sweetalert2";

const themeColors = {
  gold: "#d4af37",
  dark: "#1a1a1a",
  cream: "#fdfbf7",
  white: "#ffffff",
};

export const showAlert = ({
  title,
  text,
  icon = "info",
  confirmButtonText = "OK",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    confirmButtonColor: themeColors.gold,
    background: themeColors.white,
    color: themeColors.dark,
    customClass: {
      popup: "rounded-2xl font-sans",
      title: "font-serif font-bold",
      confirmButton: "font-bold rounded-lg px-6 py-2.5",
    },
  });
};

export const showConfirm = ({
  title,
  text,
  icon = "warning",
  confirmButtonText = "Ya",
  cancelButtonText = "Batal",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: themeColors.gold,
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
    background: themeColors.white,
    color: themeColors.dark,
    customClass: {
      popup: "rounded-2xl font-sans",
      title: "font-serif font-bold",
      confirmButton: "font-bold rounded-lg px-6 py-2.5",
      cancelButton: "font-bold rounded-lg px-6 py-2.5",
    },
  });
};

export const showSuccess = (title, text) => {
  return showAlert({ title, text, icon: "success" });
};

export const showError = (title, text) => {
  return showAlert({ title, text, icon: "error" });
};
