
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 w-full bg-background px-4 py-3 text-foreground">
      <Separator className="mb-3" />

      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <a
          href="https://share.google/lukpJ91MtkQReZZZd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 text-center transition-colors hover:text-primary"
        >
         @ Simcasys Technology Private Limited
          
        </a>
      </div>
    </footer>
  );
}
