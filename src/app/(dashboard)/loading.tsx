import { StateSkeleton } from "@/components/shared/async-states";

export default function DashboardLoading() {
  return <main className="studio-shell min-h-screen px-4 py-8 sm:px-6"><div className="mx-auto max-w-[1600px]"><StateSkeleton variant="profile" /></div></main>;
}
