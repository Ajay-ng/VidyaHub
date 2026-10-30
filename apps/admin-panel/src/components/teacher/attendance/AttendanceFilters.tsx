import { Search, Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AttendanceFilters() {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Class */}
          <div className="w-full lg:w-44">
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
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
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="w-full lg:w-52">
            <Select>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="social">Social Science</SelectItem>
                <SelectItem value="computer">
                  Computer Science
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Search Student */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search Student..."
              className="h-10 pl-9"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}