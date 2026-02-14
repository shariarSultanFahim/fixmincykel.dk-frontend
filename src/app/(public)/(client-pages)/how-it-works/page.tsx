import Newsletter from "../components/newslatter";
import HowItWorksHero from "./components/hero";
import SimpleProcess from "./components/simple-process";
import Steps from "./components/steps";
import Vision from "./components/vision";

export default function HowItWorksPage() {
  return (
    <section>
      <HowItWorksHero />
      <Vision />
      <Steps />
      <SimpleProcess />
      <Newsletter />
    </section>
  );
}
