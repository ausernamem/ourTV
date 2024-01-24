import { UserButton, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
      <SignIn />
      <UserButton afterSignOutUrl="/"/>

      
   </div>
  );
}
