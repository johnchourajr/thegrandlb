import clsx from "clsx";

function Preloader() {
  return (
    <div
      className={clsx(
        "fixed",
        "inset-0 z-[9999] flex items-center justify-center bg-white"
      )}
    >
      <p>Loading...</p>
    </div>
  );
}

export default Preloader;
