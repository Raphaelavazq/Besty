/**
 * IconGrid Component
 * Reusable grid layout for icon-based cards
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <IconGrid
 *     items={[
 *       { icon: BookOpen, title: 'Lesen', href: '/lesen' },
 *       { icon: Mic, title: 'Sprechen', href: '/sprechen' }
 *     ]}
 *     columns={3}
 *   />
 */

import { cn } from "../../utils/cn";
import { useNavigate } from "react-router-dom";

const columns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const IconGrid = ({
  items = [],
  columns: columnCount = 3,
  gap = "gap-6",
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <div className={cn("grid", columns[columnCount], gap, className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isClickable = item.onClick || item.href;

        return (
          <div
            key={item.id || index}
            onClick={() => isClickable && handleClick(item)}
            className={cn(
              // Base styles
              "bg-white/80 backdrop-blur-md",
              "border border-purple-100",
              "rounded-2xl",
              "p-6",
              "shadow-lg",
              "transition-all duration-200",
              // Interactive
              isClickable && [
                "cursor-pointer",
                "hover:shadow-xl hover:-translate-y-1",
                "active:scale-95",
              ],
              // Disabled state
              item.disabled && "opacity-50 cursor-not-allowed",
              item.className
            )}
          >
            {/* Icon */}
            {Icon && (
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-800 to-indigo-900 text-white shadow-lg">
                <Icon className="h-8 w-8" />
              </div>
            )}

            {/* Title */}
            {item.title && (
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                {item.title}
              </h3>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-sm text-gray-600 text-center">
                {item.description}
              </p>
            )}

            {/* Optional Badge */}
            {item.badge && (
              <div className="mt-3 flex justify-center">{item.badge}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IconGrid;
