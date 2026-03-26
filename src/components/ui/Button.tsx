import { type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Função utilitária para merge de classes Tailwind (se estiver usando) ou CSS
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline';
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
    const baseStyles = "px-8 py-4 transition-all duration-300 font-medium uppercase tracking-widest text-sm";
    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800",
        outline: "border border-zinc-400 text-zinc-800 hover:bg-zinc-100"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}