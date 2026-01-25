export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  slug: string;
  featured?: boolean;
  content: string; // HTML string for content to keep it simple without MD parsing for now
}

export const blogData: BlogPost[] = [
  {
    id: "f1",
    title: "How to Make Your Home Smart (Without the Clutter)",
    excerpt:
      "Technology shouldn't feel messy. Discover how to hide cables, sensors, and gadgets so your home feels peaceful, not robotic.",
    date: "March 20, 2024",
    readTime: "5 min read",
    category: "Home Tips",
    author: "Davytun",
    image:
      "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?auto=format&fit=crop&q=80&w=2600",
    slug: "smart-home-no-clutter",
    featured: true,
    content: `
      <h2>The Art of Invisible Tech</h2>
      <p>We’ve all seen it: a beautiful living room ruined by a tangle of wires, blinking routers, and clunky plastic sensors stuck to the walls. The promise of the "Smart Home" often comes with the baggage of "Tech Clutter." But true luxury is about technology that serves you without demanding your attention.</p>
      
      <p>When we design systems at Altair Attic, we follow a simple rule: <strong>If you can see it, it's not smart enough yet.</strong> Here is how you can achieve that same clean, peaceful look in your own home.</p>

      <h3>1. The Magic of Centralized Racks</h3>
      <p>The biggest mistake DIYers make is putting equipment in every room. Instead, consider a centralized AV rack closet. This is where your breakdown happens:</p>
      <ul>
        <li><strong>Sources:</strong> Apple TVs, Cable boxes, and Game Consoles live here.</li>
        <li><strong>Distribution:</strong> A matrix switch sends video to any TV in the house over a single thin cable.</li>
        <li><strong>Result:</strong> Your TV floats on the wall with zero wires visible beneath it.</li>
      </ul>

      <h3>2. Sensors Should Be Heard (by the system), Not Seen</h3>
      <p>Stop sticking white plastic squares on your beautiful mahogany door frames. Modern sensors can be recessed into the ceiling like pot lights, effectively becoming invisible while covering a wider area. Some motion sensors are now even small enough to hide behind the faceplate of a light switch.</p>

      <h3>3. The One App Rule</h3>
      <p>Clutter isn't just physical; it's digital too. If you need five different apps to turn on the lights, play music, and check the lock, you're doing it wrong. A true smart home unifies these into a single interface (like Control4, Savant, or Home Assistant) that manages the logic for you.</p>

      <h2>Conclusion</h2>
      <p>Your home is a sanctuary, not a server room. By thinking about <em>placement</em> before <em>purchase</em>, you can build a space that feels magical, where things just work, and the technology fades into the background.</p>
    `,
  },
  {
    id: "1",
    title: "Why Smart Homes Save You Money",
    excerpt:
      "It's not just about convenience. See how automated lights and thermostats can lower your electric bill by up to 30%.",
    date: "March 15, 2024",
    readTime: "4 min read",
    category: "Savings",
    author: "Davytun",
    image:
      "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=2400",
    slug: "smart-home-savings",
    content: `
       <h2>The ROI of Automation</h2>
       <p>Many people view smart home technology as a luxury expense, but when implemented correctly, it's actually an investment that pays dividends. Energy waste is one of the biggest hidden costs in modern homeownership.</p>

       <h3>Intelligent Climate Control</h3>
       <p>Your AC doesn't need to run at full blast when you're at work. A smart thermostat learns your schedule and adjusts the temperature automatically. It can even detect when a window is left open and pause the system to prevent cooling the entire neighborhood.</p>

       <h3>Lighting That Makes Sense</h3>
       <p>How often are lights left on in empty rooms? occupancy sensors solve this instantly. Furthermore, "Daylight Harvesting" systems can dim your artificial lights when there is plenty of natural sun coming in, maintaining a perfect brightness level while using half the electricity.</p>
    `,
  },
  {
    id: "2",
    title: "The Best Security Systems for 2025",
    excerpt:
      "Keep your family safe with the latest cameras and locks. We break down which simple upgrades offer the best protection.",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Security",
    author: "Team Altair",
    image:
      "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=2400",
    slug: "best-security-2025",
    content: `
      <h2>Security That Thinks Before It Acts</h2>
      <p>The era of the "dumb" alarm that just beeps is over. The 2025 standard for home security involves AI analysis and proactive deterrence.</p>
    `,
  },
  {
    id: "3",
    title: "Creating the Perfect Home Cinema",
    excerpt:
      "Want a movie theater experience in your living room? Here’s a simple guide to better sound and clearer picture.",
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "Entertainment",
    author: "Davytun",
    image:
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=2400",
    slug: "perfect-home-cinema",
    content: `
       <h2>Bringing Hollywood Home</h2>
       <p>You don't need a dedicated room to have a cinema experience. The secret lies in three things: Light control, Sound processing, and Source quality.</p>
    `,
  },
  {
    id: "4",
    title: "Solar Power: Is It Worth It?",
    excerpt:
      "Thinking about solar panels? We explain the costs, the benefits, and how long it takes to see a return on investment.",
    date: "February 15, 2024",
    readTime: "10 min read",
    category: "Energy",
    author: "Engineering",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2400",
    slug: "solar-power-worth-it",
    content: `
       <h2>The Solar Equation</h2>
       <p>With rising grid costs, solar is looking more attractive than ever. But is it right for your roof? We break down the math.</p>
    `,
  },
];
