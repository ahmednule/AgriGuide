import { auth } from "@/auth";
import { cache } from "react";
import Showdown from "showdown";
import prisma from "./prisma";

export const cachedAuth = cache(auth);

// Deduplicates request
// Dont use it on server actions just server pages. We only wanna get cached version when we open our page

const converter = new Showdown.Converter();

export const convertHtmlToMarkdown = (html: string): string => {
  return converter.makeMarkdown(html);
};

export const convertMarkdownToHtml = (markdown: string): string => {
  return converter.makeHtml(markdown);
};

export const getResourceName = (res: string): string => {
  const match = res.match(/\*\*(.*?)\*\*/);
  return match ? match[1] : "";
};

export const getResourceDescription = (res: string): string => {
  return res.replace(/\*\*.*?\*\*/, "").trim();
};

export const isLinkActive = ({
  route,
  pathname,
}: {
  route: string;
  pathname: string;
}) => (route === "/" ? pathname === "/" : pathname.startsWith(route));

export const convertKebabToNormal = (kebab: string): string => {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// export const getProductDetails = async (userId) => {
//   const productsWithNameAndCount = await prisma.productSupplier.groupBy({
//     by: ["productId"],
//     _count: { _all: true },
//     where: { supplierId: userId },
//     orderBy: { _count: { productId: "desc" } },
//   });

//   const productIds = productsWithNameAndCount.map((p) => p.productId);
//   const productNames = await prisma.product.findMany({
//     where: { id: { in: productIds } },
//     select: { id: true, name: true },
//   });

//   const productNameMap = new Map(productNames.map((p) => [p.id, p.name]));

//   return productsWithNameAndCount.map((p) => ({
//     productId: p.productId,
//     name: productNameMap.get(p.productId) || "Unknown Product",
//     count: p._count._all,
//   }));
// };

export const arraysAreEqualUnordered = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const getCurrencySymbol = async (
  countryName: string
): Promise<string> => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
    );

    if (!res.ok) throw new Error("Error fetching currency symbol");

    const data = await res.json();
    if (!data || data.length === 0) throw new Error("Cannot find country");

    const currencyCode = Object.keys(data[0].currencies)[0];
    return data[0].currencies[currencyCode].symbol;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return "Unknown Currency";
  }
};