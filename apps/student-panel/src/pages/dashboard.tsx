export default function Dashboard(){
    return(
        <main className="min-h-screen bg-background p-6">
            <h1 className="text-3xl font-bold">
                Welcome to Vidyahub
            </h1>
            <p className="mt-2 text-muted-foreground">
                Here is your student dashboard
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-5">
                    <h2 className="text-lg font-semibold">
                        Attendence
                    </h2>
                    <p className="mt-3 text-3xl font-bold">
                        92% 
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Overall Attendance
                    </p>
                </div>
            </div>
        </main>
    );
}