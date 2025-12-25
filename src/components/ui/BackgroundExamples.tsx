// Grid and Dot Background Components
// Usage examples for the Altair Attic website

import { GridBackground } from "./GridBackground";
import { DotBackground } from "./DotBackground";

/**
 * USAGE EXAMPLES:
 *
 * 1. Grid Background (Subtle, for sections):
 *
 * <section className="relative min-h-screen">
 *   <GridBackground
 *     gridSize={60}
 *     gridColor="rgba(139, 92, 246, 0.1)"
 *     fade={true}
 *   />
 *   <div className="relative z-10">
 *     Your content here
 *   </div>
 * </section>
 *
 * 2. Dot Background (More modern, for hero):
 *
 * <section className="relative min-h-screen">
 *   <DotBackground
 *     dotSize={1.5}
 *     gap={30}
 *     dotColor="rgba(139, 92, 246, 0.2)"
 *     fade={true}
 *   />
 *   <div className="relative z-10">
 *     Your hero content
 *   </div>
 * </section>
 *
 * 3. Layered backgrounds (grid + dots):
 *
 * <section className="relative min-h-screen bg-brand-black">
 *   <GridBackground gridSize={80} gridColor="rgba(139, 92, 246, 0.05)" fade={false} />
 *   <DotBackground gap={40} dotColor="rgba(255, 255, 255, 0.08)" />
 *   <div className="relative z-10">
 *     Your content
 *   </div>
 * </section>
 *
 * Props:
 *
 * GridBackground:
 * - gridSize: number (default: 50) - Size of grid cells in pixels
 * - gridColor: string (default: "rgba(255, 255, 255, 0.08)") - Color of grid lines
 * - backgroundColor: string (default: "transparent") - Background color
 * - fade: boolean (default: true) - Add gradient fade to bottom
 * - className: string - Additional classes
 * - maskClassName: string - Classes for the fade mask
 *
 * DotBackground:
 * - dotSize: number (default: 1) - Size of dots in pixels
 * - gap: number (default: 25) - Space between dots
 * - dotColor: string (default: "rgba(255, 255, 255, 0.15)") - Color of dots
 * - backgroundColor: string (default: "transparent") - Background color
 * - fade: boolean (default: true) - Add gradient fade to bottom
 * - className: string - Additional classes
 * - maskClassName: string - Classes for the fade mask
 */

export { GridBackground, DotBackground };
