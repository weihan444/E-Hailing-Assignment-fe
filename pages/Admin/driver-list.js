import dynamic from "next/dynamic";

const DriverListComponent = dynamic(
  () => import("../../Component/DriverListComponent"),
  { ssr: false }
);
export default function DriverList() {
  return <DriverListComponent />;
}
