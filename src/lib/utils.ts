import { auth } from "@/auth";
import { cache } from "react";

export const cachedAuth = cache(auth);

// Deduplicates request
// Dont use it on server actions just server pages. We only wanna get cached version when we open our page
