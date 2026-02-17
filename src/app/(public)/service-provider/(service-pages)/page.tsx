import ServiceHero from "./components/hero/hero";
import HowItWorks from "./components/how-it-works/page";
import WhyWorkshopLovesUs from "./components/whyWorkshopLovesUs/why-us";

export default function ServiceHome() {
  return (
    <section className="">
      <ServiceHero />
      <WhyWorkshopLovesUs />
      <HowItWorks />
    </section>
  );
}
