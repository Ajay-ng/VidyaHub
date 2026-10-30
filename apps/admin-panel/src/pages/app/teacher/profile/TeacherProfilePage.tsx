import { ArrowLeft, Mail, Phone, Camera } from "lucide-react"

import { useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teacher = {
  id: "EMP-1024",
  name: "Mr. John David",
  role: "Mathematics Teacher",
  email: "john.david@vidyahub.com",
  phone: "+91 9876543210",
  image: "https://github.com/shadcn.png",
  department: "Mathematics",
  status: "Active",
}

export default function TeacherProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/teacher/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">Teacher Profile</h1>

            <p className="text-sm text-muted-foreground">
              View your profile information
            </p>
          </div>
        </div>

        <Button>Edit Profile</Button>
      </div>

      {/* Profile Card */}

      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="relative">
              <Avatar className="h-28 w-28">
                <AvatarImage src={teacher.image} alt={teacher.name} />

                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <Button
                size="icon"
                className="absolute right-0 bottom-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold">{teacher.name}</h2>

              <p className="mt-1 text-muted-foreground">{teacher.role}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Badge>{teacher.id}</Badge>

                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {teacher.status}
                </Badge>

                <Badge variant="secondary">{teacher.department}</Badge>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />

                  <span className="text-sm">{teacher.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />

                  <span className="text-sm">{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>

              <p className="mt-1 font-semibold">Mr. John David</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>

              <p className="mt-1 font-semibold">EMP-1024</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Gender</p>

              <p className="mt-1 font-semibold">Male</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>

              <p className="mt-1 font-semibold">15 August 1992</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Mobile Number</p>

              <p className="mt-1 font-semibold">+91 9876543210</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>

              <p className="mt-1 font-semibold">john.david@vidyahub.com</p>
            </div>

            <div className="lg:col-span-3">
              <p className="text-sm text-muted-foreground">Address</p>

              <p className="mt-1 font-semibold">
                24, MG Road, Bengaluru, Karnataka
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}

      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Department</p>

              <p className="mt-1 font-semibold">Mathematics</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Subject</p>

              <p className="mt-1 font-semibold">Mathematics</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Designation</p>

              <p className="mt-1 font-semibold">Senior Mathematics Teacher</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Qualification</p>

              <p className="mt-1 font-semibold">M.Sc Mathematics, B.Ed</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Experience</p>

              <p className="mt-1 font-semibold">6 Years</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Joining Date</p>

              <p className="mt-1 font-semibold">12 June 2021</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Employment Status</p>

              <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Assigned Classes */}

      <Card>
        <CardHeader>
          <CardTitle>Assigned Classes</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Class 10 - A
            </Badge>

            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Class 10 - B
            </Badge>

            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Class 9 - A
            </Badge>

            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              Class 8 - B
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Teaching Statistics */}

      <Card>
        <CardHeader>
          <CardTitle>Teaching Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="p-5 text-center">
                <h2 className="text-3xl font-bold">128</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Total Students
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 text-center">
                <h2 className="text-3xl font-bold">4</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Assigned Classes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 text-center">
                <h2 className="text-3xl font-bold">18</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Assignments Created
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 text-center">
                <h2 className="text-3xl font-bold">96%</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Attendance Submitted
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Contact Person</p>

              <p className="mt-1 font-semibold">Ramesh Kumar</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Relationship</p>

              <p className="mt-1 font-semibold">Father</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Contact Number</p>

              <p className="mt-1 font-semibold">+91 9876543200</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>

              <p className="mt-1 font-semibold">john.david</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Role</p>

              <Badge>Teacher</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>

              <p className="mt-1 font-semibold">Today, 08:30 AM</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Account Status</p>

              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/teacher/dashboard")}
        >
          Back
        </Button>

        <Button>Edit Profile</Button>
      </div>
    </div>
  )
}
