import clsx from "clsx";

export function GridSection({ children, className }: any) {
  return (
    <section
      className={clsx(" grid grid-cols-4 gap-4 xl:grid-cols-12", className)}
    >
      {children}
    </section>
  );
}
