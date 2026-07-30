export interface SiteSection {
  label: string;
  id: string;
}

export const siteSections: SiteSection[] = [
  { label: "À propos", id: "a-propos" },
  { label: "Parcours", id: "parcours" },
  { label: "Certifications", id: "certifications" },
  { label: "CTF", id: "ctf" },
  { label: "Projets", id: "projets" },
  { label: "Contact", id: "contact" },
];
