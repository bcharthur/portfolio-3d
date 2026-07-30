import type { TimelineGroup } from "./types";

const logos = {
  covea: `${import.meta.env.BASE_URL}images/logos/covea.png`,
  groupama: `${import.meta.env.BASE_URL}images/logos/groupama.png`,
  yeswehack: `${import.meta.env.BASE_URL}images/logos/yeswehack.jpg`,
};

export const timelineGroups: TimelineGroup[] = [
  {
    id: "2025",
    period: "2025 - Aujourd'hui",
    formation: {
      title: "Bac+5 Expert en Sécurité Digitale",
      org: "ESD academy",
      location: "Niort",
      period: "2025 - 2027",
      description:
        "Analyse préventive des vulnérabilités, audit de la sécurité des SI, gestion des incidents, EBIOS RM.",
    },
    experiences: [
      {
        id: "covea",
        title: "Expert en cybersécurité",
        org: "Groupe Covéa",
        location: "Niort · Alternance",
        period: "Sept. 2025 - aujourd'hui",
        description:
          "Direction Cybersécurité Risque Numérique, équipe Conseil Cybersécurité Applicatif. EBIOS RM, gouvernance, risques et conformité.",
        logo: logos.covea,
        logoInitial: "C",
      },
      {
        id: "yeswehack",
        title: "Bug Bounty Hunter",
        org: "YesWeHack",
        location: "Freelance",
        period: "Janv. 2026 - aujourd'hui",
        description:
          "Recherche de vulnérabilités sur programmes privés, rédaction de reports avec preuve d'impact métier.",
        logo: logos.yeswehack,
        href: "https://yeswehack.com/hunters/br0nson",
      },
    ],
  },
  {
    id: "2023",
    period: "2023 - 2025",
    formation: {
      title: "Bac+3 Concepteur Développeur d'Applications",
      org: "ENI École Informatique",
      location: "Niort",
      period: "2023 - 2025",
      description:
        "Titre RNCP 37873 obtenu : architecture logicielle, modélisation de données, sécurité applicative.",
    },
    experiences: [
      {
        id: "groupama",
        title: "Développeur d'applications fullstack",
        org: "Groupama Centre-Atlantique",
        location: "Niort · Alternance",
        period: "2023 - 2025",
        description:
          "Écosystème Microsoft (.NET, SQL Server, SSIS) : conception, développement et sécurité applicative (injections SQL, XSS, CSRF).",
        logo: logos.groupama,
        logoInitial: "G",
      },
    ],
  },
  {
    id: "2021",
    period: "2021 - 2023",
    formation: {
      title: "BTS SNIR (Système Numérique Informatique et Réseaux)",
      org: "Lycée Pilote Innovant International",
      period: "2021 - 2023",
      description:
        "Systèmes, réseaux et développement - les bases techniques avant une spécialisation progressive en cybersécurité.",
    },
    experiences: [
      {
        id: "a4-recto-verso",
        title: "Technicien informatique",
        org: "A4 Recto-Verso",
        location: "Chauvigny · Stage",
        period: "Mai - Juil. 2022",
        description: "Stage technique en environnement PHP et science informatique.",
      },
    ],
  },
];
