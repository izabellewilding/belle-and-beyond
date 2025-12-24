"use client";

import { useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ChapterIcon {
  headingText: string;
  icon: string;
}

interface TableOfContentsProps {
  body: any[];
  chapterIcons?: ChapterIcon[];
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

// Default icon if none is specified
const DEFAULT_ICON = "default";

export const TableOfContents = ({ body, chapterIcons = [] }: TableOfContentsProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  
  // Debug logging
  console.log('Chapter Icons:', chapterIcons);
  
  // Helper to get custom icon for a heading
  const getCustomIcon = (headingText: string): string | null => {
    if (!chapterIcons || chapterIcons.length === 0) {
      return null;
    }
    const match = chapterIcons.find(
      (item) => item.headingText.toLowerCase().trim() === headingText.toLowerCase().trim()
    );
    console.log(`Icon for "${headingText}":`, match ? match.icon : 'none (will use default)');
    return match ? match.icon : null;
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {headings.map(({ heading, subheadings }) => {
          // Use custom icon if specified, otherwise use default
          const customIcon = getCustomIcon(heading.text);
          const iconName = customIcon || DEFAULT_ICON;
          const isExpanded = expandedItems[heading.id];
          const hasSubheadings = subheadings.length > 0;

          return (
            <div
              key={heading.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden self-start"
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
                  <div className="flex-shrink-0">
                    <img 
                      src={`/images/icons/${iconName}.svg`} 
                      alt="" 
                      className="w-10 h-10"
                    />
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

