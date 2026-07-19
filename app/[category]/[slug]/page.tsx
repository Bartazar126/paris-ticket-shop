import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/paristicketshop/ProductDetailView";
import { Providers } from "@/components/paristicketshop/Providers";
import { SiteFooter } from "@/components/paristicketshop/SiteFooter";
import { SiteHeader } from "@/components/paristicketshop/SiteHeader";
import {
  getProductPageData,
  getProductStaticParams,
  getSimilarProducts,
} from "@/data/productCatalog";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const data = getProductPageData(category, slug);
  if (!data) {
    return { title: "Paris Ticket Shop" };
  }
  const description =
    data.detail.overview[0] ||
    `Book ${data.detail.title} with Paris Ticket Shop.`;
  return {
    title: `Paris Ticket Shop | ${data.detail.title}`,
    description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params;
  const data = getProductPageData(category, slug);
  if (!data) notFound();

  const similar = getSimilarProducts(category, slug);

  return (
    <Providers>
      <div className="flex min-h-full w-full flex-col bg-white text-zinc-800 leading-6">
        <SiteHeader />
        <main className="w-full py-6">
          <ProductDetailView
            card={data.card}
            detail={data.detail}
            similar={similar}
          />
        </main>
        <SiteFooter />
      </div>
    </Providers>
  );
}
