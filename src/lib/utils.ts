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

export const isLinkActive = ({
  route,
  pathname,
}: {
  route: string;
  pathname: string;
}) => (route === "/" ? pathname === "/" : pathname.startsWith(route));
