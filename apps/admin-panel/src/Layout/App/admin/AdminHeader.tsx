import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"

function AdminHeader() {
  const profileData = {
    name: "Gnanendra P",
    role: "Admin",
    image: "https://github.com/shadcn.png",
  }

  return (
    <header className="flex w-full items-center justify-between px-4 py-2 shadow-sm">
      <SidebarTrigger />

      <div>
        <Card className="border-none p-0 shadow-none">
          <CardContent className="flex items-center justify-center gap-2 p-2">
            <Avatar>
              <AvatarImage className="rounded-lg" src={profileData.image} />
            </Avatar>
            <div>
              <p className="font-semibold">{profileData.name}</p>
              <p>{profileData.role}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  )
}

export default AdminHeader
