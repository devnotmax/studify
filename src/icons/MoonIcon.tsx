import type { SVGProps } from "react";

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.41 13.28C7.332 10.205 6.716 5.693 8.357 2c-1.23.41-2.256 1.23-3.281 2.256a10.4 10.4 0 0 0 0 14.768c4.102 4.102 10.46 3.897 14.562-.205c1.026-1.026 1.846-2.051 2.256-3.282c-3.896 1.436-8.409.82-11.486-2.256"
      ></path>
    </svg>
  );
}
