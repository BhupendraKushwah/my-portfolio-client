export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className,
  ...rest
}) {
  const base = "btn d-inline-flex align-items-center gap-2 fw-bold";
  const variantMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline-primary",
    ghost: "btn-light border-0",
  };
  const sizeMap = { sm: "btn-sm", md: "", lg: "btn-lg" };

  return (
    <button {...rest} className={`rounded-2 ${base} ${variantMap[variant] || variantMap.primary} ${sizeMap[size]} ${className}`} disabled={loading || rest.disabled}>
      {loading && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}