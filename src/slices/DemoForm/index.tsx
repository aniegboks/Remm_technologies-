
"use client";

import { FC, FormEvent, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type DemoFormProps = SliceComponentProps<Content.DemoFormSlice>;

const products = [
    "Cisco",
    "Microsoft",
    "Freshworks",
    "Picus",
    "Hewlett Packard Enterprise",
    "MoEngage",
    "Huawei",
    "Rapid7",
    "Acronis",
    "Broadcom (VMware)",
    "Cyrebro",
    "Adrenalin",
    "Bank-Genie",
    "Sophos",
    "Odoo",
    "CyberArk",
    "Nuance SafeCom",
    "HCL Software",
    "Synology",
    "WallPost",
    "Thales",
    "Trellix",
];

const DemoForm: FC<DemoFormProps> = ({ slice }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Connect your form API or email service here.
        setSubmitted(true);
    };

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="bg-white px-5 pt-32 pb-20 sm:px-8 sm:pt-36 md:pt-40 md:pb-28"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

                {/* Introduction */}
                <div className="lg:sticky lg:top-32">
                    <h2 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#171D26] sm:text-5xl lg:text-6xl">
                        {slice.primary.heading || "You Need a Demo."}
                    </h2>

                    <div className="mt-6 max-w-lg text-base leading-8 text-gray-500 sm:text-lg">
                        {slice.primary.paragraph ? (
                            <PrismicRichText field={slice.primary.paragraph} />
                        ) : (
                            <p>
                                Discover how our technology solutions can help
                                your organisation work smarter, strengthen
                                security, and improve business operations.
                                Tell us what you are looking for, and our team
                                will arrange a personalised demonstration of
                                the product that best fits your needs.
                            </p>
                        )}
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-7">
                        <p className="text-sm font-medium text-gray-900">
                            Not sure which product is right for you?
                        </p>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Tell us about your organisation and requirements.
                            Our team can help you identify the right solution.
                        </p>
                    </div>
                </div>

                {/* Demo Form */}
                <div className="rounded-2xl bg-[#F5F6F8] p-6 sm:p-9 lg:p-10">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold tracking-tight text-[#171D26]">
                            Book a Product Demo
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Complete the form below and our team will get in
                            touch with you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Full Name *
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Work Email *
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Phone Number *
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+234 800 000 0000"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="company"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Company / Organisation *
                                </label>

                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder="Your organisation"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="product"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Which Product Are You Interested In? *
                            </label>

                            <select
                                id="product"
                                name="product"
                                required
                                defaultValue=""
                                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                            >
                                <option value="" disabled>
                                    Select a product
                                </option>

                                {products.map((product) => (
                                    <option key={product} value={product}>
                                        {product}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Tell Us About Your Requirements
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Briefly describe what you would like to achieve..."
                                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#171D26] px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#034966]"
                        >
                            Request a Demo
                        </button>

                        {submitted && (
                            <p className="text-sm text-amber-700" role="status">
                                The form UI is ready. Connect a submission
                                endpoint to start receiving demo requests.
                            </p>
                        )}

                        <p className="text-center text-xs leading-5 text-gray-400">
                            By submitting this form, you agree to be contacted
                            by Remm Technologies regarding your enquiry.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default DemoForm;
