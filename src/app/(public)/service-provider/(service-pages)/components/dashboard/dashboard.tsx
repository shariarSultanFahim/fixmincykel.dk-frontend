"use client";

import { Briefcase, Calendar, Check, Coffee, MessageCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <section className="py-20">
      <div className="container flex flex-col items-center space-y-12">
        <h1 className="text-center">
          Your All-in-One <span className="text-primary">Dashboard</span>
        </h1>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Job Inbox Card */}
          <article className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-6 text-center shadow-lg">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <Briefcase className="size-8 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy">Job Inbox</h3>
              <p className="text-sm text-muted-foreground">New requests with photos</p>
            </div>
            <div className="w-full space-y-2 rounded-md bg-muted p-4">
              <div className="flex items-center justify-between rounded bg-white px-3 py-2">
                <span className="text-sm font-medium text-navy">Request #1</span>
                <span className="text-xs font-bold text-primary">NEW</span>
              </div>
              <div className="flex items-center justify-between rounded bg-white px-3 py-2">
                <span className="text-sm font-medium text-navy">Request #2</span>
                <span className="text-xs font-bold text-primary">NEW</span>
              </div>
              <div className="flex items-center justify-between rounded bg-white px-3 py-2">
                <span className="text-sm font-medium text-navy">Request #3</span>
                <span className="text-xs font-bold text-primary">NEW</span>
              </div>
            </div>
          </article>

          {/* Offer Builder Card */}
          <article className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-6 text-center shadow-lg">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <Coffee className="size-8 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy">Offer Builder</h3>
              <p className="text-sm text-muted-foreground">Quick price templates</p>
            </div>
            <div className="w-full space-y-3 rounded-md bg-muted p-4">
              <div className="rounded bg-white p-3">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-bold text-navy">200-250 DKK</p>
              </div>
              <div className="rounded bg-white p-3">
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-bold text-navy">30 min</p>
              </div>
            </div>
          </article>

          {/* Calendar Card */}
          <article className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-6 text-center shadow-lg">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <Calendar className="size-8 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy">Calendar</h3>
              <p className="text-sm text-muted-foreground">Daily view with slots</p>
            </div>
            <div className="w-full rounded-md bg-muted p-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="flex size-8 items-center justify-center rounded bg-primary">
                  <Check className="size-4 text-white" />
                </div>
                <div className="flex size-8 items-center justify-center rounded bg-primary">
                  <Check className="size-4 text-white" />
                </div>
                <div className="flex size-8 items-center justify-center rounded bg-primary">
                  <Check className="size-4 text-white" />
                </div>
                <div className="flex size-8 items-center justify-center rounded bg-primary">
                  <Check className="size-4 text-white" />
                </div>
                <div className="flex size-8 items-center justify-center rounded border-2 border-muted bg-white" />
                <div className="flex size-8 items-center justify-center rounded border-2 border-muted bg-white" />
                <div className="flex size-8 items-center justify-center rounded border-2 border-muted bg-white" />
                <div className="flex size-8 items-center justify-center rounded border-2 border-muted bg-white" />
              </div>
            </div>
          </article>

          {/* Chat Card */}
          <article className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-6 text-center shadow-lg">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <MessageCircle className="size-8 text-navy" />
            </div>
            <div>
              <h3 className="font-bold text-navy">Chat</h3>
              <p className="text-sm text-muted-foreground">Instant messaging</p>
            </div>
            <div className="w-full rounded-md bg-muted p-4">
              <div className="mb-3 flex justify-start">
                <div className="rounded-lg bg-white px-3 py-2">
                  <p className="text-sm text-navy">Customer message</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Your reply"
                className="placeholder-opacity-70 w-full rounded-full bg-primary px-4 py-2 text-sm text-white placeholder-white outline-none"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
