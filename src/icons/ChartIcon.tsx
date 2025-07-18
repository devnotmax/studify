import type { SVGProps } from "react";

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m3.5 17.808l-.73-.731l6.807-6.808l4 4l6.985-8l.707.67l-7.653 8.83l-4.039-4.038z"
      ></path>
    </svg>
  );
}
