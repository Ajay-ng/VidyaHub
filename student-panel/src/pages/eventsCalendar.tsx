
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  BookOpen,
  PartyPopper,
  Landmark,
  GraduationCap,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EventCategory =
  | "Government Holiday"
  | "Examination"
  | "Internal Assessment"
  | "College Event";

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  description: string;
};

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Karnataka Rajyotsava",
    date: "2026-11-01",
    time: "All day",
    venue: "Public Holiday",
    category: "Government Holiday",
    description:
      "Karnataka Formation Day. Verify the applicable holiday notification for your institution.",
  },
  {
    id: 2,
    title: "Internal Assessment - DBMS",
    date: "2026-11-05",
    time: "10:00 AM - 11:00 AM",
    venue: "Room 204",
    category: "Internal Assessment",
    description:
      "Internal assessment for Database Management Systems. Bring your college ID and required stationery.",
  },
  {
    id: 3,
    title: "Technical Workshop",
    date: "2026-11-10",
    time: "10:00 AM - 1:00 PM",
    venue: "Computer Lab",
    category: "College Event",
    description:
      "A sample technical workshop for students to explore current software development practices.",
  },
  {
    id: 4,
    title: "Internal Assessment - Web Development",
    date: "2026-11-12",
    time: "9:30 AM - 10:30 AM",
    venue: "Room 105",
    category: "Internal Assessment",
    description:
      "Internal assessment for Web Development. Check your faculty's syllabus and instructions.",
  },
  {
    id: 5,
    title: "Semester Examination",
    date: "2026-11-18",
    time: "9:30 AM - 12:30 PM",
    venue: "Examination Hall",
    category: "Examination",
    description:
      "Sample semester examination entry. Confirm the final timetable with your institution.",
  },
  {
    id: 6,
    title: "College Cultural Fest",
    date: "2026-11-21",
    time: "9:00 AM - 5:00 PM",
    venue: "College Auditorium",
    category: "College Event",
    description:
      "A sample college cultural event featuring student performances and activities.",
  },
  {
    id: 7,
    title: "Internal Assessment - Data Structures",
    date: "2026-11-25",
    time: "10:00 AM - 11:00 AM",
    venue: "Room 108",
    category: "Internal Assessment",
    description:
      "Sample internal assessment date for Data Structures.",
  },
  {
    id: 8,
    title: "Semester Examination",
    date: "2026-12-02",
    time: "9:30 AM - 12:30 PM",
    venue: "Examination Hall",
    category: "Examination",
    description:
      "Sample semester examination entry. Refer to the official examination timetable.",
  },
  {
    id: 9,
    title: "Christmas Day",
    date: "2026-12-25",
    time: "All day",
    venue: "Public Holiday",
    category: "Government Holiday",
    description:
      "Christmas Day. Confirm the official holiday calendar applicable to your institution.",
  },
];

const categories: EventCategory[] = [
  "Government Holiday",
  "Examination",
  "Internal Assessment",
  "College Event",
];

const categoryStyles: Record<EventCategory, string> = {
  "Government Holiday":
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300",
  Examination:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300",
  "Internal Assessment":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  "College Event":
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300",
};

