import * as React from "react"
import { cn } from "@/lib/utils"
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons" // Assurez-vous d'importer les icônes appropriées

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
    )
  }
)
InputPassword.displayName = "InputPassword"

export { InputPassword }
