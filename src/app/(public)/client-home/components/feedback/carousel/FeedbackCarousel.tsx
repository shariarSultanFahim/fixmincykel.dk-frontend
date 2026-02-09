"use client";

import { useCallback, useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import CommentIcon from "@/assets/icons/comment.svg";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

type FeedbackCarouselProps = {
  feedbacks: Array<{ id: number; name: string; title: string; feedback: string; avatar: string }>;
};

export function FeedbackCarousel({ feedbacks }: { feedbacks: FeedbackCarouselProps["feedbacks"] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([feedbacks.length]);

  const handleSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  const handleReInit = useCallback(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    handleSelect();
  }, [api, handleSelect]);

  useEffect(() => {
    if (!api) return;
    handleReInit();
    api.on("select", handleSelect);
    api.on("reInit", handleReInit);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleReInit);
    };
  }, [api, handleReInit, handleSelect]);

  return (
    <Carousel
      className="w-[calc(100%-4rem)]"
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 3000
        })
      ]}
    >
      <CarouselContent className="-ml-1">
        {feedbacks.map((feedback, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className={`rounded-3xl ${selectedIndex === index ? "bg-secondary" : ""}`}>
                <CardContent className="flex aspect-square flex-col items-start justify-between p-6">
                  <div>
                    <CommentIcon className="size-20 text-primary" aria-hidden="true" />
                  </div>
                  <p className="p-2">{feedback.feedback}</p>
                  <div className="flex items-center justify-start gap-2">
                    <Avatar className="h-15 w-15 md:h-20 md:w-20">
                      <AvatarImage
                        className="h-15 w-15 md:h-20 md:w-20"
                        src={feedback.avatar}
                        alt={feedback.name}
                      />
                      <AvatarFallback>
                        {feedback.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{feedback.name}</h3>
                      <p>{feedback.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label={"Feedback Carousel Navigation"}
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1}`}
            aria-current={selectedIndex === index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "size-3 rounded-full transition",
              selectedIndex === index ? "bg-primary" : "bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}
