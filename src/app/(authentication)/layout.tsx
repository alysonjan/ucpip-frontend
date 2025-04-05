export default function Authentication({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-full">
      <div
        className="flex-1 bg-center bg-cover relative"
        style={{
          backgroundImage: "url('/new-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      >
        <div className="flex-1">
          <h1 className="text-8xl text-red-800 font-bold pt-8 pl-8 pb-4 italic drop-shadow-2xl ">UCPIP</h1>
        </div>
        <span className="text-xl text-white ps-14 font-bold drop-shadow-2xl ">
          University Clinic Patient Information Portal
        </span>
      </div>
      <main className="flex-1 flex flex-col h-full items-center justify-center">{children}</main>
    </section>
  );
}
