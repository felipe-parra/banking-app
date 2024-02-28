import LoaderComponent from "@/components/LoaderComponent";


export default function PageLoader() {
  return (
    <section className="w-full h-svh flex flex-col items-center justify-center">
      <h5 className="text-3xl font-bold animate-pulse my-4">Bank App</h5>
      <LoaderComponent />
    </section>
  )
}
