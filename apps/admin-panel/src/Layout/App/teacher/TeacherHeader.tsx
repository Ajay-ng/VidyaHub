import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function TeacherHeader() {
  const profileData = {
    name: "Mr. John Doe",
    role: "Mathematics Teacher",
    image: "https://github.com/shadcn.png",
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-muted cursor-pointer">
        <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage
            src={profileData.image}
            alt={profileData.name}
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">
            {profileData.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {profileData.role}
          </p>
        </div>
      </div>
    </header>
  );
}