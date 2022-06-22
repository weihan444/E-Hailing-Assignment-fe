import dynamic from "next/dynamic";

const UpdateListComponent = dynamic(
  () => import("../../Component/UpdateListComponent"),
  { ssr: false }
);

export default function RequestList() {
  return <UpdateListComponent />;
}
