import type { ProjectItem } from "./types";

export const selectedProjects: ProjectItem[] = [
  {
    slug: "broken-access-api",
    title: "Broken Access Control in a REST API",
    category: "API Security",
    source: "Root-Me - Web Serveur / API - Broken Access",
    summary:
      "Analyse d'un défaut d'autorisation permettant à un utilisateur authentifié d'accéder à des ressources qui ne lui étaient pas destinées.",
    impact:
      "Montre ma capacité à tester les contrôles d'accès, manipuler les flux d'authentification et automatiser une validation d'exposition sur API.",
    techniques: ["Python", "Requests", "Authorization", "IDOR", "API Testing"],
    color: "from-badge to-accent",
    context:
      "Une API REST avec inscription et connexion classiques, où certaines ressources (dont celle d'un compte administrateur) sont accessibles via un identifiant dans l'URL.",
    approach:
      "Créer un compte utilisateur standard, s'authentifier normalement, puis tester si l'application vérifie réellement que la ressource demandée appartient bien à l'utilisateur connecté - ou si elle se contente de vérifier qu'il est authentifié, sans contrôler ce qu'il a le droit de voir.",
    automation:
      "Script Python (requests) qui automatise le cycle complet : inscription d'un compte aléatoire, gestion de l'authentification (JWT ou cookie selon la réponse de l'API), puis requête ciblée sur une ressource tierce.",
    remediation:
      "Vérifier l'appartenance de la ressource à l'utilisateur authentifié à chaque requête côté serveur, et ne jamais faire confiance à un identifiant fourni côté client sans contrôle d'autorisation associé.",
    snippet: {
      label: "Logique générale (extrait, non fonctionnel)",
      code: `session = requests.Session()
signup(session, random_user, random_pwd)
login(session, random_user, random_pwd)

# Ressource qui ne m'appartient pas
resp = session.get(f"{BASE}/user/<autre_id>")`,
    },
  },
  {
    slug: "flask-session-forgery",
    title: "Flask Session Forgery via Weak Secret Management",
    category: "Session Security",
    source: "Root-Me - Web Serveur / Flask - Unsecure session",
    summary:
      "Étude d'une application Flask utilisant un mécanisme de session signé avec une clé faible, menant à une élévation de privilèges.",
    impact:
      "Met en avant ma compréhension des mécanismes internes de session, de la gestion des secrets et de la reproduction du comportement applicatif en Python.",
    techniques: ["Flask", "itsdangerous", "Cookies", "Python", "Secret Key"],
    color: "from-accent to-badge",
    context:
      "Une application Flask protège une page admin via un champ dans son cookie de session. Ce cookie est un token signé (format itsdangerous à trois parties), pas chiffré : son contenu est lisible, seule sa signature en garantit l'intégrité.",
    approach:
      "Identifier le format du cookie, puis chercher à retrouver la clé secrète qui l'a signé par attaque par dictionnaire hors-ligne - la signature n'est fiable que si la clé est réellement impossible à deviner.",
    automation:
      "Une fois une clé candidate trouvée, reproduire fidèlement la configuration du serializer Flask (sel, dérivation HMAC, algorithme de hash) en Python pour vérifier qu'elle permet bien de décoder le cookie intercepté.",
    remediation:
      "Générer une clé secrète aléatoire à forte entropie (jamais un mot de dictionnaire), la stocker hors du code source, et la faire tourner régulièrement.",
    snippet: {
      label: "Logique générale (extrait, non fonctionnel)",
      code: `# cookie = header.payload.signature
found_key = bruteforce_secret(cookie, wordlist)

serializer = flask_serializer(found_key)
serializer.loads(cookie)  # confirme la clé`,
    },
  },
  {
    slug: "graphql-introspection",
    title: "GraphQL Introspection & Hidden Object Discovery",
    category: "GraphQL",
    source: "Root-Me - Web Serveur / GraphQL - Introspection",
    summary:
      "Cartographie d'un schéma GraphQL exposé, découverte de types non documentés et construction de requêtes ciblées pour analyser la surface d'attaque.",
    impact:
      "Démontre une démarche offensive moderne sur API et ma capacité à transformer une phase d'énumération en analyse exploitable.",
    techniques: ["GraphQL", "Schema Enumeration", "Query Crafting", "Recon", "Python"],
    color: "from-foreground/80 to-foreground/40",
    context:
      "Un endpoint GraphQL avec l'introspection activée, ce qui permet d'interroger le serveur pour obtenir la description complète de son propre schéma.",
    approach:
      "Utiliser des requêtes d'introspection standard pour lister tous les types, champs et arguments exposés par l'API, y compris ceux qui ne sont jamais appelés par le front-end officiel - et qui n'apparaissent donc dans aucune documentation.",
    automation:
      "Une fois un champ sortant du lot repéré, petite boucle de requêtes faisant varier son paramètre pour observer les différentes réponses renvoyées par le serveur.",
    remediation:
      "Désactiver l'introspection GraphQL en production et appliquer un contrôle d'autorisation au niveau de chaque champ (field-level authorization), pas uniquement au niveau du endpoint.",
    snippet: {
      label: "Logique générale (extrait, non fonctionnel)",
      code: `{
  __schema {
    types { name fields { name } }
  }
}
# -> cartographie du schéma, y compris
#    les champs jamais utilisés par le front`,
    },
  },
  {
    slug: "nginx-alias-misconfiguration",
    title: "Nginx Alias Misconfiguration Exploitation",
    category: "Web Server Security",
    source: "Root-Me - Web Serveur / Nginx - Alias Misconfiguration",
    summary:
      "Analyse d'une mauvaise configuration Nginx pouvant permettre l'accès à des ressources non prévues via des variantes de chemins et de traversal.",
    impact:
      "Ajoute une dimension configuration / infrastructure web à mon approche AppSec, avec une logique d'automatisation de tests ciblés.",
    techniques: ["Nginx", "Misconfiguration", "Path Traversal", "Python", "HTTP"],
    color: "from-badge/80 to-accent/60",
    context:
      "Un bloc `location` Nginx utilisant `alias` sans que le slash final soit cohérent avec le préfixe de la location - l'erreur classique dite « off-by-slash ».",
    approach:
      "Construire des chemins contenant des séquences de remontée de répertoire juste après le préfixe de la location, en testant plusieurs profondeurs et variantes d'encodage, pour faire sortir la résolution du fichier du dossier prévu par l'alias.",
    automation:
      "Script Python testant systématiquement plusieurs profondeurs de remontée et une liste de cibles, pour repérer la combinaison qui retourne un contenu situé hors du dossier autorisé.",
    remediation:
      "Toujours faire correspondre exactement le slash final entre `location` et `alias`, préférer `root` à `alias` quand c'est possible, et normaliser/valider les chemins côté serveur.",
    snippet: {
      label: "Logique générale (extrait, non fonctionnel)",
      code: `for depth in range(1, MAX_DEPTH):
    path = f"/assets{'../' * depth}<cible>"
    r = session.get(BASE + path)
    # on cherche la profondeur qui sort de l'alias`,
    },
  },
  {
    slug: "nginx-root-location-misconfiguration",
    title: "Nginx Root Location Misconfiguration",
    category: "Web Server Security",
    source: "Root-Me - Web Serveur / Nginx - Root Location Misconfiguration",
    summary:
      "Étude d'une racine web mal isolée dans une configuration Nginx, permettant de sortir du périmètre applicatif pour atteindre des fichiers de configuration internes du serveur.",
    impact:
      "Illustre ma compréhension des risques liés à l'isolation du système de fichiers et à la configuration des serveurs web, au-delà du seul code applicatif.",
    techniques: ["Nginx", "Path Traversal", "Server Configuration", "Python", "HTTP"],
    color: "from-foreground to-accent/70",
    context:
      "Une directive `root` positionnée de façon trop permissive dans la configuration Nginx, qui expose potentiellement des fichiers internes du serveur au lieu de se limiter au contenu applicatif prévu.",
    approach:
      "Tester des chemins encodés (les séquences de remontée de répertoire étant encodées pour contourner une normalisation naïve) afin de remonter l'arborescence depuis la racine web déclarée vers des fichiers de configuration internes.",
    automation:
      "Script Python générant le chemin encodé ciblé, vérifiant la réponse HTTP, puis extrayant automatiquement tout indice pertinent trouvé dans le fichier de configuration retrouvé via une expression régulière.",
    remediation:
      "Isoler strictement la racine documentaire, désactiver toute résolution de chemins relatifs côté serveur, et faire tourner Nginx avec des permissions minimales pour limiter ce qui reste lisible même en cas de sortie de périmètre.",
    snippet: {
      label: "Logique générale (extrait, non fonctionnel)",
      code: `payload = "../../<fichier_config>"
url = BASE + "/" + urllib.parse.quote(payload, safe="/")
r = session.get(url)
# un chemin encodé peut contourner la normalisation`,
    },
  },
];
