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
      toast.error("Please select an expiration date");
      return;
    }

    const expDate = new Date(expirationDate);
    if (expDate <= new Date()) {
      toast.error("Expiration date must be in the future");
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

    toast.success("Share code generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareCode);
    toast.success("Code copied to clipboard!");
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
            Share File
          </DialogTitle>
          <DialogDescription>
            Generate a share code for: <span className="font-semibold">{file?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!isGenerated ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="expiration">Expiration Date & Time</Label>
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
                Generate Share Code
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Share Code</Label>
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
                  Expires: {new Date(expirationDate).toLocaleDateString()} at {new Date(expirationDate).toLocaleTimeString()}
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium">Share this code</p>
                <p className="text-xs text-muted-foreground">
                  Recipients can access this file at <span className="font-mono">/shared</span> using this code until it expires.
                </p>
              </div>

              <Button onClick={handleClose} variant="outline" className="w-full">
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
