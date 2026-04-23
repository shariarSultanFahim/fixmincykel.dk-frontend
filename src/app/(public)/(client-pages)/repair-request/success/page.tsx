"use client";
import Link from "next/link";
import { CheckCircle2, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SuccessPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-50 p-4 transition-transform hover:scale-110 duration-300">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                        Request Submitted!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your repair request has been sent successfully. Our partner workshops will review it and
                        send you quotes shortly.
                    </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90">
                        <Link href="/">
                            <Home className="size-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-navy text-navy hover:bg-navy/5"
                    >
                        <Link href="/user">
                            <LayoutDashboard className="size-4" />
                            Go to Dashboard
                        </Link>
                    </Button>
                </div>
                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">
                        You can track your request status and manage offers in your dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}