import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const dynamic = "force-dynamic";

export default async function Page() {
  const client = createClient();

  try {
    const page = await client.getSingle("demo");

    console.log("DEMO DOCUMENT FOUND:", page.id);
    console.log("DEMO SLICES:", page.data.slices);

    return (
      <SliceZone
        slices={page.data.slices}
        components={components}
      />
    );
  } catch (error) {
    console.error("DEMO PRISMIC ERROR:", error);
    throw error;
  }
}