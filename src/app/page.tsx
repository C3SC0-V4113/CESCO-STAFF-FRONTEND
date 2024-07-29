import { SignIn } from "@/components/sign-in";

export default function Home() {
  return (
    <div className="bg-primary text-primary-foreground self-center mx-auto p-6 rounded-md flex flex-col">
      <h1 className="mb-4 text-2xl">Login</h1>
      <SignIn />
    </div>
  );
}
