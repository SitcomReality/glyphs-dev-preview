import React from "react";
import { createRoot } from "react-dom/client";

function FileLink({ path }) {
  // The project files are available under /refactory/... in the environment.
  return React.createElement(
    "a",
    { className: "file", href: path, target: "_blank", rel: "noreferrer" },
    path.replace(/^\//, "")
  );
}

function App() {
  const files = [
    "/refactory/monolith.txt",
    "/refactory/glyphs.txt",
    "/refactory/audiences.txt",
    "/refactory/GlyphCard.txt",
    "/refactory/AudienceCreature.txt",
    "/refactory/ScoreCalculator.txt",
    "/refactory/styles.css"
  ];

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Glyphs — Dev Preview"),
    React.createElement("p", null, "This preview page mounts a tiny React shell and exposes the project source files for quick inspection."),
    React.createElement("div", { className: "grid" }, files.map(p => React.createElement(FileLink, { key: p, path: p }))),
    React.createElement("div", null,
      React.createElement("a", { className: "btn", href: "/refactory/monolith.txt", target: "_blank", rel: "noreferrer" }, "Open App Entry (monolith.txt)")
    )
  );
}

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));