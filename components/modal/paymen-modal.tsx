"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { allPacket } from "@/app/actions/packet"

type Packet = {
  id: number;
  name: string;
  price: number;
  capacity: number;
  keteranganpacket: string[];
};

interface SubscriptionModalProps {
  userId: string | null
  isSubscribed: boolean
}

export function SubscriptionModal({ userId, isSubscribed }: SubscriptionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [packets, setPackets] = useState<Packet[]>([]);

  // Check if user is subscribed when component mounts
  useEffect(() => {
    if (userId && !isSubscribed) {
      setIsOpen(true)
    }
  }, [userId, isSubscribed])
  useEffect(() => {
    async function fetchPackets() {
      try {
        const data = await allPacket(); // Ambil data paket
        setPackets(data); // Simpan ke state
      } catch (error) {
        console.error("Gagal mengambil paket:", error);
      }
    }
    fetchPackets();
  },[])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
  };

  const handleSubscribe = (planId: number) => {
    console.log(`Subscribing to plan: ${planId}`)
    // Here you would implement your subscription logic
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Choose Your Subscription Plan</DialogTitle>
          <DialogDescription className="text-slate-300">
            Upgrade your account to access premium features and secure your passwords.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {packets.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl overflow-hidden border ${
                  "border-slate-700"
                } bg-slate-900 flex flex-col`}
              >
                <div className="p-5 flex-1">
                  <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-400 rounded-xl opacity-20"></div>
                      <div className="relative flex flex-col items-center">
                        <span className="text-3xl font-bold text-blue-500">
                          50<span className="text-lg align-top">°</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white text-center mb-2">{plan.name}</h4>
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-white">{formatCurrency(plan.price)}</span>
                    <span className="text-slate-400">/month</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.keteranganpacket.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white`}
                    variant={"default"}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-center sm:justify-center border-t border-slate-700 pt-4">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            Continue with Free Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

