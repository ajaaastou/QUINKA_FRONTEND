"use client"

    import Link from "next/link"


    import { Button } from "@/components/ui/button"
    import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useFormState } from "react-dom"
import { login } from "@/actions/user"


    export function LoginForm() {

        const [state , formAction] = useFormState(login , undefined)

        const [email , setEmail ] = useState("")
        const [password , setPassword ] = useState("")


        


    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form action={formAction}>
                <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    placeholder="m@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    />

                    {state?.errors?.email && (
                        <span className="text-red-500">{state.errors.email}</span>
                    )}
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    
                    </div>
                    <Input id="password" 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    {state?.errors?.password && (
                        <span className="text-red-500">{state.errors.password}</span>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                
            </div>
            </form>
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
                Sign up
            </Link>
            </div>
        </CardContent>
        </Card>
    )
    }
