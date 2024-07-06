import { Toaster } from "react-hot-toast";

/**
 * Toast Root Components
 */
export default function ToastRoot() {
  return (
    <Toaster
      position={"bottom-center"}
      toastOptions={{
        className: "!text-white !bg-black !px-4 !py-4 !pr-6 !rounded-lg ",
        success: {
          duration: 2000,
          iconTheme: {
            primary: "rgb(255 255 255 / var(--tw-text-opacity))",
            secondary: "black",
          },
        },
        error: {
          duration: 2000,
          iconTheme: {
            primary: "rgb(255 255 255 / var(--tw-text-opacity))",
            secondary: "black",
          },
        },
      }}
    />
  );
}
