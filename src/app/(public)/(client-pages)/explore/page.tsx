import AlsoReadCarousel from "../components/also-read-carousel";
import FeaturedArticle from "./components/featured-article";
import PostsSection from "./components/posts-section";

export default function Explore() {
  return (
    <section className="container space-y-20 bg-white py-20">
      <FeaturedArticle />
      <PostsSection />
      <AlsoReadCarousel />
    </section>
  );
}
