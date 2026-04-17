import { Link } from "react-router-dom"
import { School, Landmark, Users, Sparkles, ArrowRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface JourneyPath {
  id: string
  persona: string
  headline: string
  description: string
  href: string
  ctaLabel: string
  icon: LucideIcon
  steps?: string[]
}

const DEFAULT_PATHS: JourneyPath[] = [
  {
    id: "schools",
    persona: "For Schools",
    headline: "Re-engage students at risk of exclusion",
    description:
      "Refer students with a full support plan — we handle transport, assessments and reporting so you can focus on your cohort.",
    href: "/referral",
    ctaLabel: "Start a school referral",
    icon: School,
    steps: ["Call or email our team", "Share relevant records securely", "Confirm placement within 5 working days"],
  },
  {
    id: "local-authorities",
    persona: "For Local Authorities",
    headline: "Partner on alternative provision placements",
    description:
      "We work with LAs, virtual schools and social workers to deliver Ofsted-registered provision with clear outcome tracking.",
    href: "/partners",
    ctaLabel: "See our LA framework",
    icon: Landmark,
    steps: ["Review our commissioning brief", "Agree outcome framework", "Monitor via quarterly reports"],
  },
  {
    id: "parents-carers",
    persona: "For Parents & Carers",
    headline: "Find the right pathway for your child",
    description:
      "If your child isn't thriving in mainstream education, we'll talk you through our approach, centres and next steps.",
    href: "/contact",
    ctaLabel: "Arrange a conversation",
    icon: Users,
    steps: ["Book a chat with our team", "Visit our centre", "Begin a supported transition"],
  },
  {
    id: "young-people",
    persona: "For Young People",
    headline: "A fresh start, at your pace",
    description:
      "Meet mentors who listen, get hands-on learning, and start building a future you're excited about.",
    href: "/about",
    ctaLabel: "See what a day looks like",
    icon: Sparkles,
    steps: ["Meet your mentor", "Try a taster day", "Build your learning plan"],
  },
]

/**
 * Persona-led user journey cards. Unlike a flat list of links, each card
 * signposts the next three concrete steps so visitors understand what
 * happens after they click — a key trust signal for first-time referrers.
 */
export function JourneyPaths({
  paths = DEFAULT_PATHS,
  title = "Choose your pathway",
  subtitle = "Tailored next steps for schools, local authorities, families and young people.",
  className,
}: {
  paths?: JourneyPath[]
  title?: string
  subtitle?: string
  className?: string
}) {
  return (
    <section
      aria-labelledby="journey-paths-heading"
      className={cn("py-20 md:py-24 bg-background", className)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Your Journey
          </p>
          <h2
            id="journey-paths-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
          {paths.map((path) => (
            <li key={path.id}>
              <Link
                to={path.href}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <path.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {path.persona}
                  </p>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {path.headline}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {path.description}
                </p>
                {path.steps && (
                  <ol className="space-y-1.5 text-sm text-muted-foreground">
                    {path.steps.map((step, i) => (
                      <li key={step} className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {path.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
