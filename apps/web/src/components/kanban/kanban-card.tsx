"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  AlignLeft,
  User,
  FileText,
  Circle,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@clawe/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@clawe/ui/components/popover";
import type { KanbanTask } from "./types";
import { Button } from "@clawe/ui/components/button";

export type KanbanCardProps = {
  task: KanbanTask;
  onTaskClick: (task: KanbanTask) => void;
  isSubtask?: boolean;
  parentTitle?: string;
};

const priorityStyles = {
  high: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
  medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  low: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
};

export const KanbanCard = ({
  task,
  onTaskClick,
  isSubtask = false,
  parentTitle,
}: KanbanCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const hasSubtasks = task.subtasks.length > 0;
  const showMetadata = task.priority === "high" || task.assignee;

  const handleCardClick = () => {
    onTaskClick(task);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className="w-full">
      <div
        onClick={handleCardClick}
        className="bg-card cursor-pointer overflow-hidden rounded-xl border border-border/60 p-3.5 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 dark:hover:border-primary/40"
      >
        {/* Parent title for subtasks */}
        {isSubtask && parentTitle && (
          <p className="mb-1.5 truncate text-xs font-medium text-muted-foreground/70">
            {parentTitle}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm leading-snug font-medium text-foreground">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <div className="mt-2">
            <p className="line-clamp-2 text-xs text-muted-foreground/80">
              {task.description}
            </p>
          </div>
        )}

        {/* Metadata row: popover button on left, priority & assignee on right */}
        {(task.description || showMetadata) && (
          <div className="mt-2 flex items-center justify-between">
            {task.description ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-muted h-fit w-0 p-1.5 hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AlignLeft className="h-4 w-4 text-muted-foreground/60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="center"
                  className="w-80 bg-popover"
                >
                  <p className="text-sm text-foreground/90">
                    {task.description}
                  </p>
                </PopoverContent>
              </Popover>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {task.priority === "high" && (
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    priorityStyles[task.priority],
                  )}
                >
                  {task.priority}
                </span>
              )}

              {task.assignee && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                  <User className="h-3 w-3" />
                  <span className="truncate max-w-[80px]">{task.assignee}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Subtask toggle and document badge */}
        {(hasSubtasks || (task.documentCount && task.documentCount > 0)) &&
          !isSubtask && (
            <div className="mt-3 flex items-center gap-3">
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  onClick={handleToggleClick}
                  className="h-auto gap-1 p-1.5! text-xs text-muted-foreground/70 hover:text-foreground"
                >
                  {expanded ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                  {task.subtasks.filter((st) => st.done).length}/
                  {task.subtasks.length} subtask
                  {task.subtasks.length !== 1 && "s"}
                </Button>
              )}

              {task.documentCount && task.documentCount > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                  <FileText className="h-3.5 w-3.5" />
                  {task.documentCount} doc
                  {task.documentCount !== 1 && "s"}
                </span>
              )}
            </div>
          )}
      </div>

      {/* Expanded subtasks */}
      {expanded && hasSubtasks && (
        <ul className="mt-2 ml-2 space-y-1 border-l-2 border-border/50 pl-3">
          {task.subtasks.map((subtask) => {
            const status =
              subtask.status ?? (subtask.done ? "done" : "pending");
            return (
              <li
                key={subtask.id}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors duration-150",
                  status === "done" && "text-muted-foreground",
                  status === "blocked" && "text-rose-600 dark:text-rose-400 bg-rose-500/5",
                )}
              >
                {status === "done" && (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                )}
                {status === "in_progress" && (
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-blue-500" />
                )}
                {status === "blocked" && (
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                )}
                {status === "pending" && (
                  <Circle className="text-muted-foreground/40 h-3.5 w-3.5 shrink-0" />
                )}
                <span className={status === "done" ? "line-through" : ""}>
                  {subtask.title}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
