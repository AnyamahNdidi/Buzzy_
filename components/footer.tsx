import { Trophy, Twitter, Instagram, Youtube, MessageSquare } from "lucide-react"
import GameLink from "./game-link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LottoWin</span>
            </div>
            <p className="text-muted-foreground text-sm text-pretty">
              Your trusted lottery platform for winning big. Play smart, win big, and change your life.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.tiktok.com/@buzzycashgh?is_from_webapp=1&sender_device=pc"
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Buzzycashgh?t=tBSE1Ex2a_U_SW1oHCGAXA&s=09"
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/buzzycashgh?igsh=MXA5eTBzZ2l5NzE0Yw=="
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="http://www.youtube.com/@BuzzycashGH"
                className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li> */}
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Winners
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Games</h3>
            <ul className="space-y-2">
              <li>
                <GameLink>Ghana Jollof</GameLink>
              </li>
              <li>
                <GameLink>TroTro</GameLink>
              </li>
              <li>
                <GameLink>Gold Mine</GameLink>
              </li>
              <li>
                <GameLink>JackPot</GameLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Responsible Gaming
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2026 LottoWin. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Responsible Gaming
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              18+ Only
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
