import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
};

type AnchorProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type Props = AnchorProps | ButtonProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
  secondary: "border border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50 focus-visible:ring-blue-500"
};

export default function Button(props: Props) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = `${baseStyles} ${variants[variant]} ${className ?? ""}`;

  if ("href" in rest) {
    const anchorProps = rest as AnchorProps;
    return (
      <a href={anchorProps.href} target={anchorProps.target} rel={anchorProps.rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button {...(rest as ButtonProps)} className={classes}>
      {children}
    </button>
  );
}
