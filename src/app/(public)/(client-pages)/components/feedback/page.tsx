import Title from "../section-title";
import { FeedbackCarousel } from "./carousel";

export default function Feedback() {
  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      title: "Cyclist",
      feedback: "Great service! My bike was fixed in no time. Highly recommend FixMinCykel.dk!",
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=JohnDoe"
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Commuter",
      feedback:
        "I love how easy it is to book a repair. Highly recommend! My bike is running smoothly again.",
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=JaneSmith"
    },
    {
      id: 3,
      name: "Mike Johnson",
      title: "Mountain Biker",
      feedback:
        "The mechanics are very skilled. My bike rides like new again.  Thank you, FixMinCykel.dk!",
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=MikeJohnson"
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "Road Cyclist",
      feedback:
        "Fast and reliable service. I won't go anywhere else for bike repairs.  FixMinCykel.dk is the best!",
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=EmilyDavis"
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Casual Rider",
      feedback:
        "Affordable prices and great customer service. I'm very satisfied. FixMinCykel.dk is my go-to for bike repairs!",
      avatar: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=DavidWilson"
    }
  ];

  return (
    <section className="container bg-[#ECFFFB] py-20">
      <div className="flex flex-col items-center space-y-5">
        <Title title="Builders love FixMinCykel.dk" subtitle="" />
        <FeedbackCarousel feedbacks={feedbacks} />
      </div>
    </section>
  );
}
