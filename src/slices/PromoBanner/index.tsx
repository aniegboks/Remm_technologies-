import type { FC } from "react";
import { asLink } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import type { Content } from "@prismicio/client";

/**
 * Props for `PromoBanner`.
 */
export type PromoBannerProps = SliceComponentProps<Content.PromoBannerSlice>;

/**
 * Component for "PromoBanner" Slices.
 */
const PromoBanner: FC<PromoBannerProps> = ({ slice }) => {
	const buttonUrl = asLink(slice.primary.button_link);

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="mx-auto my-12 max-w-7xl px-6"
		>
			<div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#171D26] px-8 py-10 text-white md:flex-row md:items-center md:px-12 md:py-14">
				<div className="max-w-2xl space-y-4">
					{slice.primary.title && (
						<PrismicRichText
							field={slice.primary.title}
							components={{
								heading2: ({ children }) => (
									<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
										{children}
									</h2>
								),
							}}
						/>
					)}

					{slice.primary.description && (
						<PrismicRichText
							field={slice.primary.description}
							components={{
								paragraph: ({ children }) => (
									<p className="max-w-xl text-base leading-7 text-white/75 md:text-lg">
										{children}
									</p>
								),
							}}
						/>
					)}
				</div>

				{buttonUrl && slice.primary.button_text && (
					<a
						href={buttonUrl}
						className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-[#171D26] transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					>
						{slice.primary.button_text}
					</a>
				)}
			</div>
		</section>
	);
};

export default PromoBanner;