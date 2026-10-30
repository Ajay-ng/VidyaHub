import { Search, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AssignmentFilters() {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-6">
        {/* Class */}
        <Select>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Class" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10A">Class 10-A</SelectItem>
            <SelectItem value="10B">Class 10-B</SelectItem>
            <SelectItem value="9A">Class 9-A</SelectItem>
            <SelectItem value="8A">Class 8-A</SelectItem>
          </SelectContent>
        </Select>

        {/* Subject */}
        <Select>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="maths">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="social">Social Science</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        {/* Due Date */}
        <Button variant="outline" className="h-10 justify-start font-normal">
          <CalendarDays className="mr-2 h-4 w-4" />
          Due Date
        </Button>

        {/* Search */}
        <div className="relative col-span-2">
          <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

          <Input placeholder="Search assignment..." className="h-10 pl-9" />
        </div>
      </div>
    </div>
  )
}
