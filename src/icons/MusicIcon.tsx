import type { SVGProps } from "react";

export function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color || "currentColor"}
        d="M20 2.913V18a3 3 0 1 1-2-2.83V8.088L8 8.92V19a3 3 0 1 1-2-2.83V4.08z"
      ></path>
    </svg>
  );
}
