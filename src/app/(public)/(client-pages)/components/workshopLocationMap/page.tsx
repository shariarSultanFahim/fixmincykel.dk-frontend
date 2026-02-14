export default function WorkshopLocationMap() {
  return (
    <section
      className="relative container flex min-h-[50vh] w-full items-center justify-center py-20 md:min-h-screen"
      style={{
        backgroundImage: `url(/bgEllipse.svg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }}
    >
      <div
        className="flex min-h-[50vh] w-full flex-1 flex-col items-center justify-center md:min-h-screen"
        style={{
          backgroundImage: `url(/DenmarkMap.svg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "80%"
        }}
      >
        <h1 className="text-center text-primary">Get offers from nearby workshops</h1>
      </div>
    </section>
  );
}
