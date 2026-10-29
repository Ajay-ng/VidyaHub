import { StudentsHeader } from "@/components/teacher/students/StudentsHeader";
import { StudentsStatistics } from "@/components/teacher/students/StudentsStatistics";
import { StudentsFilters } from "@/components/teacher/students/StudentsFilters";
import { StudentsTable } from "@/components/teacher/students/StudentsTable";


export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <StudentsHeader />
      <StudentsStatistics />
      <StudentsFilters />
       <StudentsTable />
       

    </div>
  );
}