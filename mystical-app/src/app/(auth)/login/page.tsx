"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { FiGithub} from "react-icons/fi";
export default function SignIn() {
  const {login} = useAuth()
  return (
    <main className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
      <Card className="w-[350px] text-center">
        <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>You must be logged in to perform this action.</CardDescription>
      </CardHeader>
      <CardContent>
         <Button variant="outline" onClick={login}>
        <FiGithub className="mr-2 h-4 w-4" /> Login with GitHub
      </Button>
        
      </CardContent>

      </Card>
      
    </main>
  );
}