function getCategoryIcon(category: EventCategory) {
  switch (category) {
    case "Government Holiday":
      return Landmark;
    case "Examination":
      return GraduationCap;
    case "Internal Assessment":
      return BookOpen;
    case "College Event":
      return PartyPopper;
  }
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getDateKey(year: number, month: number, day: number) {
  return [
    year,
    String(month + 1).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

export default function EventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [activeCategory, setActiveCategory] = useState<
    EventCategory | "All"
  >("All");

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const todayKey = getDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const monthLabel = currentMonth.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const monthEvents = useMemo(
    () =>
      initialEvents
        .filter((event) => {
          const eventDate = new Date(`${event.date}T00:00:00`);
          return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month
          );
        })
        .sort((a, b) => a.date.localeCompare(b.date)),
    [year, month]
  );

  const visibleEvents = useMemo(
    () =>
      monthEvents.filter(
        (event) =>
          activeCategory === "All" ||
          event.category === activeCategory
      ),
    [monthEvents, activeCategory]
  );

  const selectedDateEvents = visibleEvents.filter(
    (event) => event.date === selectedDate
  );

  const upcomingEvents = visibleEvents.filter(
    (event) => event.date >= todayKey
  );

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  function changeMonth(direction: number) {
    setCurrentMonth(new Date(year, month + direction, 1));
    setSelectedDate(null);
    setSelectedEvent(null);
  }

  function goToToday() {
    const today = new Date();
    setCurrentMonth(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
    setSelectedDate(todayKey);
    setSelectedEvent(null);
  }

  return (
    <main className="space-y-6 bg-background p-2 text-foreground">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-7 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Events Calendar
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep track of holidays, examinations, assessments, and college events.
          </p>
        </div>

        <Button variant="outline" onClick={goToToday}>
          Go to Today
        </Button>
      </section>

      {/* Category legend */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);
          const count = monthEvents.filter(
            (event) => event.category === category
          ).length;

          return (
            <button
              type="button"
              key={category}
              onClick={() =>
                setActiveCategory((previous) =>
                  previous === category ? "All" : category
                )
              }
              className={`rounded-xl border p-4 text-left transition hover:shadow-sm ${
                activeCategory === category
                  ? "ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="size-5 text-primary" />
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <span className="text-xl font-bold">{count}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {count === 1 ? "1 event" : `${count} events`} this month
              </p>
            </button>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Calendar */}
        <Card className="min-w-0">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>{monthLabel}</CardTitle>
                <CardDescription className="mt-1">
                  Select a date to view its events.
                </CardDescription>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Previous month"
                  onClick={() => changeMonth(-1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Next month"
                  onClick={() => changeMonth(1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <div
                    key={day}
                    className="py-2 text-center text-xs font-semibold text-muted-foreground"
                  >
                    {day}
                  </div>
                )
              )}

              {calendarCells.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} />;
                }

                const dateKey = getDateKey(year, month, day);

                const dayEvents = visibleEvents.filter(
                  (event) => event.date === dateKey
                );

                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedDate;

                return (
                  <button
                    type="button"
                    key={dateKey}
                    onClick={() => {
                      setSelectedDate(dateKey);
                      setSelectedEvent(null);
                    }}
                    aria-label={`${dateKey}, ${dayEvents.length} events`}
                    className={`relative flex min-h-16 flex-col items-center gap-1 rounded-lg border p-1 text-sm transition sm:min-h-20 sm:p-2 ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-transparent hover:border-border hover:bg-muted"
                    } ${isToday ? "font-bold" : ""}`}
                  >
                    <span
                      className={`flex size-7 items-center justify-center rounded-full ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {day}
                    </span>

                    <div className="flex flex-wrap justify-center gap-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span
                          key={event.id}
                          className={`size-1.5 rounded-full ${
                            event.category === "Government Holiday"
                              ? "bg-rose-500"
                              : event.category === "Examination"
                                ? "bg-violet-500"
                                : event.category === "Internal Assessment"
                                  ? "bg-amber-500"
                                  : "bg-sky-500"
                          }`}
                        />
                      ))}
                    </div>

                    {dayEvents.length > 0 && (
                      <span className="text-[10px] text-muted-foreground">
                        {dayEvents.length} event
                        {dayEvents.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className={`size-2 rounded-full ${
                      category === "Government Holiday"
                        ? "bg-rose-500"
                        : category === "Examination"
                          ? "bg-violet-500"
                          : category === "Internal Assessment"
                            ? "bg-amber-500"
                            : "bg-sky-500"
                    }`}
                  />
                  {category}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event list */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? formatDate(selectedDate)
                : "Upcoming Events"}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? "Events scheduled for the selected date"
                : "Your schedule for the selected month"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onSelect={() => setSelectedEvent(event)}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <CalendarDays className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-2 font-medium">No events on this date</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select another date to see scheduled events.
                  </p>
                  <Button
                    className="mt-3"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                  >
                    View upcoming events
                  </Button>
                </div>
              )
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  onSelect={() => {
                    setSelectedDate(event.date);
                    setSelectedEvent(event);
                  }}
                />
              ))
            ) : (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No upcoming events for this filter.
              </div>
            )}

            {activeCategory !== "All" && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setActiveCategory("All")}
              >
                Clear category filter
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected event details */}
      {selectedEvent && (
        <Card className="border-primary/30">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Badge className={categoryStyles[selectedEvent.category]}>
                  {selectedEvent.category}
                </Badge>
                <CardTitle>{selectedEvent.title}</CardTitle>
                <CardDescription>
                  {selectedEvent.description}
                </CardDescription>
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Close event details"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              {formatDate(selectedEvent.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {selectedEvent.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {selectedEvent.venue}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Sample calendar data for demonstration only. Confirm government
        holidays, internal assessments, examinations, and college events
        with official notices from your institution.
      </p>
    </main>
  );
}

function EventItem({
  event,
  onSelect,
}: {
  event: CalendarEvent;
  onSelect: () => void;
}) {
  const Icon = getCategoryIcon(event.category);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-3 rounded-lg border p-3 text-left transition hover:bg-muted/50"
    >
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium">{event.title}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}{" "}
          · {event.time}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {event.venue}
        </p>

        <Badge
          variant="outline"
          className={`mt-2 ${categoryStyles[event.category]}`}
        >
          {event.category}
        </Badge>
      </div>

      <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
    </button>
  );
}
