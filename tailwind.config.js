const { nextui } = require("@nextui-org/theme/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Background colors
    "bg-primary", "bg-secondary", "bg-success", "bg-warning", "bg-danger", "bg-default",
    "bg-primary/50", "bg-primary/60", "bg-primary/70",
    "bg-secondary/50", "bg-secondary/60", "bg-secondary/70",
    "bg-success/50", "bg-success/60", "bg-success/70",
    "bg-warning/50", "bg-warning/60", "bg-warning/70",
    "bg-danger/50", "bg-danger/60", "bg-danger/70",
    "bg-default/50", "bg-default/60", "bg-default/70",
    "bg-content1", "bg-content2", "bg-content3",
    // Text colors
    "text-primary", "text-secondary", "text-success", "text-warning", "text-danger", "text-default",
    "text-primary-foreground", "text-secondary-foreground", "text-success-foreground",
    "text-warning-foreground", "text-danger-foreground", "text-default-foreground",
    "text-content1", "text-content2", "text-content3",
    // Border colors
    "border-primary", "border-secondary", "border-success", "border-warning", "border-danger", "border-default",
    "border-primary/60", "border-secondary/60", "border-success/60", "border-warning/60", "border-danger/60",
    "border-content1", "border-content2", "border-content3",
    // Shadow colors
    "shadow-primary", "shadow-secondary", "shadow-success", "shadow-warning", "shadow-danger", "shadow-default",
    "shadow-primary/40", "shadow-secondary/40", "shadow-success/40", "shadow-warning/40", "shadow-danger/40",
    // Ring colors
    "ring-primary", "ring-secondary", "ring-success", "ring-warning", "ring-danger", "ring-default",
    "ring-primary/50", "ring-secondary/50", "ring-success/50", "ring-warning/50", "ring-danger/50",
    // Fill
    "fill-primary", "fill-secondary", "fill-success", "fill-warning", "fill-danger", "fill-default",
    // Gradient
    "from-primary", "from-secondary", "from-success", "from-warning", "from-danger", "from-default",
    "to-primary", "to-secondary", "to-success", "to-warning", "to-danger", "to-default",
    "via-primary", "via-secondary", "via-success", "via-warning", "via-danger", "via-default",
    // Utilities
    "opacity-disabled", "ring-focus", "bg-focus", "scale-95", "scale-100",
    // Dark mode variants
    "dark:bg-primary", "dark:bg-secondary", "dark:bg-success", "dark:bg-warning", "dark:bg-danger", "dark:bg-default",
    "dark:bg-primary/50", "dark:bg-primary/60", "dark:bg-primary/70",
    "dark:bg-secondary/50", "dark:bg-secondary/60", "dark:bg-secondary/70",
    "dark:bg-success/50", "dark:bg-success/60", "dark:bg-success/70",
    "dark:bg-warning/50", "dark:bg-warning/60", "dark:bg-warning/70",
    "dark:bg-danger/50", "dark:bg-danger/60", "dark:bg-danger/70",
    "dark:bg-default/50", "dark:bg-default/60", "dark:bg-default/70",
    "dark:bg-content1", "dark:bg-content2", "dark:bg-content3",
    "dark:text-primary", "dark:text-secondary", "dark:text-success", "dark:text-warning", "dark:text-danger", "dark:text-default",
    "dark:text-primary-foreground", "dark:text-secondary-foreground", "dark:text-success-foreground",
    "dark:text-warning-foreground", "dark:text-danger-foreground", "dark:text-default-foreground",
    "dark:text-content1", "dark:text-content2", "dark:text-content3",
    "dark:border-primary", "dark:border-secondary", "dark:border-success", "dark:border-warning", "dark:border-danger", "dark:border-default",
    "dark:border-primary/60", "dark:border-secondary/60", "dark:border-success/60", "dark:border-warning/60", "dark:border-danger/60",
    "dark:border-content1", "dark:border-content2", "dark:border-content3",
    "dark:shadow-primary", "dark:shadow-secondary", "dark:shadow-success", "dark:shadow-warning", "dark:shadow-danger", "dark:shadow-default",
    "dark:ring-primary", "dark:ring-secondary", "dark:ring-success", "dark:ring-warning", "dark:ring-danger", "dark:ring-default",
    "dark:fill-primary", "dark:fill-secondary", "dark:fill-success", "dark:fill-warning", "dark:fill-danger", "dark:fill-default",
    "dark:from-primary", "dark:from-secondary", "dark:from-success", "dark:from-warning", "dark:from-danger", "dark:from-default",
    "dark:to-primary", "dark:to-secondary", "dark:to-success", "dark:to-warning", "dark:to-danger", "dark:to-default",
    "dark:via-primary", "dark:via-secondary", "dark:via-success", "dark:via-warning", "dark:via-danger", "dark:via-default",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
