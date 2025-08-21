import { Button } from "../components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h2 className="mb-2">Welcome to Home Page</h2>
      <Button>Welcome ji !</Button>
    </div>
  );
}
