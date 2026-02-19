import React from "react";
import { motion } from "framer-motion";

interface ContentSection {
  type:
    | "rich_text"
    | "video_text"
    | "image_text"
    | "gallery"
    | "gif"
    | "media_list";
  order: number;
  heading?: string;
  body?: string;
  text?: string;
  video_url?: string;
  image_url?: string;
  layout?: "side_by_side" | "stacked";
  media?: string[];
  caption?: string;
  url?: string;
  items?: {
    url: string;
    media_type: string;
    caption?: string;
  }[];
}

interface ProductContentSectionsProps {
  sections: ContentSection[] | undefined;
}

// Helper function to convert YouTube URLs to embed format
const convertToEmbedUrl = (url: string): string => {
  if (!url) return url;

  // Already an embed URL
  if (url.includes("/embed/")) return url;

  // Handle various YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  // Return original URL if not a YouTube URL
  return url;
};

export const ProductContentSections: React.FC<ProductContentSectionsProps> = ({
  sections,
}) => {
  if (!sections || sections.length === 0) return null;

  const sortedSections = [...sections].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  return (
    <div className="space-y-16">
      {sortedSections.map((section, idx) => {
        switch (section.type) {
          case "rich_text":
            return (
              <div
                key={idx}
                className="max-w-4xl mx-auto text-center space-y-8"
              >
                {section.heading && (
                  <h2 className="text-4xl lg:text-7xl font-display font-black uppercase tracking-tighter text-silk-white leading-none">
                    {section.heading}
                  </h2>
                )}
                <div
                  className="prose prose-silk mx-auto text-xl font-light text-text-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.body || "" }}
                />
              </div>
            );

          case "video_text":
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${
                  section.layout === "stacked" ? "lg:grid-cols-1" : ""
                }`}
              >
                <div
                  className={`aspect-video rounded-2xl overflow-hidden border border-border-dim bg-obsidian-surface ${
                    section.layout === "side_by_side" && idx % 2 === 1
                      ? "lg:order-2"
                      : ""
                  }`}
                >
                  <iframe
                    src={convertToEmbedUrl(section.video_url || "")}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={section.heading || "Product Video"}
                  />
                </div>
                <div
                  className={
                    section.layout === "side_by_side" && idx % 2 === 1
                      ? "lg:order-1"
                      : ""
                  }
                >
                  {section.heading && (
                    <h3 className="text-2xl font-display font-bold mb-4 text-silk-white">
                      {section.heading}
                    </h3>
                  )}
                  <div
                    className="prose prose-silk prose-lg max-w-none text-text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.text || "" }}
                  />
                </div>
              </div>
            );

          case "image_text":
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center ${
                  section.layout === "stacked" ? "lg:grid-cols-1" : ""
                }`}
              >
                <div
                  className={`rounded-[48px] overflow-hidden border border-border-dim bg-obsidian-surface shadow-3xl ${
                    section.layout === "side_by_side" && idx % 2 === 1
                      ? "lg:order-2"
                      : ""
                  }`}
                >
                  <img
                    src={section.image_url}
                    alt=""
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div
                  className={
                    section.layout === "side_by_side" && idx % 2 === 1
                      ? "lg:order-1"
                      : ""
                  }
                >
                  {section.heading && (
                    <h3 className="text-3xl lg:text-5xl font-display font-black mb-8 text-silk-white uppercase tracking-tighter leading-none">
                      {section.heading}
                    </h3>
                  )}
                  <div
                    className="prose prose-silk max-w-none text-lg lg:text-xl font-light text-text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.text || "" }}
                  />
                </div>
              </div>
            );

          case "gallery":
            return (
              <div key={idx} className="space-y-10 px-4">
                {section.heading && (
                  <h2 className="text-3xl font-display font-bold text-center text-silk-white">
                    {section.heading}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.media?.map((url: string, mIdx: number) => (
                    <motion.div
                      key={mIdx}
                      whileHover={{ scale: 1.02 }}
                      className="aspect-square rounded-3xl overflow-hidden border border-border-dim shadow-lg bg-obsidian-surface"
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                {section.caption && (
                  <p className="text-center text-base text-text-muted/50 font-medium italic">
                    {section.caption}
                  </p>
                )}
              </div>
            );

          case "gif":
            return (
              <div key={idx} className="max-w-3xl mx-auto space-y-6 px-4">
                <div className="rounded-[2.5rem] overflow-hidden border border-border-dim shadow-2xl bg-obsidian-surface px-4 py-8 flex justify-center">
                  <img
                    src={section.url}
                    alt=""
                    className="max-w-full h-auto rounded-xl"
                  />
                </div>
                {section.caption && (
                  <p className="text-center text-base text-text-muted/50 font-medium italic">
                    {section.caption}
                  </p>
                )}
              </div>
            );

          case "media_list":
            return (
              <div key={idx} className="px-4 space-y-12">
                {section.heading && (
                  <h2 className="text-3xl font-display font-bold text-center text-silk-white">
                    {section.heading}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items?.map((item, iIdx: number) => (
                    <div key={iIdx} className="space-y-6 group">
                      <div className="aspect-video rounded-3xl overflow-hidden border border-border-dim bg-obsidian-surface shadow-lg group-hover:border-accent/50 transition-colors">
                        {item.media_type === "video" ? (
                          <iframe
                            src={convertToEmbedUrl(item.url)}
                            className="w-full h-full"
                            title={item.caption || ""}
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {item.caption && (
                        <p className="text-center text-base text-text-muted font-medium">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
