import { useEffect, useState } from "react";
import { Stack, Card, Flex, Text, Select, Box } from "@sanity/ui";
import { set, unset, useFormValue } from "sanity";
import type { ObjectInputProps } from "sanity";

export function ChapterIconInput(props: ObjectInputProps) {
  const { value, onChange, schemaType } = props;
  const [h2Headings, setH2Headings] = useState<string[]>([]);
  
  // Use useFormValue to access the document's body field
  const body = useFormValue(["body"]) as any[];

  // Extract H2 headings from the document's body field
  useEffect(() => {
    if (body && Array.isArray(body)) {
      const headings = body
        .filter(
          (block: any) =>
            block._type === "block" && block.style === "h2" && block.children
        )
        .map((block: any) => {
          return block.children
            .map((child: any) => child.text || "")
            .join("")
            .trim();
        })
        .filter((text: string) => text.length > 0);

      setH2Headings(headings);
    }
  }, [body]);

  const iconOptions = [
    { value: "lightbulb", label: "💡 Lightbulb (Tips/Guides)" },
    { value: "car", label: "🚗 Car (Transport/Getting There)" },
    { value: "utensils", label: "🍴 Utensils (Food/Restaurants)" },
    { value: "bed", label: "🏠 Bed (Accommodation/Stay)" },
    { value: "binoculars", label: "🔭 Binoculars (Activities/See)" },
    { value: "cloud", label: "☁️ Cloud (Weather/Time)" },
    { value: "default", label: "📄 Document (Default)" },
  ];

  const currentHeading = (value as any)?.headingText || "";
  const currentIcon = (value as any)?.icon || "";

  return (
    <Card padding={3} border radius={2}>
      <Stack space={3}>
        <Box>
          <Text size={1} weight="semibold" style={{ marginBottom: "8px" }}>
            Heading
          </Text>
          {h2Headings.length > 0 ? (
            <Select
              value={currentHeading}
              onChange={(event) => {
                const newHeading = event.currentTarget.value;
                if (newHeading) {
                  onChange(set({ headingText: newHeading, icon: currentIcon || "" }));
                } else {
                  onChange(unset());
                }
              }}
            >
              <option value="">Select a heading...</option>
              {h2Headings.map((heading) => (
                <option key={heading} value={heading}>
                  {heading}
                </option>
              ))}
            </Select>
          ) : (
            <Text size={1} muted>
              No H2 headings found in the blog post yet. Add some H2 headings to
              your content first.
            </Text>
          )}
        </Box>

        {currentHeading && (
          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: "8px" }}>
              Icon
            </Text>
            <Select
              value={currentIcon}
              onChange={(event) => {
                const newIcon = event.currentTarget.value;
                onChange(set({ headingText: currentHeading, icon: newIcon }));
              }}
            >
              <option value="">Select an icon...</option>
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>
        )}

        {currentHeading && currentIcon && (
          <Card padding={2} tone="primary" radius={2}>
            <Flex gap={2} align="center">
              <Text size={2}>
                {iconOptions.find((opt) => opt.value === currentIcon)?.label.split(" ")[0] || "📄"}
              </Text>
              <Text size={1} weight="medium">
                {currentHeading}
              </Text>
            </Flex>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

