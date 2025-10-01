import { Button } from "@/components/ui/button";
import { HardDrive, Shield, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              FileDrive
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/shared">
              <Button variant="outline">Accéder à un fichier partagé</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Vos fichiers, <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Sécurisés</span> et <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Partagés</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stockez, gérez et partagez vos fichiers en toute sécurité avec des codes d&apos;accès temporaires. Simple, rapide et fiable.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity">
                Commencer
              </Button>
            </Link>
            <Link to="/shared">
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Accéder à un fichier partagé
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Stockage sécurisé</h3>
              <p className="text-muted-foreground">
                Vos fichiers sont stockés en toute sécurité avec un chiffrement et une protection conformes aux normes de l&apos;industrie.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Partage facile</h3>
              <p className="text-muted-foreground">
                Générez des codes uniques pour partager des fichiers avec n&apos;importe qui, aucun compte requis.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Accès limité dans le temps</h3>
              <p className="text-muted-foreground">
                Définissez des dates d&apos;expiration pour les fichiers partagés afin de garder le contrôle sur votre contenu.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
