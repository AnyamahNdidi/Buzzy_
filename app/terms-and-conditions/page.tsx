import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"

export const metadata = {
  title: "Terms & Conditions - Buzzycash Ghana",
  description: "Read our Terms and Conditions for Buzzycash Ghana gaming platform",
}

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">Terms &amp; Conditions</h1>
          <p className="text-lg text-slate-300">
            Please read these Terms and Conditions carefully before using Buzzycash Ghana
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-12">
          <p className="text-slate-200">
            By continuing to use Buzzycash Ghana through our USSD service{" "}
            <span className="font-bold text-amber-400">*245#</span>, you acknowledge that you have read, understood, and
            agreed to these Terms and Conditions.
          </p>
        </div>

        {/* Accordion Content */}
        <Accordion type="single" collapsible className="space-y-2">
          {/* Introduction */}
          <AccordionItem value="introduction">
            <AccordionTrigger className="text-lg font-semibold text-white hover:text-amber-400">
              I. Introduction
            </AccordionTrigger>
            <AccordionContent className="text-slate-300 space-y-4">
              <p>
                These Terms and Conditions ("Terms" or "T&C") govern your use of the gaming and entertainment services
                provided by Buzzycash Ghana, a duly registered company operating under the laws of the Republic of
                Ghana.
              </p>
              <p>Buzzycash Ghana offers instant win games and promotional draws through channel USSD (*245#).</p>
              <p className="font-semibold text-white">
                By accessing or registering on the Buzzycash platform, you agree to be bound by the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>The General Terms and Conditions</li>
                <li>The Game Rules for each available game (Ghana Jollof, Gold Mine, and TroTro)</li>
                <li>The Privacy Policy</li>
              </ul>
              <p>
                These Terms constitute the complete and binding agreement between you ("the Player" or "User") and
                Buzzycash ("the Company"). By participating in any game, promotion, or transaction, you confirm your
                acceptance of these Terms in full.
              </p>
              <p>
                Buzzycash Ghana operates with fairness, transparency, and cultural integrity. All games are designed for
                entertainment purposes and are subject to Ghanaian gaming regulations.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* General Terms and Conditions */}
          <AccordionItem value="general-terms">
            <AccordionTrigger className="text-lg font-semibold text-white hover:text-amber-400">
              II. General Terms and Conditions
            </AccordionTrigger>
            <AccordionContent className="text-slate-300 space-y-6">
              {/* Acceptance of Terms */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.1 Acceptance of Terms</h4>
                <p>
                  By dialing *245# and playing any game on Buzzycash Ghana, you agree to these Terms and Conditions
                  ("Terms"). If you do not accept them, please discontinue use of the Service.
                </p>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.2 Eligibility</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>You must be 18 years or older and a resident of Ghana</li>
                  <li>You must have a valid mobile number registered in your name</li>
                  <li>
                    Employees of Buzzycash Ghana and its partners, as well as their immediate family members, are not
                    eligible to participate for cash prizes
                  </li>
                </ul>
              </div>

              {/* Channel of Access */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.3 Channel of Access</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>All Buzzycash Ghana games are available only via USSD *245#</li>
                  <li>No web, app, or SMS betting channels are currently offered</li>
                </ul>
              </div>

              {/* Account & Wallet Funding */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.4 Account &amp; Wallet Funding</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Players can fund their Buzzycash wallet through Mobile Money (MoMo) integrations displayed within
                    the USSD menu
                  </li>
                  <li>All deposits are non-transferable and can be used only for Buzzycash game participation</li>
                </ul>
              </div>

              {/* Game Play & Results */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.5 Game Play &amp; Results</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Every game is chance-based. Outcomes are randomly generated and final</li>
                  <li>Buzzycash Ghana maintains transparency and fairness in all draws</li>
                  <li>Winnings are credited instantly to your MoMo wallet or in-game wallet</li>
                </ul>
              </div>

              {/* Payouts */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.6 Payouts</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Cash prizes are processed automatically via MoMo</li>
                  <li>
                    Buzzycash Ghana bears no responsibility for errors caused by incorrect phone numbers or mobile
                    wallet details provided by players
                  </li>
                </ul>
              </div>

              {/* Responsible Gaming */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.7 Responsible Gaming</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Play responsibly. We encourage moderation and fun</li>
                  <li>If you suspect gaming addiction, contact our support team for assistance</li>
                </ul>
              </div>

              {/* Amendments */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.8 Amendments</h4>
                <p>
                  Buzzycash Ghana reserves the right to amend these Terms at any time. Updated versions take effect
                  immediately upon publication.
                </p>
              </div>

              {/* Governing Law */}
              <div>
                <h4 className="font-semibold text-white mb-2">2.9 Governing Law</h4>
                <p>
                  These Terms are governed by the laws of the Republic of Ghana and subject to the jurisdiction of
                  Ghanaian courts.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Game Rules */}
          <AccordionItem value="game-rules">
            <AccordionTrigger className="text-lg font-semibold text-white hover:text-amber-400">
              III. Game Rules
            </AccordionTrigger>
            <AccordionContent className="text-slate-300 space-y-6">
              <p className="text-white font-semibold">
                Each Buzzycash game follows simple, fair, and transparent mechanics.
              </p>

              {/* Ghana Jollof */}
              <div>
                <h4 className="font-semibold text-white mb-3">3.1 Ghana Jollof – The Secret Ingredient Game</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-amber-400">Concept:</p>
                    <p className="mt-1">
                      Players compete in a fun jollof rice cook-off. They are given four ingredient options, one of
                      which is a secret winning ingredient. The system acts as the judge – if the player picks the right
                      ingredient, they win instantly.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">How to Play:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mt-1">
                      <li>Dial *245# and select Ghana Jollof</li>
                      <li>Choose an ingredient option (1–4)</li>
                      <li>If you pick the secret ingredient you win instantly</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Eligibility:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Must be 18 years or older</li>
                      <li>Must be a resident of Ghana</li>
                      <li>
                        Employees of Buzzycash, immediate family members of employees, agents, and anyone involved in
                        operating or administering the game are not eligible to participate
                      </li>
                      <li>Each player may hold one (1) account only; multiple accounts are prohibited</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Terms:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Minimum play amount: ₵2.00</li>
                      <li>Outcomes are determined by an automated, randomised system</li>
                      <li>Winners are credited instantly to the player's wallet</li>
                      <li>Players may participate multiple times, subject to daily limits applied by Buzzycash</li>
                      <li>
                        All wins are final once confirmed by the system; any disputes will be handled by Buzzycash
                        following our dispute resolution process
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gold Mine */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-semibold text-white mb-3">3.2 Gold Mine</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-amber-400">Description:</p>
                    <p className="mt-1">
                      Gold Mine is a treasure-hunt instant game built around Ghana's gold heritage. Players enter a
                      virtual gold mine. They must dig through the options, avoiding rocks and fake gold.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">How to Play:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mt-1">
                      <li>Dial *245# → Select Gold Mine</li>
                      <li>Start digging by choosing a level</li>
                      <li>You may cash out anytime or keep digging for bigger rewards</li>
                      <li>If the mine collapses, the round ends</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Eligibility:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Must be 18 years or older</li>
                      <li>Must be a resident of Ghana</li>
                      <li>
                        Employees of Buzzycash, their immediate family members, agents, and platform operators are not
                        eligible to participate
                      </li>
                      <li>Only one (1) account per person. Accounts found to be duplicated will be suspended</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Terms:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Minimum play amount: ₵5.00</li>
                      <li>Each dig reveals a random outcome based on the platform's probability model</li>
                      <li>
                        Players may choose to cash out at any time unless otherwise restricted by promotional rules
                      </li>
                      <li>
                        Prize tiers, multipliers, and odds may be adjusted for promotions; changes will be communicated
                        in-app or via official channels
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TroTro */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-semibold text-white mb-3">3.3 TroTro</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-amber-400">Description:</p>
                    <p className="mt-1">
                      A route-based game inspired by the trotro experience, players select routes/stops and can cash out
                      along the way or ride on for higher rewards.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">How to Play:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 mt-1">
                      <li>Dial *245# → Select TroTro</li>
                      <li>Choose your route and board the bus</li>
                      <li>At every stop, decide to cash out or continue the ride</li>
                      <li>Reach your destination, you win the full prize</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Eligibility:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Must be 18 years or older</li>
                      <li>Must be a resident of Ghana</li>
                      <li>
                        Directors, officers, employees of Buzzycash, their immediate family members, agents, and anyone
                        directly involved in the game's administration are not eligible
                      </li>
                      <li>
                        One (1) account per person only. Breach may result in suspension and forfeiture of winnings
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">Terms:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>Minimum play amount: ₵3.00</li>
                      <li>Each route selection is an independent chance-based event; results are instant</li>
                      <li>Bonus trips, multipliers or special rounds may be run at Buzzycash's discretion</li>
                      <li>Players may cash out as allowed by the game; once a cashout is processed it is final</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Privacy Policy */}
          <AccordionItem value="privacy-policy">
            <AccordionTrigger className="text-lg font-semibold text-white hover:text-amber-400">
              IV. Privacy Policy
            </AccordionTrigger>
            <AccordionContent className="text-slate-300 space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-2">4.1 Information Collected</h4>
                <p>
                  Buzzycash Ghana collects minimal information: mobile number, transaction records, and game activity.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">4.2 Purpose of Data Collection</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>To enable gameplay via *245#</li>
                  <li>To process winnings through MoMo</li>
                  <li>To monitor fraud and ensure fair play</li>
                  <li>To send legitimate promotional messages (opt-out available)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">4.3 Data Security</h4>
                <p>
                  All user data is stored securely and never shared with third parties except regulatory authorities
                  when legally required.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">4.4 User Rights</h4>
                <p>Players may request correction or deletion of their personal data at any time.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Updates & Changes */}
          <AccordionItem value="updates">
            <AccordionTrigger className="text-lg font-semibold text-white hover:text-amber-400">
              V. Updates &amp; Changes to Terms
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              <p>
                Buzzycash Ghana reserves the right to review or update these Terms and Conditions at any time. Updates
                will take effect immediately upon publication on our website or platform.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Footer CTA */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-300 mb-6">
              By using Buzzycash Ghana, you confirm that you have read and agree to these Terms and Conditions.
            </p>
            <Link
              href="/"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500 text-sm">
        <p>Last Updated: November 2024</p>
      </div>
    </main>
  )
}
