import GetStarted from "./components/get-started";
import RegisterService from "./components/register";
import Requirements from "./components/requirements";

export default function ServiceExplore() {
  return (
    <section className="container">
      <GetStarted />
      <Requirements />
      <RegisterService />
    </section>
  );
}
