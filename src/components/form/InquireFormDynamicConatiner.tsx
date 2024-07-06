import dynamic from "next/dynamic";

const InquireDynamic = dynamic(() => import("./InquireFormContainer"), {
  loading: () => <></>,
});

export default function InquireFormDynamicContainer() {
  return <InquireDynamic />;
}
