import type { SVGProps } from "react";

export function ConstructionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.fill}
        d="M16 9c0 5.33-8 5.33-8 0h2c0 2.67 4 2.67 4 0m6 9v3H4v-3c0-2.67 5.33-4 8-4s8 1.33 8 4m-1.9 0c0-.64-3.13-2.1-6.1-2.1S5.9 17.36 5.9 18v1.1h12.2M12.5 2c.28 0 .5.22.5.5v3h1V3a3.89 3.89 0 0 1 2.25 3.75s.7.14.75 1.25H7c0-1.11.75-1.25.75-1.25A3.89 3.89 0 0 1 10 3v2.5h1v-3c0-.28.22-.5.5-.5"
      ></path>
    </svg>
  );
}
