import { FiFileText, FiEdit, FiSearch, FiFolder, FiDatabase } from "react-icons/fi";

export const siteConfig = {
  name: "ContractConsel",
  tagline: "Est. Legal Outsourcing",
  description:
    "Redefining how legal work gets done. AI-powered contract review, drafting, document review, legal documentation, and eDiscovery for law firms.",
  email: "team@contractconsel.com",
  phone: "+1 (555) 000-0000",
};

export const navItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    icon: FiFileText,
    title: "Contract Review",
    description:
      "AI-powered analysis that identifies risks, inconsistencies, and non-standard clauses across contracts in minutes, not hours.",
  },
  {
    icon: FiEdit,
    title: "Contract Drafting",
    description:
      "Generate precise, jurisdiction-aware contracts from templates refined by machine learning across thousands of precedents.",
  },
  {
    icon: FiSearch,
    title: "Document Review",
    description:
      "Accelerate document review with AI that categorizes, prioritizes, and flags relevant documents with near-perfect accuracy.",
  },
  {
    icon: FiFolder,
    title: "Legal Documentation",
    description:
      "Streamline creation and management of legal documents with intelligent automation that ensures consistency and compliance.",
  },
  {
    icon: FiDatabase,
    title: "eDiscovery",
    description:
      "Reduce eDiscovery costs and timelines with AI-driven search, predictive coding, and intelligent document clustering.",
  },
];

export const stats = [
  { value: 100, suffix: "%", prefix: "~", label: "Accuracy Rate" },
  { value: 80, suffix: "%", prefix: "", label: "Time Reduction" },
  { value: 1000, suffix: "+", prefix: "", label: "Contracts Reviewed" },
  { value: 50, suffix: "+", prefix: "", label: "Law Firms Served" },
];

export const differentiators = [
  {
    title: "Built for Legal",
    description:
      "Our AI is trained specifically on legal data and precedents — not a general-purpose model repurposed for law.",
  },
  {
    title: "Human + AI",
    description:
      "Technology that augments lawyers, not replaces them. Every output is designed for human review and refinement.",
  },
  {
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure with end-to-end encryption. Your data never leaves your control.",
  },
];

export const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];
