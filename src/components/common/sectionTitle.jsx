import React from "react";

export default function SectionTitle({ background, title }) {
  return (
    <div className="text-center position-relative my-5">
      {/* Big translucent background text */}
      <h1
        className="fw-bold text-uppercase opacity-10 mb-0 d-none d-md-block"
        style={{
          fontSize: "7vw", // Responsive font size
          letterSpacing: "0.2em",
          color: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          userSelect: "none",
          WebkitTextStroke: "1px",
          WebkitTextStrokeColor: "#7b8ebb75",
          whiteSpace: "nowrap",
        }}
      >
        {background}
      </h1>

      {/* Foreground title with red lines */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <h2 className="text-white fw-bold text-uppercase d-inline-block px-3 fs-4 fs-md-3">
          <span className="border-start border-end border-3 border-primary px-3">
            {title}
          </span>
        </h2>
      </div>
    </div>
  );
}
