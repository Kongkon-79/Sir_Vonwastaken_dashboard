import { StateSkeleton } from "@/components/shared/async-states";
import { Shell } from "./_components/intelligence-workspace";

export default function DashboardLoading() {
  return <Shell title="Loading workspace" eyebrow="Creator workspace"><StateSkeleton variant="profile" /></Shell>;
}
