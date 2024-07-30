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
      <div className="flex mt-12 lg:mt-0 w-full justify-center">
        <SideNavbar session={session} />

        <div className="p-2 py-8 w-full max-w-4xl mx-auto overflow-x-auto lg:min-w-[850px]">
          {children}
        </div>
      </div>
    </>
  );
}
