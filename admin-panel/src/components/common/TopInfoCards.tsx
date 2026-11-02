import { Card, CardContent } from "../ui/card"

export interface InfoCardProps {
  title: string
  value: string | number
  description: string
  trend?: string
  trendType?: "positive" | "negative" | "neutral"
}

export default function InfoCard({
  title,
  value,
  description,
  trend,
  trendType = "neutral",
}: InfoCardProps) {
  const trendColor = {
    positive: "text-emerald-600",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className="h-full min-w-0 py-2">
      <CardContent className="flex h-full flex-col p-4 sm:p-5">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight">{value}</h2>

        <div className="mt-2 flex flex-wrap items-start gap-x-2">
          {trend && (
            <span
              className={`shrink-0 text-xs font-semibold ${trendColor[trendType]}`}
            >
              {trend}
            </span>
          )}

          <p className="min-w-0 text-xs leading-5 wrap-break-word text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
