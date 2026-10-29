import { AssignmentHeader } from "@/components/teacher/assignments/AssignmentHeader";
import { AssignmentFilters } from "@/components/teacher/assignments/AssignmentFilters";
import { AssignmentStatistics } from "@/components/teacher/assignments/AssignmentStatistics";
import { AssignmentTable } from "@/components/teacher/assignments/AssignmentTable";

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-6 p-6">
      <AssignmentHeader />
      <AssignmentStatistics />
      <AssignmentFilters />
      <AssignmentTable />
    </div>
  );
}