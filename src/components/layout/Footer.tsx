export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 AAIE
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            aria-label="Privacy Policy"
          >
            Privacy
          </a>
          <span>•</span>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            aria-label="Accessibility Information"
          >
            Accessibility
          </a>
          <span>•</span>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            aria-label="Contact Support"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}