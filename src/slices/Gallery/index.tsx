
"use client";

import { useEffect, useState } from "react";
import {
	asText,
	isFilled,
	type Content,
} from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

const Gallery = ({ slice }: GalleryProps) => {
	const { primary } = slice;

	const heading = asText(primary.heading) || "Photo Gallery";
	const paragraph = asText(primary.paragraph) || "";

	const images = primary.glallery.filter((item) =>
		isFilled.image(item.gallety_image)
	);

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const closePreview = () => setSelectedIndex(null);

	const showNext = () => {
		if (selectedIndex === null || images.length === 0) return;

		setSelectedIndex((selectedIndex + 1) % images.length);
	};

	const showPrevious = () => {
		if (selectedIndex === null || images.length === 0) return;

		setSelectedIndex(
			(selectedIndex - 1 + images.length) % images.length
		);
	};

	useEffect(() => {
		if (selectedIndex === null) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closePreview();
			if (event.key === "ArrowRight") showNext();
			if (event.key === "ArrowLeft") showPrevious();
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [selectedIndex]);

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-white pt-28 pb-16 text-[#171717] sm:pt-32 md:pt-36 md:pb-24"
		>
			<div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">

				{/* Gallery Header */}
				<div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-10">

					<h2 className="text-4xl font-medium leading-none tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[76px]">
						{heading}
					</h2>

					{paragraph && (
						<p className="max-w-[260px] text-xs leading-relaxed text-[#666] sm:text-right sm:text-[13px]">
							{paragraph}
						</p>
					)}

				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">

					{images.map((item, index) => {
						const image = item.gallety_image;

						const gridPosition =
							index === 0
								? "col-span-2 row-span-1 md:col-span-2"
								: "col-span-1";

						const aspectRatio =
							index === 0
								? "aspect-[1.65/1] md:aspect-[1.65/1]"
								: "aspect-[1/1]";

						return (
							<button
								key={image.url}
								type="button"
								onClick={() => setSelectedIndex(index)}
								aria-label={`Preview gallery image ${index + 1}`}
								className={`group relative block w-full overflow-hidden rounded-xl bg-[#f1f1f1] text-left outline-none ${gridPosition} ${aspectRatio}`}
							>
								<PrismicNextImage
									field={image}
									fill
									sizes="(max-width: 768px) 50vw, 65vw"
									className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
									alt=""
								/>

								<span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/15 group-hover:opacity-100">
									<span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											className="h-5 w-5"
											stroke="currentColor"
											strokeWidth="1.6"
										>
											<path d="M15 3h6v6M10 14 21 3M21 14v7H3V3h7" />
										</svg>
									</span>
								</span>
							</button>
						);
					})}

				</div>
			</div>

			{/* Image Preview / Lightbox */}
			{selectedIndex !== null && images[selectedIndex] && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
					role="dialog"
					aria-modal="true"
					aria-label="Image preview"
					onClick={closePreview}
				>

					{/* Close */}
					<button
						type="button"
						onClick={closePreview}
						aria-label="Close image preview"
						className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							className="h-6 w-6"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<path d="m18 6-12 12M6 6l12 12" />
						</svg>
					</button>

					{/* Previous */}
					{images.length > 1 && (
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showPrevious();
							}}
							aria-label="Previous image"
							className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								className="h-6 w-6"
								stroke="currentColor"
								strokeWidth="1.5"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>
					)}

					{/* Selected Image */}
					<div
						className="relative h-[75vh] w-full max-w-6xl"
						onClick={(event) => event.stopPropagation()}
					>
						<PrismicNextImage
							field={images[selectedIndex].gallety_image}
							fill
							sizes="100vw"
							className="object-contain"
							priority
							alt=""
						/>
					</div>

					{/* Next */}
					{images.length > 1 && (
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showNext();
							}}
							aria-label="Next image"
							className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								className="h-6 w-6"
								stroke="currentColor"
								strokeWidth="1.5"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					)}

					{/* Image Counter */}
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/70">
						{String(selectedIndex + 1).padStart(2, "0")}
						{" / "}
						{String(images.length).padStart(2, "0")}
					</div>

				</div>
			)}
		</section>
	);
};

export default Gallery;
