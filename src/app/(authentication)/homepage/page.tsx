"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Homepage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-4"> {/* Center the items and add vertical spacing */}
      <h1 className="text-5xl">Welcome back.</h1>

      <Button 
        className="w-full max-w-sm px-6 py-3 text-lg" 
        onClick={() => router.push('/signin')} // Navigate to /signin
      >
        STAFF
      </Button>
      
      <Button 
        className="w-full max-w-sm px-6 py-3 text-lg" 
        onClick={() => router.push('/student')} // Navigate to /student
      >
        STUDENT
      </Button>
      
    </div>
  );
}
