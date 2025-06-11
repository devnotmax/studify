import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m1 2l1-1h12l1 1v12l-1 1H2l-1-1zm1 0v12h12V2zm1 1h2v1H3zm3 0h2v1H6zm5 0H9v1h2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
