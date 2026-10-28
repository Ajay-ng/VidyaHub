import { WelcomeBanner } from "@/components/teacher/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/teacher/dashboard/QuickActionsTabs";
import { StatisticsCards } from "@/components/teacher/dashboard/StatisticsCards";
import { TodayClasses } from "@/components/teacher/dashboard/TodaysClasses";
import { AttendanceOverview } from "@/components/teacher/dashboard/AttendanceOverview";
import { AssignmentOverview } from "@/components/teacher/dashboard/AssignmentOverview";
import { RecentActivities } from "@/components/teacher/dashboard/RecentActivities";
import { NoticeBoard } from "@/components/teacher/dashboard/NoticeBoard";
import { UpcomingEvents } from "@/components/teacher/dashboard/UpcomingEvents";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-5 px-6 pt-2 pb-6">
      <WelcomeBanner />

      <QuickActions />

      <StatisticsCards />

      <TodayClasses />

      <AttendanceOverview />

       <AssignmentOverview />

       <RecentActivities />

       <NoticeBoard />

       <UpcomingEvents />

    </div>
  );
}