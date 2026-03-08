/**
 * ResponsiveContainer - Wrapper component for responsive layouts
 * Automatically handles mobile, tablet, and desktop layouts
 */

const ResponsiveContainer = ({ children, className = '', noPadding = false }) => {
  const baseClasses = 'w-full mx-auto'
  const paddingClasses = noPadding ? '' : 'px-4 sm:px-6 lg:px-8'
  const maxWidthClasses = 'max-w-7xl'
  
  return (
    <div className={`${baseClasses} ${paddingClasses} ${maxWidthClasses} ${className}`}>
      {children}
    </div>
  )
}

export default ResponsiveContainer
