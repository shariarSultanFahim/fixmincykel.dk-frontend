"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminActionsProps {
  jobId: string;
}

export default function AdminActions({ jobId }: AdminActionsProps) {
  const handleDelete = () => {
    // TODO: Implement delete job
    console.log("Delete job:", jobId);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Admin Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="destructive" size="sm" className="gap-2" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
