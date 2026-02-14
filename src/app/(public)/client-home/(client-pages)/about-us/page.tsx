import AlsoReadCarousel from "../../components/also-read-carousel";
import Newsletter from "../../components/newslatter";
import Article from "./component/article";

export default function AboutUsPage() {
  return (
    <section className="py-10">
      <Article />
      <AlsoReadCarousel />
      <Newsletter />
    </section>
  );
}
