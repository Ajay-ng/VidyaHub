import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StudentsFilters() {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Class */}
          <div className="w-full lg:w-44">
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Section */}
          <div className="w-full lg:w-40">
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Section" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attendance */}
          <div className="w-full lg:w-44">
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Attendance" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search by name..."
              className="h-10 pl-9"
            />
          </div>

          {/* Export */}
          <Button className="h-10 gap-2 bg-yellow-400 hover:bg-yellow-500 text-black">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}