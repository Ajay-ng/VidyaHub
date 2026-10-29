
import { useMemo, useState, type FormEvent } from "react";
import {
  BookOpen,
  BookPlus,
  BookCheck,
  BookX,
  Search,
  Plus,
  LibraryBig,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
};

const initialBooks: Book[] = [
  {
    id: "BK001",
    title: "Mathematics Class 10",
    author: "R. D. Sharma",
    category: "Mathematics",
    isbn: "9780000000011",
    totalCopies: 12,
    availableCopies: 8,
  },
  {
    id: "BK002",
    title: "Concepts of Physics",
    author: "H. C. Verma",
    category: "Science",
    isbn: "9780000000028",
    totalCopies: 10,
    availableCopies: 4,
  },
  {
    id: "BK003",
    title: "English Grammar",
    author: "Wren & Martin",
    category: "English",
    isbn: "9780000000035",
    totalCopies: 15,
    availableCopies: 15,
  },
  {
    id: "BK004",
    title: "Indian History",
    author: "Bipan Chandra",
    category: "History",
    isbn: "9780000000042",
    totalCopies: 8,
    availableCopies: 0,
  },
  {
    id: "BK005",
    title: "Computer Fundamentals",
    author: "P. K. Sinha",
    category: "Computer Science",
    isbn: "9780000000059",
    totalCopies: 20,
    availableCopies: 13,
  },
];

const categories = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Computer Science",
  "Geography",
  "General Knowledge",
  "Other",
];

const emptyForm = {
  title: "",
  author: "",
  category: "",
  isbn: "",
  totalCopies: "1",
};

export default function Library() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const totalCopies = books.reduce(
      (sum, book) => sum + book.totalCopies,
      0
    );

    const availableCopies = books.reduce(
      (sum, book) => sum + book.availableCopies,
      0
    );

    return {
      titles: books.length,
      totalCopies,
      availableCopies,
      issuedCopies: totalCopies - availableCopies,
    };
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.id.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" ||
        book.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" &&
          book.availableCopies > 0) ||
        (statusFilter === "unavailable" &&
          book.availableCopies === 0);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [books, search, categoryFilter, statusFilter]);

  function handleAddBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const copies = Number(form.totalCopies);

    if (
      !form.title.trim() ||
      !form.author.trim() ||
      !form.category ||
      !form.isbn.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isInteger(copies) || copies < 1) {
      setError("Total copies must be a positive whole number.");
      return;
    }

    if (books.some((book) => book.isbn === form.isbn.trim())) {
      setError("A book with this ISBN already exists.");
      return;
    }

    const newBook: Book = {
      id: `BK${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      isbn: form.isbn.trim(),
      totalCopies: copies,
      availableCopies: copies,
    };

    setBooks((previous) => [newBook, ...previous]);
    setForm(emptyForm);
    setOpen(false);
  }

  function issueBook(id: string) {
    setBooks((previous) =>
      previous.map((book) =>
        book.id === id && book.availableCopies > 0
          ? {
              ...book,
              availableCopies: book.availableCopies - 1,
            }
          : book
      )
    );
  }

  function returnBook(id: string) {
    setBooks((previous) =>
      previous.map((book) =>
        book.id === id &&
        book.availableCopies < book.totalCopies
          ? {
              ...book,
              availableCopies: book.availableCopies + 1,
            }
          : book
      )
    );
  }

  function deleteBook(id: string) {
    const book = books.find((item) => item.id === id);

    if (!book) return;

    if (book.availableCopies !== book.totalCopies) {
      window.alert(
        "You cannot delete a book while copies are issued."
      );
      return;
    }

    if (!window.confirm(`Delete "${book.title}"?`)) return;

    setBooks((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  const statCards = [
    {
      title: "Book Titles",
      value: stats.titles,
      icon: LibraryBig,
      description: "Unique books in catalogue",
    },
    {
      title: "Total Copies",
      value: stats.totalCopies,
      icon: BookOpen,
      description: "All library copies",
    },
    {
      title: "Available Copies",
      value: stats.availableCopies,
      icon: BookCheck,
      description: "Ready to issue",
    },
    {
      title: "Issued Copies",
      value: stats.issuedCopies,
      icon: BookX,
      description: "Currently borrowed",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Library Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage books, inventory, and library circulation.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);
            if (!value) {
              setError("");
              setForm(emptyForm);
            }
          }}
        >
          <DialogTrigger
            render={
              <Button>
                <Plus className="mr-2 size-4" />
                Add Book
              </Button>
            }
          />

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Enter the book details to add it to the catalogue.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book-title">Book Title</Label>
                <Input
                  id="book-title"
                  placeholder="Enter book title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="book-author">Author</Label>
                <Input
                  id="book-author"
                  placeholder="Enter author name"
                  value={form.author}
                  onChange={(e) =>
                    setForm({ ...form, author: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category || undefined}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      category: value ?? "",
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="book-isbn">ISBN</Label>
                <Input
                  id="book-isbn"
                  placeholder="Enter ISBN"
                  value={form.isbn}
                  onChange={(e) =>
                    setForm({ ...form, isbn: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="book-copies">Total Copies</Label>
                <Input
                  id="book-copies"
                  type="number"
                  min="1"
                  step="1"
                  value={form.totalCopies}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalCopies: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <BookPlus className="mr-2 size-4" />
                  Save Book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dashboard statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-xl bg-primary/20 p-3 text-primary-foreground">
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Catalogue */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Book Catalogue</CardTitle>
            <p className="text-sm text-muted-foreground">
              Search and manage your library collection.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Filters */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search title, author, ISBN or book ID..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={categoryFilter}
              onValueChange={(value) =>
                setCategoryFilter(value ?? "all")
              }
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value ?? "all")
              }
            >
              <SelectTrigger className="w-full lg:w-44">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">
                  Available
                </SelectItem>
                <SelectItem value="unavailable">
                  Unavailable
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book ID</TableHead>
                  <TableHead>Book Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No books found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBooks.map((book) => {
                    const issued =
                      book.totalCopies - book.availableCopies;

                    return (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">
                          {book.id}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="hidden rounded-lg bg-primary/15 p-2 sm:block">
                              <BookOpen className="size-5" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {book.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {book.author}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ISBN: {book.isbn}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">
                            {book.category}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {book.totalCopies}
                        </TableCell>

                        <TableCell>
                          {book.availableCopies}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              book.availableCopies > 0
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {book.availableCopies > 0
                              ? "Available"
                              : "Unavailable"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={book.availableCopies === 0}
                              onClick={() => issueBook(book.id)}
                              title="Issue one copy"
                            >
                              Issue
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              disabled={issued === 0}
                              onClick={() => returnBook(book.id)}
                              title="Return one copy"
                              aria-label={`Return ${book.title}`}
                            >
                              <RotateCcw className="size-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteBook(book.id)}
                              title="Delete book"
                              aria-label={`Delete ${book.title}`}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Demo mode: library data is stored in React state and resets
        when the page is refreshed.
      </p>
    </div>
  );
}
