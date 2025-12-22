type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({ children, variant="primary", className = "", type = "button", disabled = false, onClick }: ButtonProps) {
  const baseClasses = 'px-6 py-2 rounded-md font-medium text-md transition font-poppins cursor-pointer text-white';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'border border-white/20 hover:bg-white/10',
  };
  
  return (
    <button className={` ${baseClasses} ${variantClasses[variant]} ${className}`}  type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}