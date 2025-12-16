import { Download, Laptop, Monitor, Smartphone, Terminal, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import AppLogo from '@/components/app-logo'

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
      <DialogContent className="sm:max-w-5xl p-0 overflow-hidden h-auto">
        <div className="flex flex-col sm:flex-row h-full min-h-[550px]">
          {/* Left Section - Main Content */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col">
            <DialogHeader className="text-left mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Download EkiliSync
                </DialogTitle>
              </div>
              <DialogDescription className="text-base text-muted-foreground">
                Choose your platform to download the EkiliSync application and get started today.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-3 flex-1">
              {downloadOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.id}
                    className={`w-full justify-start h-auto py-5 px-5 transition-all duration-300 group ${
                      !option.available
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20'
                    }`}
                    variant={option.available ? 'default' : 'outline'}
                    disabled={!option.available}
                    onClick={() => handleDownload(option)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        option.available 
                          ? 'bg-primary/20 group-hover:bg-primary/30' 
                          : 'bg-muted'
                      }`}>
                        <Icon className={`size-6 ${
                          option.available ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-base">{option.name}</span>
                          {option.available && (
                            <Badge variant="secondary" className="text-xs px-2 py-0">
                              Available
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                      {option.available ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <span className="text-sm font-medium">Download</span>
                          <Download className="size-4" />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">Coming Soon</span>
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t flex items-start gap-3">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">System Requirements</p>
                <p className="text-xs text-muted-foreground">
                  macOS 12.0 or later. Compatible with Intel and Apple Silicon processors.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section - Glowing Card */}
          <div className="w-full sm:w-96 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-border/50 h-full min-h-[550px] relative overflow-hidden">
            <GlowingStarsBackgroundCard className="h-full w-full max-w-none max-h-none rounded-none border-0">
              <div className="flex flex-col h-full justify-center p-8 relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <AppLogo/>
                    <span className="text-xl text-white/90">ekilie</span>
                  </div>
                  <GlowingStarsTitle className="text-2xl mb-4 leading-tight">
                    Smart Attendance Tracking
                  </GlowingStarsTitle>
                  <GlowingStarsDescription className="text-base leading-relaxed">
                    Smart attendance tracking that works automatically. Streamline your workforce management with location-based technology.
                  </GlowingStarsDescription>
                </div>
                
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="p-1.5 rounded-lg bg-white/10">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Automatic location-based tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="p-1.5 rounded-lg bg-white/10">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Real-time synchronization</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="p-1.5 rounded-lg bg-white/10">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Secure and reliable</span>
                  </div>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}