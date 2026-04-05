import Logo from "../ui/Logo";
import { footerLinks, siteConfig } from "@/lib/constants";
import { FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Logo className="mb-4" />
            <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-3">
              {siteConfig.tagline}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Intelligent technology at the intersection of AI and legal
              services, giving businesses a smarter way to manage legal needs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors"
              >
                <FiMail size={14} />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors"
              >
                <FiPhone size={14} />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} ContractCounsel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
