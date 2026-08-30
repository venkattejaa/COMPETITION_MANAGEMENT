"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bot, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setFormError(null);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      setFormError("Failed to initiate sign in. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (result?.error) {
        setFormError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setFormError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--mesh-gradient-dark)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary mb-6"
          >
            <Bot className="h-10 w-10 text-white" aria-hidden="true" />
          </motion.div>
          <h1 className="text-display-md font-display font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-body text-text-secondary">Sign in to access your eYRC Command Center</p>
        </div>

        <Card variant="double-bezel">
          <div className="rounded-xl bg-surface/50 backdrop-blur-xl border border-border/50 p-6 md:p-8">
            {(error || formError) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/30 text-brand-danger"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm">{formError || error}</p>
              </motion.div>
            )}

            <div className="space-y-4 mb-6">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface/50 text-text-muted">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleCredentialsSignIn} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@college.edu"
                required
                autoComplete="email"
                icon={Mail}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                icon={Lock}
              />
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-8 text-center text-sm text-text-muted"
        >
          Don't have an account?{" "}
          <span className="text-brand-primary font-medium cursor-pointer hover:underline">Contact your coordinator</span>{" "}
          for an invitation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
            <CheckCircle className="h-6 w-6 mx-auto text-brand-secondary mb-2" aria-hidden="true" />
            <p className="text-xs text-text-secondary">Google OAuth</p>
          </div>
          <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
            <Lock className="h-6 w-6 mx-auto text-brand-primary mb-2" aria-hidden="true" />
            <p className="text-xs text-text-secondary">Secure Login</p>
          </div>
          <div className="p-4 rounded-xl bg-surface/50 border border-border/30">
            <Bot className="h-6 w-6 mx-auto text-brand-accent mb-2" aria-hidden="true" />
            <p className="text-xs text-text-secondary">Team Access</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}