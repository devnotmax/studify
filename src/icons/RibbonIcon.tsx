import React from "react";
import type { SVGProps } from "react";

export function RibbonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M18 9A6 6 0 1 1 6 9a6 6 0 0 1 12 0"></path>
        <path d="m8 13.472l-1 6.44c0 .81 1.782 1.336 2.447.974l2.106-1.147a.93.93 0 0 1 .894 0l2.106 1.147c.665.362 2.447-.165 2.447-.975l-1-6.439"></path>
      </g>
    </svg>
  );
}
