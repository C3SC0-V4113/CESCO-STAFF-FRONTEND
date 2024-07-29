import { auth, signOut } from "@/auth";
import { SideNavbar } from "@/components/ui/side-navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <div className="flex mt-12 lg:mt-0">
        <SideNavbar session={session} />
        <div className="p-2">{children}</div>
      </div>
    </>
  );
}
