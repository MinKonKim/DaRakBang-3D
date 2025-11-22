import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-500 text-white hover:bg-blue-500/90',
        secondary:
          'bg-gray-200 text-gray-800 hover:bg-gray-200/80',
      },
      size: {
        small: 'h-9 px-3 rounded-md',
        medium: 'h-10 py-2 px-4',
        large: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
}

export const Button = ({
  className,
  variant,
  size,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(clsx(buttonVariants({ variant, size, className })))}
      {...props}
    >
      {label}
    </button>
  );
};