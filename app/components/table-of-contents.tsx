"use client";

import { useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  body: any[];
}

// Helper function to convert text to a URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Extract text from Portable Text children
function extractText(children: any[]): string {
  if (!children) return "";
  return children
    .map((child: any) => {
      if (child._type === "span" || child.text) {
        return child.text || "";
      }
      return "";
    })
    .join("");
}

// Simple icon components
const IconComponents = {
  lightbulb: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  car: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  utensils: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l4-4m-4 4l-4-4M3 12h4m10 0h4M7 16v-4a2 2 0 012-2h6a2 2 0 012 2v4" />
    </svg>
  ),
  bed: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  binoculars: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25zM9 12h6" />
    </svg>
  ),
  cloud: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  default: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

// Function to select icon based on heading text
function getIconForHeading(text: string): keyof typeof IconComponents {
  const lowerText = text.toLowerCase();
  if (lowerText.includes("tip") || lowerText.includes("guide")) return "lightbulb";
  if (lowerText.includes("visit") || lowerText.includes("get") || lowerText.includes("transport")) return "car";
  if (lowerText.includes("restaurant") || lowerText.includes("food") || lowerText.includes("eat")) return "utensils";
  if (lowerText.includes("stay") || lowerText.includes("hotel") || lowerText.includes("accommodation")) return "bed";
  if (lowerText.includes("cost") || lowerText.includes("budget") || lowerText.includes("price") || lowerText.includes("money")) return "binoculars";
  if (lowerText.includes("time") || lowerText.includes("weather") || lowerText.includes("season")) return "cloud";
  return "default";
}

export const TableOfContents = ({ body }: TableOfContentsProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  // Extract H2 headings and their H3 children
  const headings: { heading: Heading; subheadings: Heading[] }[] = [];
  let currentH2: { heading: Heading; subheadings: Heading[] } | null = null;

  body.forEach((block: any) => {
    if (
      block._type === "block" &&
      (block.style === "h2" || block.style === "h3")
    ) {
      const text = extractText(block.children);
      if (text) {
        const id = slugify(text);
        const level = parseInt(block.style.replace("h", ""));

        if (level === 2) {
          if (currentH2) {
            headings.push(currentH2);
          }
          currentH2 = {
            heading: { id, text, level },
            subheadings: [],
          };
        } else if (level === 3 && currentH2) {
          currentH2.subheadings.push({ id, text, level });
        }
      }
    }
  });

  if (currentH2) {
    headings.push(currentH2);
  }

  if (headings.length === 0) {
    return null;
  }

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="not-prose my-8 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-6">
        Chapters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {headings.map(({ heading, subheadings }) => {
          const Icon = IconComponents[getIconForHeading(heading.text)];
          const isExpanded = expandedItems[heading.id];
          const hasSubheadings = subheadings.length > 0;

          return (
            <div
              key={heading.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => {
                  if (hasSubheadings) {
                    toggleItem(heading.id);
                  } else {
                    scrollToHeading(heading.id);
                  }
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 text-neutral-700">
                    <Icon />
                  </div>
                  <span className="text-lg md:text-xl font-bold text-neutral-900 line-clamp-2">
                    {heading.text}
                  </span>
                </div>
                {hasSubheadings && (
                  <svg
                    className={`w-5 h-5 text-neutral-600 flex-shrink-0 ml-2 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
              {hasSubheadings && isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <ul className="space-y-3 list-disc pl-5 text-left">
                    {subheadings.map((sub) => (
                      <li key={sub.id} className="text-left">
                        <button
                          onClick={() => scrollToHeading(sub.id)}
                          className="text-base font-medium text-neutral-800 hover:text-neutral-900 hover:underline transition-colors text-left"
                        >
                          {sub.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

