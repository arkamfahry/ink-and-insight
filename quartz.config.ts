import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ink & Insight",
    pageTitleSuffix: " - by Arkam Fahri",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "arkamfahry.is-a.dev",
    ignorePatterns: ["private", "templates", "whiteboards", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "JetBrains Mono",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa", // Authentic Atom One Light background
          lightgray: "#e5e5e5", // Very light gray for panels
          gray: "#4b535e", // Darkened medium gray, slightly darker for better contrast
          darkgray: "#2f3338", // Darker gray for primary text, optimized for readability
          dark: "#c678dd", // Light purple for headers and accents (matches dark mode)
          secondary: "#56b6c2", // Teal for links and accents, consistent with dark mode
          tertiary: "#98675d", // Warm pinkish-brown for secondary accents
          highlight: "rgba(216, 222, 233, 0.15)", // Light gray for background highlights
          textHighlight: "#d19a66", // Light, warm gold for highlighted text
        },
        darkMode: {
          light: "#282c34", // Authentic Atom One Dark background
          lightgray: "#3e4451", // Slightly lighter than background for panels
          gray: "#5c6370", // Muted gray for secondary text
          darkgray: "#abb2bf", // Light gray for main text
          dark: "#c678dd", // Soft purple for headers and accents (replaces red)
          secondary: "#56b6c2", // Teal for links and additional accents
          tertiary: "#d19a66", // Warm pinkish-orange for secondary accents
          highlight: "rgba(56, 61, 72, 0.15)", // Subtle dark highlight
          textHighlight: "#e5c07b88", // Soft gold for highlighted text
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true,
        enableCheckbox: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
