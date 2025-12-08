import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MapPin, Clock, Users, BarChart, Smartphone, Shield } from "lucide-react"

const features = [
  {
    title: "Location-Based Check-In",
    description: "Automatic attendance tracking when employees are near the office - no manual punching required.",
    icon: <MapPin className="size-6" />,
  },
  {
    title: "Real-Time Data",
    description: "Get instant attendance updates and monitor staff presence in real-time.",
    icon: <Clock className="size-6" />,
  },
  {
    title: "Easy Staff Management",
    description: "Manage your team effortlessly with intuitive admin controls and employee profiles.",
    icon: <Users className="size-6" />,
  },
  {
    title: "Accurate Reports",
    description: "Generate detailed working hours reports and attendance analytics for better insights.",
    icon: <BarChart className="size-6" />,
  },
  {
    title: "Mobile-First Design",
    description: "Optimized mobile experience for both administrators and employees on the go.",
    icon: <Smartphone className="size-6" />,
  },
  {
    title: "Secure & Reliable",
    description: "Enterprise-grade security with reliable attendance tracking you can trust.",
    icon: <Shield className="size-6" />,
  },
]

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-md px-4 py-1.5 text-sm font-medium" variant="secondary">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need for Smart Attendance
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            EkiliSync provides comprehensive attendance management tools designed for modern workplaces, from small
            teams to large organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 