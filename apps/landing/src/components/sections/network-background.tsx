"use client";

export function NetworkBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="network-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Nodes */}
          <circle
            cx="10"
            cy="10"
            r="2"
            fill="#9CA3AF"
            className="network-node"
            style={{ animationDelay: "0s" }}
          />
          <circle
            cx="90"
            cy="30"
            r="2"
            fill="#9CA3AF"
            className="network-node"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="50"
            cy="70"
            r="2"
            fill="#9CA3AF"
            className="network-node"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="30"
            cy="90"
            r="2"
            fill="#9CA3AF"
            className="network-node"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Lines */}
          <line
            x1="10"
            y1="10"
            x2="90"
            y2="30"
            stroke="#D1D5DB"
            strokeWidth="1"
            className="network-line"
            style={{ animationDelay: "0s" }}
          />
          <line
            x1="90"
            y1="30"
            x2="50"
            y2="70"
            stroke="#D1D5DB"
            strokeWidth="1"
            className="network-line"
            style={{ animationDelay: "0.5s" }}
          />
          <line
            x1="50"
            y1="70"
            x2="30"
            y2="90"
            stroke="#D1D5DB"
            strokeWidth="1"
            className="network-line"
            style={{ animationDelay: "1s" }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#network-pattern)" />
    </svg>
  );
}
