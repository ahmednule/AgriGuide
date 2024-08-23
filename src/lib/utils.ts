import { auth } from "@/auth";
import { cache } from "react";
import Showdown from "showdown";

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