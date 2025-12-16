import { Download, Laptop, Monitor, Smartphone, Terminal, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from '@/components/ui/glowing-stars'

interface DownloadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface DownloadOption {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  downloadUrl?: string
  available: boolean
}

const downloadOptions: DownloadOption[] = [
  {
    id: 'macos',
    name: 'macOS',
    description: 'DMG installer',
    icon: Laptop,
    downloadUrl: 'https://drive.google.com/file/d/1T-mc2wtlbZeYisgb3uFDrehaksPAkYWc/view?usp=drive_link',
    available: true,
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'Coming soon',
    icon: Monitor,
    available: false,
  },
  {
    id: 'ios',
    name: 'iOS',
    description: 'Coming soon',
    icon: Smartphone,
    available: false,
  },
  {
    id: 'android',
    name: 'Android',
    description: 'Coming soon',
    icon: Smartphone,
    available: false,
  },
  {
    id: 'linux',
    name: 'Linux',
    description: 'Coming soon',
    icon: Terminal,
    available: false,
  },
]

export function DownloadDialog({ open, onOpenChange }: DownloadDialogProps) {
  const handleDownload = (option: DownloadOption) => {
    if (option.available && option.downloadUrl) {
      window.open(option.downloadUrl, '_blank')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden h-auto">
        <div className="flex flex-col sm:flex-row h-full min-h-[500px]">
          {/* Left Section - Main Content */}
          <div className="flex-1 p-6 sm:p-8">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <DialogTitle className="text-2xl">Download EkiliSync</DialogTitle>
              </div>
              <DialogDescription className="text-base">
                Choose your platform to download the EkiliSync application.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-3 py-6">
              {downloadOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.id}
                    className={`w-full justify-start h-auto py-4 px-4 transition-all duration-200 ${
                      !option.available
                        ? 'opacity-50 cursor-not-allowed hover:scale-[1.02]'
                        : 'hover:scale-[1.02] hover:shadow-lg'
                    }`}
                    variant={option.available ? 'default' : 'outline'}
                    disabled={!option.available}
                    onClick={() => handleDownload(option)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 rounded-lg bg-background/50">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-base">{option.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                      {option.available ? (
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-sm font-medium text-white">Download</span>
                          <Download className="size-4 text-white" />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Coming Soon</span>
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Requires macOS 12.0 or later. Intel or Apple Silicon.</p>
            </div>
          </div>
          
          {/* Right Section - Glowing Card */}
          <div className="w-full sm:w-80 flex-shrink-0 border-t sm:border-t-0 sm:border-l h-full min-h-[500px]">
            <GlowingStarsBackgroundCard className="h-full w-full max-w-none max-h-none rounded-md border-0">
              <div className="flex flex-col h-full justify-between p-6">
                <div>
                  <GlowingStarsTitle className="text-xl mb-4">
                     ekilie
                  </GlowingStarsTitle>
                  <GlowingStarsDescription className="text-sm">
                  Smart attendance tracking that works automatically. Streamline your workforce management with location-based technology.
                  </GlowingStarsDescription>
                </div>
                
                
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}