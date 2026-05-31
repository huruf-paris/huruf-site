'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, children, className, disabled, ...props }, ref) => {
    const base =
      'relative inline-flex items-center justify-center font-cormorant tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'

    const variants = {
      primary:
        'bg-gold text-night font-semibold btn-shimmer shadow-lg shadow-gold/10 hover:shadow-gold/25',
      secondary:
        'bg-night-deep text-pearl border border-gold/30 hover:border-gold/70 hover:text-gold',
      outline:
        'bg-transparent text-gold border border-gold/50 hover:border-gold hover:bg-gold/5',
      ghost:
        'bg-transparent text-pearl/70 hover:text-gold',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-12 py-4 text-base',
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Chargement…
          </span>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
