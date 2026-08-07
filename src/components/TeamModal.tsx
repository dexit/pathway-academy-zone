import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
}

interface TeamModalProps {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamModal({ member, open, onOpenChange }: TeamModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{member.name} - {member.role}</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 pt-6">
          {/* Image */}
          <div className="md:w-1/3">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto rounded-lg object-cover aspect-square"
              />
            ) : (
              <div className="w-full rounded-lg bg-primary/10 flex items-center justify-center aspect-square">
                <span className="font-bold text-4xl text-primary" aria-hidden="true">
                  {member.name.replace(/\bMBE\b/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-foreground mb-2">{member.name}</h2>
            <p className="text-primary font-semibold text-sm mb-4">{member.role}</p>

            {member.bio && (
              <p className="text-muted-foreground leading-relaxed mb-4">
                {member.bio}
              </p>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
