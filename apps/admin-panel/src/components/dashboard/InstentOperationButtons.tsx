import { GraduationCap, Users, Megaphone } from "lucide-react"
import { Button } from "../ui/button"

const buttonData = [
  {
    title: "Add Student",
    icon: GraduationCap,
  },
  {
    title: "Add Teacher",
    icon: Users,
  },
  {
    title: "Post Announcement",
    icon: Megaphone,
  },
]

export default function InstantOperationButtons() {
  return (
    <section className="mt-6 w-full border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">
            Quick Actions
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage your school operations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {buttonData.map((item) => {
            const Icon = item.icon

            return (
              <Button
                key={item.title}
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary"
              >
                <Icon className="size-4" />
                <span>{item.title}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
