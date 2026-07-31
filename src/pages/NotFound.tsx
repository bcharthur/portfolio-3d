import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 : tentative d'accès à une route inexistante :", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">Erreur 404</p>
      <h1 className="mb-6 text-6xl font-bold tracking-tight text-foreground md:text-8xl">
        Page introuvable
      </h1>
      <p className="mb-10 max-w-md text-base text-muted-foreground md:text-lg">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <a
        href={import.meta.env.BASE_URL}
        className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-lg font-semibold text-background transition-opacity hover:opacity-90"
      >
        Retour à l'accueil
        <ArrowUpRight size={18} />
      </a>
    </div>
  );
};

export default NotFound;
