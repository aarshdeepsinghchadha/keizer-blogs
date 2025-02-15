"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DataTableRowAction } from "interface/data-table";
import type { LucideIcon } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { DataTableColumnHeader } from "components/data-table/header";
import { Badge } from "components/ui/badge";
import { Button, buttonVariants } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { blog_status } from "db/enums";
import { cn, formatDate } from "lib/utils";
import { CheckCircle2, Ellipsis, Timer } from "lucide-react";

import type { BlogListWithAuthor } from "./list";

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<BlogListWithAuthor> | null>
  >;
}

export function getStatusIcon(status: blog_status) {
  const statusIcons: Record<blog_status, LucideIcon> = {
    PUBLISHED: CheckCircle2,
    DRAFT: Timer,
  };

  return statusIcons[status];
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<BlogListWithAuthor>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[31.25rem] truncate font-medium">
            {row.getValue("title")}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status: blog_status = row.getValue("status");
        const Icon = getStatusIcon(status);

        return (
          <div className="flex w-[6.25rem] items-center">
            <Badge
              variant="secondary"
              className={cn(
                "text-foreground",
                status === blog_status.DRAFT
                  ? "bg-yellow-500/20"
                  : "bg-green-500/20",
              )}
            >
              <Icon className="mr-1 size-3.5" aria-hidden="true" />
              <span className="text-xs font-medium capitalize">
                {status.toLowerCase()}
              </span>
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },

    {
      accessorKey: "author",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ cell }) => (
        <Link className={buttonVariants({ variant: "link" })} href="#">
          {
            (cell.getValue() as { org_metadata: { display_name: string } })
              .org_metadata.display_name
          }
        </Link>
      ),
    },

    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
}
