import dynamic from "next/dynamic";

const RequestListComponent = dynamic(
  () => import("../../Component/RequestListComponent"),
  { ssr: false }
);

export default function RequestList() {
  return <RequestListComponent />;
}
