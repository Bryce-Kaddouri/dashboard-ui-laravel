import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ExclamationTriangleIcon, Cross2Icon } from "@radix-ui/react-icons" // Assurez-vous d'importer l'icône de croix

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive_dismissible: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive flex justify-between items-center",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        active: "border-green-500 text-green-500 dark:border-green-500 [&>svg]:text-green-500",
        warning: "border-yellow-500 text-yellow-500 dark:border-yellow-500 [&>svg]:text-yellow-500",
        error: "border-red-500 text-red-500 dark:border-red-500 [&>svg]:text-red-500",
        success: "border-green-500 text-green-500 dark:border-green-500 [&>svg]:text-green-500",
        
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> 
>(({ className, variant, ...props }, ref) => {

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      
      {props.children}
    </div>
  );
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertClose = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button variant="outline" size="icon" className={cn(className)} {...props} />
))
AlertClose.displayName = "AlertClose"

export { Alert, AlertTitle, AlertDescription, AlertClose }