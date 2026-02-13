
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms & Conditions - Buzzycash Ghana",
  description: "Read our Terms and Conditions for Buzzycash Ghana gaming platform",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg text-muted-foreground">
                Effective Date: [To be confirmed]
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <p className="mb-8">
              These Terms and Conditions ("Terms") govern participation in BuzzyCash, including all games available
              on the platform and the Monthly Jackpot Draw. By accessing or playing any BuzzyCash game, you
              agree to be bound by these Terms.
            </p>

            <Accordion type="single" collapsible className="space-y-2">
              {/* 1. About BuzzyCash */}
              <AccordionItem value="about">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  1. About BuzzyCash
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>
                    BuzzyCash is a mobile-based promotional gaming platform accessible via USSD. It offers players the
                    opportunity to play games for entertainment, win instant prizes, and qualify for monthly jackpot
                    draws, subject to these Terms and applicable laws and regulations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 2. Eligibility */}
              <AccordionItem value="eligibility">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  2. Eligibility
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>Participation is open to individuals who:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Are 18 years and above</li>
                    <li>Use a valid and registered mobile number</li>
                    <li>Are legally permitted to participate under applicable laws</li>
                  </ul>
                  <p>
                    Employees, agents, and contractors directly involved in the administration of BuzzyCash may be
                    restricted from participating in jackpot draws.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 3. How to Play */}
              <AccordionItem value="how-to-play">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  3. How to Play BuzzyCash
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Dial *245# on your mobile phone</li>
                    <li>Select BuzzyCash from the menu</li>
                    <li>Choose a game (including but not limited to Trotro, Jollof, and Gold Mine)</li>
                    <li>Confirm participation and play the game</li>
                    <li>Receive instant results and, where applicable, automatic entry into the Monthly Jackpot Draw</li>
                  </ol>
                  <p>
                    BuzzyCash may be accessed via USSD, web platforms, mobile applications, and approved third-
                    party channels including Telegram. Access method availability may vary by device, network, or
                    location, and internet connection may be required for certain access channels.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 4. Gameplay & Instant Wins */}
              <AccordionItem value="gameplay">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  4. Gameplay & Instant Wins
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>Each valid play may result in:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>An instant win, or</li>
                    <li>A non-winning outcome</li>
                  </ul>
                  <p>
                    Instant wins, where applicable, are communicated immediately after gameplay.
                    The type, value, and frequency of instant prizes may vary and are determined by BuzzyCash at its
                    discretion.
                  </p>
                  <p className="font-semibold">
                    Game outcomes are final and cannot be reversed once confirmed.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 5. Monthly Jackpot Draw */}
              <AccordionItem value="jackpot">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  5. Monthly Jackpot Draw
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground">5.1 Jackpot Structure</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Total Monthly Jackpot: ₵50,000 (unless otherwise communicated)</li>
                      <li>Number of Winners: 5 (unless otherwise communicated)</li>
                      <li>Prize per Winner: ₵10,000 (subject to change based on jackpot structure)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">5.2 Draw Dates & Modifications</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>The Monthly Jackpot Draw is ordinarily conducted on the 30th of every month</li>
                      <li>February Draw: Ordinarily conducted on the 27th</li>
                      <li>Entries typically close on the 25th of each month, unless otherwise communicated</li>
                      <li>
                        BuzzyCash reserves the right to postpone, combine, modify, or reschedule draws, including
                        combining draws across multiple months (for example, December and January), where
                        operational or strategic reasons require
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">5.3 Entry Qualification & Ticket Conditions</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Entry qualification conditions are determined solely by BuzzyCash</li>
                      <li>
                        A qualifying ticket value may be ₵1, ₵2, or any other amount, as determined and
                        communicated by BuzzyCash from time to time
                      </li>
                      <li>Every valid ticket or play within the qualifying period earns at least one entry into the Monthly Jackpot Draw</li>
                      <li>The more a player participates, the higher their number of entries</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">5.4 Draw Platform & Winner Selection</h4>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Monthly Jackpot Draws are conducted using the NLA Caritas platform or any other approved draw platform</li>
                      <li>Winners are selected through a random and transparent process</li>
                      <li>The draw process may be supervised, audited, or reviewed where required</li>
                      <li>The decision of BuzzyCash regarding the selection of winners is final and binding</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 6. Winner Notification & Prize Payment */}
              <AccordionItem value="winner-notification">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  6. Winner Notification & Prize Payment
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Winners are notified via their registered mobile numbers</li>
                    <li>Prizes are paid through approved mobile money or other authorised payment channels</li>
                    <li>Prizes are paid strictly to the mobile money wallet associated with the mobile number used to play the game</li>
                    <li>Once a prize is successfully credited to the eligible mobile money wallet, no further verification is required and the prize shall be deemed fully delivered</li>
                    <li>No forfeiture applies once prize payment has been successfully completed</li>
                    <li>BuzzyCash shall not be responsible for incorrect wallet details provided by participants</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 7. Fair Play & Responsible Participation */}
              <AccordionItem value="fair-play">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  7. Fair Play & Responsible Participation
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>BuzzyCash promotes responsible gameplay</p>
                  <p>Any attempt to manipulate, abuse, or exploit the system may result in:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Disqualification</li>
                    <li>Forfeiture of winnings</li>
                    <li>Suspension or termination of access</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 8. Charges & Fees */}
              <AccordionItem value="charges">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  8. Charges & Fees
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Network or service charges may apply to each USSD session or gameplay</li>
                    <li>Charges are determined by the mobile network operator and are borne by the player</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 9. Disqualification */}
              <AccordionItem value="disqualification">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  9. Disqualification
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>
                    BuzzyCash reserves the right to disqualify any participant who:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provides false or misleading information</li>
                    <li>Uses automated systems or fraudulent means to participate</li>
                    <li>Violates these Terms or applicable laws</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 10. Limitation of Liability */}
              <AccordionItem value="liability">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  10. Limitation of Liability
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>BuzzyCash shall not be liable for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Network failures, service interruptions, or system downtime</li>
                    <li>Delays in prize payment resulting from mobile money service errors, outages, or third-party processing issues</li>
                    <li>Delayed or failed notifications due to incorrect contact details</li>
                    <li>Losses arising from unauthorised access to a participant's mobile device</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 11. Modification or Termination */}
              <AccordionItem value="modification">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  11. Modification or Termination
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>BuzzyCash reserves the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Amend these Terms at any time</li>
                    <li>Modify, suspend, or discontinue any game or jackpot draw</li>
                  </ul>
                  <p>Continued participation after updates constitutes acceptance of revised Terms</p>
                </AccordionContent>
              </AccordionItem>

              {/* 12. Data Protection & Privacy */}
              <AccordionItem value="privacy">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  12. Data Protection & Privacy
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>Participant data is handled in accordance with applicable data protection laws</p>
                  <p>Information collected may be used for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Game administration</li>
                    <li>Winner verification and prize disbursement</li>
                    <li>
                      Marketing communications, advertisements, promotions, service updates, and
                      informational messaging related to BuzzyCash
                    </li>
                  </ul>
                  <p>
                    By participating, players consent to the use of their data for the purposes outlined above,
                    subject to applicable laws
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 13. Governing Law */}
              <AccordionItem value="governing-law">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  13. Governing Law
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <p>
                    These Terms and Conditions are governed by and construed in accordance with the laws of the
                    Republic of Ghana, irrespective of a participant's physical location at the time of participation.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 14. General */}
              <AccordionItem value="general">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  14. General
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participation in BuzzyCash constitutes full acceptance of these Terms</li>
                    <li>If any provision is found invalid, the remaining provisions shall remain enforceable</li>
                  </ul>
                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="font-semibold text-yellow-400">IMPORTANT NOTICE:</p>
                    <p>
                      BuzzyCash is a promotional gaming platform. Terms and Conditions apply. Network
                      charges may apply. Participation is subject to applicable regulatory approvals.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}