# Specification

## Summary
**Goal:** Build a clear, neat Data Structure Visualizer website with concept lessons, interactive visual demos, and a hands-on playground with step-by-step animation controls.

**Planned changes:**
- Create the core site structure with responsive pages and top-level navigation: Home, Data Structures, Algorithms, Playground, and About.
- Apply a consistent student-friendly visual theme (typography, spacing, colors, component styling) across the site.
- Build “Concept Lessons” for Array, Linked List, Stack, Queue, Binary Search Tree, Heap, and Graph with a consistent layout (Overview, Operations, Complexity, Common pitfalls) and a paired live visualization panel.
- Implement an interactive Playground to manipulate selected data structures with common operations, input validation, Reset, and Load Sample.
- Add step-by-step visualization controls: Play/Pause, Step Forward (optional Step Back where feasible), and Speed control, with highlights and short per-step captions.
- Add algorithm visualizations for Bubble Sort, Insertion Sort, BFS, and DFS using the same animation/step controls and clear highlighting.
- Implement a backend content API (single Motoko actor) to serve lesson metadata, lesson content sections, and playground presets.
- Integrate frontend data loading with the backend via React Query, including caching, loading/skeleton states, and error UI with retry.
- Ensure accessibility and classroom-friendly UX: keyboard-operable controls, readable sizing, sufficient contrast, and clear empty states/tooltips.

**User-visible outcome:** Users can navigate a complete educational site, read structured data-structure lessons with live visuals, run interactive playground operations and algorithm demos with step-by-step animated controls, and see content/presets loaded from the backend with accessible, responsive UI.
