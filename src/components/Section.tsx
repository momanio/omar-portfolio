interface SectionProps {
  idName: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}

export const Section = ({ idName, children, className = "", labelledBy }: SectionProps) => <section id={idName} aria-labelledby={labelledBy} className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative ${className}`}>{children}</section>;
