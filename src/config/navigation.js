/**
 * Navigation Configuration
 * Centralized navigation items for consistent routing
 * Used across DashboardShell, BareShell, HoverSidebarShell
 *
 * Usage:
 *   import { dashboardNavItems, testNavItems } from '@/config/navigation'
 */

import {
  Home,
  BookOpen,
  Headphones,
  Pencil,
  Mic,
  Trophy,
  Settings,
  HelpCircle,
  BookMarked,
  FileText,
  Clock,
  Target,
} from "lucide-react";

/**
 * Dashboard main navigation
 */
export const dashboardNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Übersicht",
  },
  {
    id: "tests",
    label: "Tests",
    href: "/tests",
    icon: FileText,
    description: "Alle Prüfungen",
  },
  {
    id: "themes",
    label: "Themen",
    href: "/themes",
    icon: BookMarked,
    description: "Thematisches Lernen",
  },
  {
    id: "progress",
    label: "Fortschritt",
    href: "/progress",
    icon: Trophy,
    description: "Statistiken",
  },
];

/**
 * Test section navigation
 */
export const testNavItems = [
  {
    id: "lesen",
    label: "Lesen",
    href: "/tests/lesen",
    icon: BookOpen,
    description: "Leseverstehen",
    color: "blue",
  },
  {
    id: "hoeren",
    label: "Hören",
    href: "/tests/hoeren",
    icon: Headphones,
    description: "Hörverstehen",
    color: "purple",
  },
  {
    id: "schreiben",
    label: "Schreiben",
    href: "/tests/schreiben",
    icon: Pencil,
    description: "Schriftlicher Ausdruck",
    color: "green",
  },
  {
    id: "sprechen",
    label: "Sprechen",
    href: "/tests/sprechen",
    icon: Mic,
    description: "Mündlicher Ausdruck",
    color: "red",
  },
];

/**
 * DTZ-specific navigation
 */
export const dtzNavItems = [
  {
    id: "dtz-hoeren",
    label: "DTZ Hören",
    href: "/dtz-hoeren-training",
    icon: Headphones,
    description: "DTZ Hörverstehen Training",
  },
  {
    id: "dtz-lesen",
    label: "DTZ Lesen",
    href: "/dtz-lesen-training",
    icon: BookOpen,
    description: "DTZ Leseverstehen Training",
  },
];

/**
 * Training modes
 */
export const trainingModes = [
  {
    id: "practice",
    label: "Üben",
    icon: Target,
    description: "Freies Üben ohne Zeitlimit",
    value: "practice",
  },
  {
    id: "exam",
    label: "Prüfung",
    icon: Clock,
    description: "Simulation mit Zeitlimit",
    value: "exam",
  },
];

/**
 * User menu items
 */
export const userMenuItems = [
  {
    id: "settings",
    label: "Einstellungen",
    href: "/settings",
    icon: Settings,
  },
  {
    id: "help",
    label: "Hilfe",
    href: "/help",
    icon: HelpCircle,
  },
];

/**
 * Helper function to get active nav item
 */
export const getActiveNavItem = (pathname, navItems) => {
  return navItems.find((item) => pathname.startsWith(item.href));
};

/**
 * Helper function to build breadcrumbs
 */
export const buildBreadcrumbs = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", href: "/" }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, href: currentPath });
  });

  return breadcrumbs;
};

export default {
  dashboardNavItems,
  testNavItems,
  dtzNavItems,
  trainingModes,
  userMenuItems,
  getActiveNavItem,
  buildBreadcrumbs,
};
