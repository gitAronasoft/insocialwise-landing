import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SocialShare() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = "🚀 Just found insocialwise - FREE social media management for 1 YEAR! Only 100 spots available. Perfect for managing Instagram, Facebook, Twitter & more from one dashboard. Get yours before they're gone!";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share it with your friends and colleagues",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually",
        variant: "destructive",
      });
    }
  };

  const socialShares = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-600"
    },
    {
      name: "Facebook", 
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-700"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-50 hover:text-blue-800"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Help us spread the word!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Share with friends who need social media management
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {socialShares.map((social) => (
          <Button
            key={social.name}
            variant="outline"
            size="sm"
            className={`${social.color} transition-colors duration-200`}
            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
          >
            <social.icon className="h-4 w-4 mr-2" />
            {social.name}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800 transition-colors duration-200"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          💡 <strong>Earn rewards:</strong> For every 3 friends who sign up through your share, get an extra month free when we launch!
        </p>
      </div>
    </div>
  );
}