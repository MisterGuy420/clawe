export type SubtaskStatus = "pending" | "in_progress" | "done" | "blocked";

export type KanbanSubtask = {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
  status?: SubtaskStatus;
  blockedReason?: string;
  assignee?: string;
  doneAt?: number;
};

// Kanban's own task type (isolated from Convex)
export type KanbanTask = {
  id: string;
  title: string;
  description?: string;
  status?: "inbox" | "assigned" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee?: string;
  subtasks: KanbanSubtask[];
  documentCount?: number;
};

// Predefined column variants with built-in styling
export type ColumnVariant =
  | "inbox"
  | "assigned"
  | "in-progress"
  | "review"
  | "done";

export type KanbanColumnDef = {
  id: string;
  title: string;
  variant: ColumnVariant;
  tasks: KanbanTask[];
};

export type KanbanBoardProps = {
  columns: KanbanColumnDef[];
  className?: string;
};

// Variant styles (used internally by KanbanColumn)
export const columnVariants: Record<
  ColumnVariant,
  { badge: string; column: string; icon: string; iconBg: string }
> = {
  inbox: {
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    column: "bg-rose-50/50 dark:bg-rose-950/20",
    icon: "text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/40",
  },
  assigned: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    column: "bg-orange-50/50 dark:bg-orange-950/20",
    icon: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
  },
  "in-progress": {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    column: "bg-blue-50/50 dark:bg-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  review: {
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    column: "bg-violet-50/50 dark:bg-violet-950/20",
    icon: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
  },
  done: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    column: "bg-emerald-50/50 dark:bg-emerald-950/20",
    icon: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
  },
};
