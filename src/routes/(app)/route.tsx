import Header from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Header />
      <Outlet />
    </div>
  );
}
