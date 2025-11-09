"use client"

import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BrainCircuit,
  Linkedin,
  ClipboardX,
  UserX as UsersX,
  CodeXml,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  FileText,
  PenTool,
  Mail,
  Share2,
  HeadphonesIcon,
  Search,
  Building2,
  FileSpreadsheet,
  BarChart3,
  GraduationCap,
  Shield,
  Users,
  Megaphone,
  Briefcase,
  MessageSquare,
  Send,
  Twitter,
  Slack,
  Bug,
  Database,
  StickyNote,
  FolderOpen,
  Github,
} from "lucide-react"
import Image from "next/image"
import Script from "next/script"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Initialize Mermaid on client when available
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).mermaid) {
      try {
        (window as any).mermaid.initialize({ startOnLoad: true, securityLevel: "loose", theme: "neutral" })
        ;(window as any).mermaid.init(undefined, document.querySelectorAll(".mermaid"))
      } catch {}
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/functions/v1/send-waitlist-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
          body: JSON.stringify({ email, newsletter: true }),
        }
      )

      if (!response.ok) {
         const errorText = await response.text(); // Get raw text
        console.error("Failed response from server:", response.status, response.statusText);
        console.error("Failed response body:", errorText);
        try {
          const errorData = JSON.parse(errorText); // Try to parse
          throw new Error(errorData.error || "Something went wrong.");
        } catch (parseError) {
          // If parsing fails, throw the raw text
          throw new Error(errorText || "An unknown error occurred.");
        }
      }

      setSuccess(true)
      setEmail("")
    } catch (err: any) {
      console.error("Caught error:", err);
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-container {
          display: flex;
          gap: 1.5rem;
          animation: scroll-right 60s linear infinite;
          width: max-content;
        }

        .carousel-container:hover {
          animation-play-state: paused;
        }

        .carousel-card {
          width: 320px;
          flex-shrink: 0;
          background: white;
          border: 1px solid #e2e8f0;
          transition: box-shadow 0.3s ease;
        }

        .carousel-card:hover {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            (window as any).mermaid?.initialize({ startOnLoad: true, securityLevel: "loose", theme: "neutral" })
            ;(window as any).mermaid?.init(undefined, document.querySelectorAll('.mermaid'))
          } catch {}
        }}
      />

      <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/business-leaders-hero.jpeg"
            alt="AI-powered business leaders"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Etherion Logo" width={32} height={32} />
            <div className="text-2xl font-bold text-white tracking-tight">Etherion</div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <a href="#vision" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                Vision
              </a>
              <a href="#orchestrator" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                Orchestrator
              </a>
              <a href="#agents-foundry" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                Agents Foundry
              </a>
              <a href="#founder" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                Founder
              </a>
            </div>

            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent"
            >
              Join Private Beta
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight text-balance">
              Stop Building Workflows. <span className="text-slate-200">Start Delegating Goals.</span>
            </h1>

            {/* Sub-headline */}
            <h2 className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto text-balance">
              create and pilot AI Agents that knows your knowledge and tools
            </h2>

            {/* CTA Form */}
            <form onSubmit={handleSubmit} className="hidden flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-12">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-white/40 focus:bg-white/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 disabled:opacity-50"
                disabled={loading || success}
              >
                {loading ? "Joining..." : success ? "Welcome!" : "Request Access"}
              </Button>
            </form>
            <div className="hidden h-6 mt-2 text-center">
              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && <p className="text-sm text-green-400">Thanks for joining! We've sent you a welcome email.</p>}
            </div>

            {/* Social Proof removed by request */}
          </div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      </div>

      {/* The Problem section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-16">
            The Automation Gap: Your Best Ideas Are Trapped in Manual Workflows.
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
                <ClipboardX className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Brittle, Static Workflows</h3>
              <p className="text-slate-600 leading-relaxed">
                Tools like Zapier and n8n are powerful, but they are static. They can't reason, adapt, or handle
                exceptions, forcing your team into constant manual oversight and maintenance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <UsersX className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">The "No-Code" Ceiling</h3>
              <p className="text-slate-600 leading-relaxed">
                No-code agent builders offer a glimpse of the future, but they are shared, multi-tenant platforms that
                lack the security, performance, and deep customization required for mission-critical business processes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <CodeXml className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">The Developer Bottleneck</h3>
              <p className="text-slate-600 leading-relaxed">
                Building a truly autonomous, integrated AI workforce internally requires a team of specialized,
                expensive AI/ML engineers, putting it out of reach for most companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution section */}
      <section id="vision" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-8">
            Etherion: Your Private, Autonomous Digital Workforce.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Etherion is a single-tenant agentic platform that provides you with your own private, autonomous AI
            workforce. It is architected from the ground up to solve the automation gap. Go from a high-level business
            goal to a complete, multi-step workflow executed by a team of intelligent agents that learn from your
            feedback and are deeply integrated with your tools.
          </p>
        </div>
      </section>

      {/* Who We Serve section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-8">
                Built for Architects.
              </h2>
              <div className="relative">
                <Image
                  src="/architectural-blueprints.png"
                  alt="Architectural blueprints with drafting tools"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900">Founders & Entrepreneurs</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Automate your core business processes with a digital workforce that scales with you, so you can focus
                  on vision and growth.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900">Technical Leaders & CTOs</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Provide your team with a secure, single-tenant platform to build and deploy custom, high-performance
                  AI agents without getting bogged down in infrastructure.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900">Heads of Operations & Growth</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Design and deploy intelligent workflows for marketing, sales, and support that are deeply integrated
                  with your existing tools and learn from your team's feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works section */}
      <section id="orchestrator" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">From goal to execution in three simple steps</p>
          </div>

          <div className="space-y-24">
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Delegate Your Goal</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Start by describing your business objective in plain English. Go beyond simple tasks—assign complex,
                  multi-step goals and provide the Orchestrator with the strategic context it needs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-500 ml-4">Command Bar</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-700 font-mono text-sm">
                        Analyze our top three competitors' marketing from this quarter and generate a summary report
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Observe the Workflow in Real-Time</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Your private Orchestrator analyzes the goal, creates a plan, and assembles a team of specialist
                  agents. Watch the entire reasoning process unfold in our transparent, Grok-style execution trace.
                </p>
              </div>

              <div className="lg:order-1 bg-slate-900 rounded-2xl p-8 shadow-xl text-white">
                <div className="space-y-4">
                  <div className="text-sm text-slate-400 mb-4">Interaction View</div>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex gap-2">
                      <span className="text-blue-400">Thought:</span>
                      <span className="text-slate-300">I need to identify the top three competitors...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">Action:</span>
                      <span className="text-slate-300">unified_research_tool</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-yellow-400">Observation:</span>
                      <span className="text-slate-300">Found 3 competitors: CompanyA, CompanyB, CompanyC</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-purple-400">Cost:</span>
                      <span className="text-slate-300">$0.015</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Receive the Result</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The Orchestrator synthesizes the work of its specialist team into a single, cohesive final output that
                  directly achieves your goal. Provide feedback to make your workforce even smarter over time.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-slate-900">Assistant</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    <h4 className="font-semibold">Competitor Marketing Analysis - Q4 2024</h4>
                    <p>Based on my analysis of your top three competitors...</p>
                    <div className="bg-slate-50 rounded p-3">
                      <div className="text-xs text-slate-500 mb-2">Key Findings:</div>
                      <ul className="text-xs space-y-1 text-slate-600">
                        <li>• CompanyA increased social media spend by 40%</li>
                        <li>• CompanyB launched new content strategy</li>
                        <li>• CompanyC focused on influencer partnerships</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base: Connectors + BigQuery + Vertex AI */}
      <section id="kb-connectors" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">Your Knowledge, Organized and Searchable.</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">Etherion connects to your tools (Drive, OneDrive, Airtable, Notion, HubSpot, Jira, Slack) using secure OAuth and stores access in GSM. A scheduler triggers a worker that fetches and embeds content into your private BigQuery dataset and Vertex AI vector index. The result is fast, accurate, tenant-isolated search and Q/A.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 max-w-5xl mx-auto">
            <div className="mermaid text-left">{`graph TD
  OAuth[OAuth Consent] --> GSM[Google Secret Manager tokens]
  Scheduler[Cloud Scheduler] --> Worker[Ingestion Worker SA impersonation]
  Drive[Google Drive] --> Worker
  OneDrive[OneDrive] --> Worker
  Airtable --> Worker
  Notion --> Worker
  HubSpot --> Worker
  Jira --> Worker
  Slack --> Worker
  GSM --> Worker
  Worker --> BigQuery[BigQuery tenant datasets]
  BigQuery --> Vertex[Vertex AI embeddings index]
  Vertex --> Search[Semantic search and Q and A]
  BigQuery --> Dataform[Dataform transforms]
  Dataform --> Analytics[Analytics with RLS]
`}</div>
          </div>
        </div>
      </section>

      {/* Agents: Loading, Instantiation, Orchestration, Tooling */}
      <section id="agents-orchestration" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">From Goal to Teamwork—Automagically.</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">You describe a goal. The 2N+1 Orchestrator plans, approves tools, and spins up the right specialists. Each agent follows a Think–Act–Observe loop, and the Orchestrator synthesizes their work into a single result.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 max-w-5xl mx-auto">
            <div className="mermaid text-left">{`graph TD
  Goal[Business Goal] --> Orchestrator[2N+1 Orchestrator]
  Orchestrator --> Plan[Plan and Think-Act-Observe]
  Orchestrator --> Approvals[Tool approbation safety]
  Orchestrator --> Team[Team orchestrator]
  Team --> SpecialistA[Specialist A]
  Team --> SpecialistB[Specialist B]
  SpecialistA --> Obs1[Observation]
  SpecialistB --> Obs2[Observation]
  Obs1 --> Orchestrator
  Obs2 --> Orchestrator
  Orchestrator --> Result[Final synthesis and result]
`}</div>
          </div>
        </div>
      </section>

      {/* Asynchronous multi-concurrency: Redis + Celery + Repository */}
      <section id="async-execution" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">Fast, Safe, and Scalable Execution.</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">Tasks run in the background using Celery and Redis. Jobs persist in the database, workers process them in parallel, and results—including AI-generated assets—are stored in the Repository service with real-time status updates to the UI.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 max-w-5xl mx-auto">
            <div className="mermaid text-left">{`graph TD
  API[API request] --> Job[Job table persistent state]
  Job --> Celery[Celery task]
  Celery --> Redis[Redis broker]
  Redis --> Worker1[Worker 1]
  Redis --> WorkerN[Worker N]
  Worker1 --> Repo[Repository service AI assets]
  WorkerN --> Repo
  Worker1 --> Done[Job complete]
  WorkerN --> Done
  Done --> Updates[Live updates via PubSub]
  Updates --> UI[User interface]
  Repo --> UI
`}</div>
          </div>
        </div>
      </section>

      {/* MCP Tools + OAuth */}
      <section id="mcp-oauth" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">Tools with Guardrails.</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">MCP tools connect to third-party systems through OAuth. Tokens are stored in GSM per tenant. Before acting, agents pass a Confirm Action step. Then calls are made to the right API with scoped credentials.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 max-w-5xl mx-auto">
            <div className="mermaid text-left">{`graph TD
  User[Connect tool] --> OAuth[OAuth endpoint]
  OAuth --> GSM[Store token in GSM per tenant]
  GSM --> Tool[MCP tool scoped credentials]
  Tool --> Confirm[Confirm Action]
  Confirm --> API[Third party API]
  API --> External[External system]
  External --> Agents[Result to agents]
`}</div>
          </div>
        </div>
      </section>

      {/* Repository section */}
      <section id="repository" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">The Repository: Shared memory for all agents.</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">Every artifact your agents create—documents, datasets, code, and media—is stored in the Repository. Any agent can search, retrieve, and build on prior outputs, so your system compounds in capability over time.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 max-w-5xl mx-auto">
            <div className="mermaid text-left">{`graph TD
  Repo[Repository service] --- Assets[Assets: docs, data, code, media]
  AgentA[Agent A] --> Repo
  AgentB[Agent B] --> Repo
  AgentC[Agent C] --> Repo
  Repo --> SearchRepo[Search and browse]
  Repo --> Retrieve[Retrieve by context and tags]
  Retrieve --> AgentA
  Retrieve --> AgentB
  Retrieve --> AgentC
  Growth[Repository grows over time] --> Repo
`}</div>
          </div>
        </div>
      </section>

      {/* Agents Foundry section */}
      <section id="agents-foundry" className="py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">
            Agents Foundry: Design your own private AI agents.
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-balance">
            Go beyond our pre-built teams. Design and deploy your own custom, private AI agents and workflows by
            having a simple conversation with the Orchestrator. It's not a no-code builder; it's an AI that builds for
            you.
          </p>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto mt-2">
            When you first open the platform, you'll also find a handful of small prebuilt agents to try—use them as
            starters or learning examples.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - User input */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">You</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-medium">I need an agent that can screen new job applicants</p>
                    <div className="text-sm text-slate-600">
                      It should review resumes, check LinkedIn profiles, and score candidates based on our hiring
                      criteria...
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - AI response */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <BrainCircuit className="w-4 h-4 text-slate-900" />
                  </div>
                  <div className="space-y-4">
                    <p className="font-medium">Agent Blueprint Generated</p>
                    <div className="bg-slate-800 rounded-lg p-4 text-sm">
                      <div className="space-y-2">
                        <div className="text-slate-300">
                          <span className="text-green-400">✓</span> Resume Parser & Analyzer
                        </div>
                        <div className="text-slate-300">
                          <span className="text-green-400">✓</span> LinkedIn Profile Evaluator
                        </div>
                        <div className="text-slate-300">
                          <span className="text-green-400">✓</span> Scoring Algorithm (Custom Criteria)
                        </div>
                        <div className="text-slate-300">
                          <span className="text-green-400">✓</span> ATS Integration Ready
                        </div>
                      </div>
                    </div>
                    <Button className="bg-white text-slate-900 hover:bg-slate-100 text-sm">
                      Deploy Agent
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="carousel-container">
            {/* Agent Teams Cards - duplicated for seamless loop */}
            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">BlogPost Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in content creation, keyword research, and SEO optimization for blog posts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <PenTool className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">Copywriter Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in audience analysis, brand voice management, and content creation across various
                  mediums.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">Email Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in email marketing campaign strategy, content creation, and template design.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-lg">SocialMedia Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in social media content creation, engagement optimization, and platform-specific
                  adaptation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Support Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in customer sentiment analysis and support response drafting.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-lg">SEO Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in search engine optimization and website performance analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-emerald-600" />
                  <CardTitle className="text-lg">Ecommerce Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in e-commerce operations, customer retention, and sales optimization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-6 h-6 text-teal-600" />
                  <CardTitle className="text-lg">OfficeAdmin Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in office automation, document generation, and administrative tasks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-cyan-600" />
                  <CardTitle className="text-lg">ProductivityAnalyst Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in workplace productivity analysis and performance monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-amber-600" />
                  <CardTitle className="text-lg">Real Estate & Property Management Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in real estate investment analysis, property marketing, tenant communication, and
                  lease compliance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                  <CardTitle className="text-lg">Analytics & Business Intelligence Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on data monitoring, anomaly detection, narrative reporting, and dashboard creation for
                  business insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-rose-600" />
                  <CardTitle className="text-lg">Education & Training Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents designed for personalized learning design, assessment creation, interactive tutoring, and
                  progress analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">Security & Identity Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on threat intelligence, access auditing, incident response, and security awareness
                  training.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-lg">Sales & CRM Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specializing in lead enrichment, deal progression monitoring, personalized outreach drafting,
                  and sales call summarization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-yellow-600" />
                  <CardTitle className="text-lg">Marketing & Growth Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on market resonance detection, persona-driven ad copy generation, SEO optimization, and
                  social media engagement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-slate-600" />
                  <CardTitle className="text-lg">Human Resources & Finance Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specializing in candidate screening, employee onboarding coordination, expense report auditing,
                  and payroll anomaly detection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-lime-600" />
                  <CardTitle className="text-lg">Communication & Messaging Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents for meeting synthesis, inbox triage, internal communications drafting, and cross-platform
                  broadcasting.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Duplicate set for seamless loop */}
            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">BlogPost Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in content creation, keyword research, and SEO optimization for blog posts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <PenTool className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">Copywriter Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in audience analysis, brand voice management, and content creation across various
                  mediums.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">Email Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in email marketing campaign strategy, content creation, and template design.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-pink-600" />
                  <CardTitle className="text-lg">SocialMedia Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in social media content creation, engagement optimization, and platform-specific
                  adaptation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HeadphonesIcon className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">Support Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in customer sentiment analysis and support response drafting.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-indigo-600" />
                  <CardTitle className="text-lg">SEO Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in search engine optimization and website performance analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-emerald-600" />
                  <CardTitle className="text-lg">Ecommerce Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in e-commerce operations, customer retention, and sales optimization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-6 h-6 text-teal-600" />
                  <CardTitle className="text-lg">OfficeAdmin Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in office automation, document generation, and administrative tasks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-cyan-600" />
                  <CardTitle className="text-lg">ProductivityAnalyst Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in workplace productivity analysis and performance monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-amber-600" />
                  <CardTitle className="text-lg">Real Estate & Property Management Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specialized in real estate investment analysis, property marketing, tenant communication, and
                  lease compliance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                  <CardTitle className="text-lg">Analytics & Business Intelligence Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on data monitoring, anomaly detection, narrative reporting, and dashboard creation for
                  business insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-rose-600" />
                  <CardTitle className="text-lg">Education & Training Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents designed for personalized learning design, assessment creation, interactive tutoring, and
                  progress analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">Security & Identity Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on threat intelligence, access auditing, incident response, and security awareness
                  training.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-lg">Sales & CRM Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specializing in lead enrichment, deal progression monitoring, personalized outreach drafting,
                  and sales call summarization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-yellow-600" />
                  <CardTitle className="text-lg">Marketing & Growth Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents focused on market resonance detection, persona-driven ad copy generation, SEO optimization, and
                  social media engagement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-slate-600" />
                  <CardTitle className="text-lg">Human Resources & Finance Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents specializing in candidate screening, employee onboarding coordination, expense report auditing,
                  and payroll anomaly detection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-lime-600" />
                  <CardTitle className="text-lg">Communication & Messaging Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Agents for meeting synthesis, inbox triage, internal communications drafting, and cross-platform
                  broadcasting.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MCP Tools section */}
      <section className="py-24 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">
            The Hands of Your Workforce: The Model Context Protocol (MCP)
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-balance">
            Our agents don't just think—they act. Through MCP integrations, they can directly interact with your tools
            and systems.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="carousel-container">
            {/* MCP Tools Cards - duplicated for seamless loop */}
            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Send className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">MCP Resend Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Handles email sending via Resend API for marketing and communication workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Twitter className="w-6 h-6 text-sky-600" />
                  <CardTitle className="text-lg">MCP Twitter Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Posts threads and updates to Twitter (X) for social media campaigns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <CardTitle className="text-lg">MCP LinkedIn Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Posts content, articles, and updates to LinkedIn for professional networking and B2B marketing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Slack className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">MCP Slack Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with Slack for internal communications, notifications, and team collaboration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bug className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-lg">MCP Jira Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Manages Jira issues for project tracking and development workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">MCP HubSpot Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with HubSpot for CRM operations, lead management, and marketing automation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">MCP Shopify Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Handles e-commerce operations in Shopify stores, such as order management and product updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <StickyNote className="w-6 h-6 text-slate-600" />
                  <CardTitle className="text-lg">MCP Notion Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Interacts with Notion for knowledge base management, page creation, and database queries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">MCP Google Workspace Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with Google Workspace for calendar events, drive files, and sheets manipulation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Github className="w-6 h-6 text-slate-900" />
                  <CardTitle className="text-lg">MCP GitHub Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Manages GitHub repositories, issues, and PRs for development workflows.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Duplicate set for seamless loop */}
            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Send className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">MCP Resend Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Handles email sending via Resend API for marketing and communication workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Twitter className="w-6 h-6 text-sky-600" />
                  <CardTitle className="text-lg">MCP Twitter Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Posts threads and updates to Twitter (X) for social media campaigns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <CardTitle className="text-lg">MCP LinkedIn Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Posts content, articles, and updates to LinkedIn for professional networking and B2B marketing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Slack className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg">MCP Slack Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with Slack for internal communications, notifications, and team collaboration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bug className="w-6 h-6 text-blue-500" />
                  <CardTitle className="text-lg">MCP Jira Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Manages Jira issues for project tracking and development workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-lg">MCP HubSpot Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with HubSpot for CRM operations, lead management, and marketing automation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">MCP Shopify Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Handles e-commerce operations in Shopify stores, such as order management and product updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <StickyNote className="w-6 h-6 text-slate-600" />
                  <CardTitle className="text-lg">MCP Notion Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Interacts with Notion for knowledge base management, page creation, and database queries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-6 h-6 text-red-600" />
                  <CardTitle className="text-lg">MCP Google Workspace Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Integrates with Google Workspace for calendar events, drive files, and sheets manipulation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="carousel-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Github className="w-6 h-6 text-slate-900" />
                  <CardTitle className="text-lg">MCP GitHub Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Manages GitHub repositories, issues, and PRs for development workflows.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agents Foundry relocated above */}

      {/* Industry Context section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-8">
            Built for the New Era of AI-Native Automation.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The first wave of automation was about connecting apps with static, trigger-based workflows. The second wave
            was about applying AI to specific, vertical tasks like customer support. Etherion is the third wave: a
            horizontal, agentic platform that allows businesses to build their own secure, intelligent, and autonomous
            digital workforce, moving beyond simple automation to true operational autonomy.
          </p>
        </div>
      </section>

      {/* Current Stage section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance mb-6">
              Roadmap: Shipping to Production.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Strong hard features are implemented. Our current focus is wiring services, production testing, and
              environment configuration.
            </p>
          </div>

          <div className="space-y-12">
            {/* Stage 1 - Completed */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">Core Architecture & MVP</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    Complete
                  </span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The foundational single-tenant infrastructure, the 2N+1 Orchestrator, and the core agentic framework
                  are built and validated.
                </p>
              </div>
            </div>

            {/* Stage 2 - In Progress */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-500">
                  <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">Wiring, Production Testing & Configuration</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    In Progress
                  </span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Core systems are in place (orchestrator, async workers, MCP toolchain, knowledge base, repository).
                  We are wiring services together, validating in production-like environments, tuning configuration,
                  hardening security/observability, and finalizing end-to-end tests.
                </p>
              </div>
            </div>

            {/* Stage 3 - Upcoming */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-300">
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">Private Beta Launch</h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-semibold rounded-full">
                    Upcoming
                  </span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Following the current hardening sprint, we will be opening the platform to a limited number of initial
                  users. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="founder" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Professional Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/jonathan-founder.png"
                  alt="Jonathan Nde, Founder of Etherion"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right Column - Bio */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight text-balance">
                Built by an Architect.
              </h2>
              <h3 className="text-xl font-semibold text-slate-700">Jonathan Nde, Founder of Etherion.</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Etherion was born from a single, powerful insight: the future of AI is not just about building better
                tools, but about fundamentally changing our relationship with work. As a self-taught, curious, and
                fast-thinking systems architect, My vision is to empower users to move beyond tedious
                implementation and focus on what humans do best: high-level strategy and creativity. Etherion is the
                culmination of this vision A Platform designed not just for coders, but for architects.
              </p>
              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/in/jonathan-nde-3a5782324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1 - Logo & Copyright */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Etherion Logo" width={24} height={24} />
                <div className="text-xl font-bold text-white tracking-tight">Etherion</div>
              </div>
              <p className="text-sm text-slate-400">© 2025 Etherion. All rights reserved.</p>
            </div>

            {/* Column 2 - Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
              <div className="space-y-2">
                <a href="#problem" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  The Problem
                </a>
                <a href="#solution" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  The Solution
                </a>
                <a href="#how-it-works" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  How It Works
                </a>
                <a href="#founder" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Founder
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent mt-2"
                >
                  Join Private Beta
                </Button>
              </div>
            </div>

            {/* Column 3 - Contact & Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact & Legal</h4>
              <div className="space-y-2">
                <a
                  href="mailto:contact@etherionai.com"
                  className="block text-slate-400 hover:text-white transition-colors text-sm"
                >
                  contact@etherionai.com
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
