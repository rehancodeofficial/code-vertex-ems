import { useAuth } from "@/lib/auth-store";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initials } from "@/lib/format";
import { notifications } from "@/lib/mock-data";
import type { Role } from "@/lib/mock-data";

export function Topbar() {
  const user = useAuth((s) => s.user);
  const switchRole = useAuth((s) => s.switchRole);
  if (!user) return null;
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 backdrop-blur-xl px-4 md:px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search employees, projects, tasks…"
          className="pl-9 h-9 bg-muted/40 border-border focus-visible:ring-primary/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex items-center justify-center size-9 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full text-[10px] font-semibold gradient-primary text-primary-foreground flex items-center justify-center">
                {unread}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex-col items-start gap-1 py-2">
                <div className="flex w-full items-center gap-2">
                  <span className="font-medium text-sm">{n.title}</span>
                  {n.unread && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">{n.body}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg border border-border bg-card hover:bg-accent px-2 py-1.5 transition-colors">
            <Avatar className="size-7">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-medium">{user.name}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{user.role}</div>
            </div>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Demo role</span>
              <Badge variant="outline" className="capitalize">{user.role}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["admin", "employee", "manager", "hr"] as Role[]).map((r) => (
              <DropdownMenuItem key={r} onClick={() => switchRole(r)} className="capitalize">
                Switch to {r}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
