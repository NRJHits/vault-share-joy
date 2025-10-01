import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Share2 } from "lucide-react";
import { FileItem } from "@/pages/Dashboard";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string | null;
  files: FileItem[];
}

const ShareModal = ({ isOpen, onClose, fileId, files }: ShareModalProps) => {
  const [expirationDate, setExpirationDate] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const generateShareCode = () => {
    if (!expirationDate) {
      toast.error("Veuillez sélectionner une date d'expiration");
      return;
    }

    const expDate = new Date(expirationDate);
    if (expDate <= new Date()) {
      toast.error("La date d'expiration doit être dans le futur");
      return;
    }

    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setShareCode(code);
    setIsGenerated(true);

    const sharedFiles = JSON.parse(localStorage.getItem("sharedFiles") || "[]");
    sharedFiles.push({
      code,
      fileId: file.id,
      fileName: file.name,
      expiresAt: expDate.toISOString(),
    });
    localStorage.setItem("sharedFiles", JSON.stringify(sharedFiles));

    toast.success("Code de partage généré !");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareCode);
    toast.success("Code copié dans le presse-papiers !");
  };

  const handleClose = () => {
    setShareCode("");
    setIsGenerated(false);
    setExpirationDate("");
    onClose();
  };

  const file = files.find((f) => f.id === fileId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Partager un fichier
          </DialogTitle>
          <DialogDescription>
            Générer un code de partage pour : <span className="font-semibold">{file?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!isGenerated ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="expiration">Date et heure d&apos;expiration</Label>
                <Input
                  id="expiration"
                  type="datetime-local"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <Button 
                onClick={generateShareCode} 
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
              >
                Générer un code de partage
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Code de partage</Label>
                <div className="flex gap-2">
                  <Input
                    value={shareCode}
                    readOnly
                    className="font-mono text-lg tracking-wider text-center bg-muted"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Expire le : {new Date(expirationDate).toLocaleDateString("fr-FR")} à {new Date(expirationDate).toLocaleTimeString("fr-FR")}
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium">Partagez ce code</p>
                <p className="text-xs text-muted-foreground">
                  Les destinataires peuvent accéder à ce fichier sur <span className="font-mono">/shared</span> en utilisant ce code jusqu&apos;à son expiration.
                </p>
              </div>

              <Button onClick={handleClose} variant="outline" className="w-full">
                Fermer
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
