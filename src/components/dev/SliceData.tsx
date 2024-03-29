import clsx from "clsx";
import { useState } from "react";

interface SliceDataProps {
  slice?: any;
  hidden?: boolean;
}

const SliceData = ({ slice, hidden }: SliceDataProps) => {
  const [open, setOpen] = useState(false);
  if (hidden || !slice) {
    return null;
  }
  return (
    <div className={clsx("my-4 lg:my-6")}>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "flex w-full justify-between border-t-2 border-b-2 border-black px-4 py-1"
        )}
      >
        <pre>
          {slice.slice_type ? (
            <>
              slice_type: <strong>{slice.slice_type}</strong>
            </>
          ) : (
            "data"
          )}
        </pre>

        <pre>{open ? "Close" : "Open"}</pre>
      </button>
      <pre className={clsx("px-4 py-1", open ? "block" : "hidden")}>
        {JSON.stringify(slice, null, 2)}
      </pre>
    </div>
  );
};

export default SliceData;
