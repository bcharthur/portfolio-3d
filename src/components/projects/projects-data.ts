import type { ProjectItem } from "./types";

export const selectedProjects: ProjectItem[] = [
  {
    slug: "broken-access-api",
    title: "Broken Access Control in a REST API",
    category: "API Security",
    summary:
      "Analyse d'un défaut d'autorisation permettant à un utilisateur authentifié d'accéder à des ressources qui ne lui étaient pas destinées.",
    impact:
      "Montre ma capacité à tester les contrôles d'accès, manipuler les flux d'authentification et automatiser une validation d'exposition sur API.",
    techniques: ["Python", "Requests", "Authorization", "IDOR", "API Testing"],
    href: "#",
    color: "from-badge to-accent",
  },
  {
    slug: "flask-session-forgery",
    title: "Flask Session Forgery via Weak Secret Management",
    category: "Session Security",
    summary:
      "Étude d'une application Flask utilisant un mécanisme de session signé avec une clé faible, menant à une élévation de privilèges.",
    impact:
      "Met en avant ma compréhension des mécanismes internes de session, de la gestion des secrets et de la reproduction du comportement applicatif en Python.",
    techniques: ["Flask", "itsdangerous", "Cookies", "Python", "Secret Key"],
    href: "#",
    color: "from-accent to-badge",
  },
  {
    slug: "graphql-introspection",
    title: "GraphQL Introspection & Hidden Object Discovery",
    category: "GraphQL",
    summary:
      "Cartographie d'un schéma GraphQL exposé, découverte de types non documentés et construction de requêtes ciblées pour analyser la surface d'attaque.",
    impact:
      "Démontre une démarche offensive moderne sur API et ma capacité à transformer une phase d'énumération en analyse exploitable.",
    techniques: ["GraphQL", "Schema Enumeration", "Query Crafting", "Recon", "Python"],
    href: "#",
    color: "from-foreground/80 to-foreground/40",
  },
  {
    slug: "nginx-alias-misconfiguration",
    title: "Nginx Alias Misconfiguration Exploitation",
    category: "Web Server Security",
    summary:
      "Analyse d'une mauvaise configuration Nginx pouvant permettre l'accès à des ressources non prévues via des variantes de chemins et de traversal.",
    impact:
      "Ajoute une dimension configuration / infrastructure web à mon approche AppSec, avec une logique d'automatisation de tests ciblés.",
    techniques: ["Nginx", "Misconfiguration", "Path Traversal", "Python", "HTTP"],
    href: "#",
    color: "from-badge/80 to-accent/60",
  },
];
