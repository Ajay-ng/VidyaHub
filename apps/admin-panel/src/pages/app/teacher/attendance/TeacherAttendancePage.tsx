import { AttendanceHeader } from "@/components/teacher/attendance/AttendanceHeader";
import { AttendanceFilters } from "@/components/teacher/attendance/AttendanceFilters";
import { AttendanceSummaryCards } from "@/components/teacher/attendance/AttendanceSummaryCards";
import { AttendanceTable } from "@/components/teacher/attendance/AttendanceTable";
import { AttendanceActions } from "@/components/teacher/attendance/AttendanceActions";
import { AttendanceHistory } from "@/components/teacher/attendance/AttendanceHistory";

export default function TeacherAttendancePage() {
  return (
    <div className="space-y-6 p-6">
      <AttendanceHeader />

      <AttendanceFilters />

      <AttendanceSummaryCards />

      <AttendanceTable />

      <AttendanceActions />

      <AttendanceHistory />
    </div>
  );
}