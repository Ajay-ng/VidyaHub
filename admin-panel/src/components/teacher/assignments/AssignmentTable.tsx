import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MoreHorizontal,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type Assignment = {
  id: number;
  title: string;
  subject: string;
  className: string;
  published: string;
  dueDate: string;
  status: "Live" | "Completed" | "Draft";
  submitted: number;
  total: number;
};

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Maths Worksheet",
    subject: "Mathematics",
    className: "10-A",
    published: "10 Oct",
    dueDate: "20 Oct",
    status: "Live",
    submitted: 34,
    total: 42,
  },
  {
    id: 2,
    title: "Science Lab",
    subject: "Science",
    className: "9-B",
    published: "12 Oct",
    dueDate: "22 Oct",
    status: "Completed",
    submitted: 38,
    total: 38,
  },
  {
    id: 3,
    title: "English Essay",
    subject: "English",
    className: "8-A",
    published: "14 Oct",
    dueDate: "24 Oct",
    status: "Live",
    submitted: 26,
    total: 35,
  },
  {
    id: 4,
    title: "Social Assignment",
    subject: "Social",
    className: "10-B",
    published: "15 Oct",
    dueDate: "26 Oct",
    status: "Draft",
    submitted: 0,
    total: 40,
  },
];

export function AssignmentTable() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const getStatusBadge = (status: Assignment["status"]) => {
    switch (status) {
      case "Live":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            🟢 Live
          </Badge>
        );

      case "Completed":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            🔵 Completed
          </Badge>
        );

      case "Draft":
        return (
          <Badge variant="secondary">
            🟠 Draft
          </Badge>
        );
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Assignments
          </h2>

          <div className="relative w-72">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search Assignment..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        <div className="rounded-lg border overflow-x-auto">

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>Assignment</TableHead>

                <TableHead>Subject</TableHead>

                <TableHead>Class</TableHead>

                <TableHead>Published</TableHead>

                <TableHead>Due Date</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Progress</TableHead>

                <TableHead>Pending</TableHead>

                <TableHead className="text-right">
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {filteredAssignments.map((assignment) => {

                const pending =
                  assignment.total - assignment.submitted;

                return (

                  <TableRow key={assignment.id}>

                    <TableCell className="font-medium">
                      {assignment.title}
                    </TableCell>

                    <TableCell>
                      {assignment.subject}
                    </TableCell>

                    <TableCell>
                      {assignment.className}
                    </TableCell>

                    <TableCell>
                      {assignment.published}
                    </TableCell>

                    <TableCell>
                      {assignment.dueDate}
                    </TableCell>

                    <TableCell>
                      {getStatusBadge(assignment.status)}
                    </TableCell>

                    <TableCell>

                      <Badge variant="outline">
                        {assignment.submitted}/{assignment.total}
                      </Badge>

                    </TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          pending === 0
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {pending}
                      </Badge>

                    </TableCell>

                    <TableCell className="text-right">

                      <DropdownMenu>

                        <DropdownMenuTrigger>

                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
  <DropdownMenuItem
    onClick={() => navigate("/teacher/assignments/details")}
  >
    <Eye className="mr-2 h-4 w-4" />
    View
  </DropdownMenuItem>

  <DropdownMenuItem
  onClick={() => navigate("/teacher/assignments/edit")}
>
  <Pencil className="mr-2 h-4 w-4" />
  Edit
</DropdownMenuItem>

  <DropdownMenuItem
  onClick={() => navigate("/teacher/assignments/delete")}
  className="text-red-600 focus:text-red-600"
>
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</DropdownMenuItem>
</DropdownMenuContent>

                       
                            

                      </DropdownMenu>

                    </TableCell>

                  </TableRow>

                );
              })}

            </TableBody>

          </Table>

        </div>

      </CardContent>

    </Card>
  );
}