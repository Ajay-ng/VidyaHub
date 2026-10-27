import { Bell, Search, } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-4">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="hidden sm:block">
          <p className="font-semibold">Vidyahub</p>
          <p className="text-xs text-muted-foreground">
            Student Portal
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search..."
          className="pl-9"
          aria-label="Search"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
        >
          <Bell className="size-6" />
        </Button>

<Avatar>
  <AvatarImage
    src="/profile.jpg"
    alt="Hemanth Kumar"
  />
  <AvatarFallback>HK</AvatarFallback>
</Avatar>

        <div className="hidden sm:block">
          <p className="text-sm font-semibold">Hemanth Kumar</p>
          <p className="text-xs text-muted-foreground">
            Hemanth
          </p>
        </div>
      </div>
    </header>
  );
}
