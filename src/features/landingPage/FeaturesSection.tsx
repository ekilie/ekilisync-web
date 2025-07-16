import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Users, BarChart, Smartphone, Shield } from "lucide-react"

const features = [
  {
    title: "Location-Based Check-In",
    description: "Automatic attendance tracking when employees are near the office - no manual punching required.",
    icon: <MapPin className="size-5" />,
  },
  {
    title: "Real-Time Data",
    description: "Get instant attendance updates and monitor staff presence in real-time.",
    icon: <Clock className="size-5" />,
  },
  {
    title: "Easy Staff Management",
    description: "Manage your team effortlessly with intuitive admin controls and employee profiles.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Accurate Reports",
    description: "Generate detailed working hours reports and attendance analytics for better insights.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "Mobile-First Design",
    description: "Optimized mobile experience for both administrators and employees on the go.",
    icon: <Smartphone className="size-5" />,
  },
  {
    title: "Secure & Reliable",
    description: "Enterprise-grade security with reliable attendance tracking you can trust.",
    icon: <Shield className="size-5" />,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-md bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 