import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, HardDrive, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface SharedFile {
  code: string;
  fileId: string;
  fileName: string;
  expiresAt: string;
}

const SharedAccess = () => {
  const [shareCode, setShareCode] = useState("");
  const [foundFile, setFoundFile] = useState<SharedFile | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const sharedFiles = JSON.parse(localStorage.getItem("sharedFiles") || "[]");
      const file = sharedFiles.find((sf: SharedFile) => sf.code === shareCode.toUpperCase());

      if (file) {
        const expirationDate = new Date(file.expiresAt);
        if (expirationDate > new Date()) {
          setFoundFile(file);
          toast.success("Fichier trouvé !");
        } else {
          toast.error("Ce lien de partage a expiré");
          setFoundFile(null);
        }
      } else {
        toast.error("Code de partage invalide");
        setFoundFile(null);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleDownload = () => {
    if (foundFile) {
      toast.success(`Téléchargement de ${foundFile.fileName}...`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-elevated mb-4">
            <HardDrive className="w-8 h-8 text-primary-foreground" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Accéder à un fichier partagé
          </h1>
          <p className="text-muted-foreground">Entrez votre code de partage pour récupérer le fichier</p>
        </div>

        <Card className="shadow-elevated border-border/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Récupérer un fichier</CardTitle>
            <CardDescription>
              Entrez le code à 6 caractères que vous avez reçu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Entrez le code de partage (ex: ABC123)"
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value.toUpperCase())}
                    className="pl-9 font-mono text-center text-lg tracking-wider uppercase"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                disabled={isSearching}
              >
                {isSearching ? "Recherche..." : "Trouver le fichier"}
              </Button>
            </form>

            {foundFile && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fichier trouvé :</p>
                  <p className="font-semibold text-lg">{foundFile.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    Expire le : {new Date(foundFile.expiresAt).toLocaleDateString("fr-FR")} à {new Date(foundFile.expiresAt).toLocaleTimeString("fr-FR")}
                  </p>
                </div>

                <Button 
                  onClick={handleDownload}
                  className="w-full gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le fichier
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Aller à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedAccess;
