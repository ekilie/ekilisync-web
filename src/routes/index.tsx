import { Link } from '@tanstack/react-router'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to EkiliSync</h1>
        <p className="text-lg text-muted-foreground">
          Effortlessly manage your team, offices, and tasks with EkiliSync. Get started by creating an account or sign in to your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/sign-in"
            className="inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="inline-block px-6 py-3 rounded-md border border-primary text-primary font-semibold hover:bg-primary/10 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
} 