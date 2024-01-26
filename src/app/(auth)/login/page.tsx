import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";
import { Link } from "lucide-react";
import { ChevronLeft } from "lucide-react";
export default function LoginPage() {
    return (
        <div className='absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg'>
          <div className='flex flex-col items-center gap-6 text-center'>
          
    

        <SignIn/>
        </div>
     </div>
 </div>

)
}  