import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="w-full border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-[50px] py-4">
        <div className="flex items-center gap-3">
          <div
            className="size-6 rounded-md"
            style={{
              background: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))",
            }}
            aria-hidden
          />
          <span className="text-sm font-semibold tracking-wide">Knob</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a className="text-foreground/70 hover:text-foreground" href="#">
            Features
          </a>
          <a className="text-foreground/70 hover:text-foreground" href="#">
            Components
          </a>
          <a className="text-foreground/70 hover:text-foreground" href="#">
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="border bg-transparent"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--foreground)" }}
          >
            Sign in
          </Button>
          <Button
            className="hidden sm:inline-flex"
            style={{
              color: "#00160a",
              backgroundImage: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))",
            }}
          >
            Try now
          </Button>
        </div>
      </nav>
    </header>
  )
}
