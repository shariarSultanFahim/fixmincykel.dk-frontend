import { GraduationCap, Map, MessagesSquare, Repeat } from "lucide-react";

import { BenefitsCard } from "./card";

export default function WhyWorkshopLovesUs() {
  const whyUs = [
    {
      title: "More local customers",
      description: "Get discovered by cyclists in your area actively looking for repairs",
      icon: Map
    },
    {
      title: "Automatic Lead Generation",
      description: "Receive qualified repair requests matching your services",
      icon: Repeat
    },
    {
      title: "Transparent reviews",
      description: "Receive qualified repair requests matching your services",
      icon: GraduationCap
    },
    {
      title: "Simple Online Communication",
      description: "Receive qualified repair requests matching your services",
      icon: MessagesSquare
    }
  ];

  return (
    <section className="bg-[#F9FFFE] py-20">
      <div className="container flex flex-col items-center space-y-10">
        <h1 className="text-center text-[32px]">
          Why workshops <span className="text-primary">Love Us</span>
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-4">
          {whyUs.map((benefit, index) => (
            <BenefitsCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              className="max-w-sm lg:w-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
