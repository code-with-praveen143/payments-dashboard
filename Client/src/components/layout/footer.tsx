export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 sm:px-6 lg:px-8 lg:pl-64">
        {/* Left Section - Footer Text */}
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
          © 2024 College Admin. All rights reserved.
        </p>

        {/* Right Section - Links */}
        <div className="flex items-center justify-center space-x-4 w-full sm:w-auto">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
