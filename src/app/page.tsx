import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient({
    fetchOptions: {
      cache: "no-store",
    },
  });

  const page = await client
    .getSingle("home_page")
    .catch(() => notFound());

  const aboutSlice = page.data.slices.find(
    (slice) => slice.slice_type === "about",
  );

  console.log("DOCUMENT UID:", page.uid);
  console.log("DOCUMENT ID:", page.id);
  console.log("ABOUT VARIATION:", aboutSlice?.variation);
  console.log(
    "ABOUT FIELD NAMES:",
    Object.keys(aboutSlice?.primary ?? {}),
  );
  console.log(
    "ABOUT DATA FROM PRISMIC:",
    JSON.stringify(aboutSlice, null, 2),
  );

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getSingle("home_page")
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}