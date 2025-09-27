"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"
import { PoolsContent } from "@/components/pools-content"
import { ProfileContent } from "@/components/profile-content"
import { Toaster } from "@/components/ui/toaster"

export default function Dashboard() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [activeSection, setActiveSection] = useState("pools")

  useEffect(() => {
    // Show wallet modal on page load
    setShowWalletModal(true)
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case "pools":
        return <PoolsContent />
      case "swaps":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Swaps</h2>
            <p className="text-muted-foreground">Swap functionality coming soon...</p>
          </div>
        )
      case "dex":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">DEX</h2>
            <p className="text-muted-foreground">DEX functionality coming soon...</p>
          </div>
        )
      case "for-you":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">For You</h2>
            <p className="text-muted-foreground">Personalized recommendations coming soon...</p>
          </div>
        )
      case "verify":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Verify</h2>
            <p className="text-muted-foreground">Verification functionality coming soon...</p>
          </div>
        )
      case "profile":
        return <ProfileContent />
      default:
        return <PoolsContent />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
      <ConnectWalletModal open={showWalletModal} onOpenChange={setShowWalletModal} />
      <Toaster />
    </div>
  )
}
