"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@/app/context/WalletContext";
import Navbar from "@/app/components/Navbar";
import MilestoneCard from "@/app/components/MilestoneCard";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

// Mock data for demonstration
const mockJob = {
  id: "C...",
  client: "G...Client",
  freelancer: "G...Freelancer",
  arbiter: "G...Arbiter",
  funded: true,
  milestones: [
    { index: 0, amount: "30000000", status: "Released" },
    { index: 1, amount: "70000000", status: "Delivered" },
  ],
};

export default function Dashboard() {
  const { address } = useWallet();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<typeof mockJob | null>(mockJob);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isClient = !!address?.startsWith("G...Client");
  const isFreelancer = !!address?.startsWith("G...Freelancer");

  const handleMarkDelivered = async (i: number) => {
    setLoading(true);
    try {
      alert(`Mark milestone ${i + 1} delivered (wired to contract soon)`);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (i: number) => {
    setLoading(true);
    try {
      alert(`Approve milestone ${i + 1} (wired to contract soon)`);
    } finally {
      setLoading(false);
    }
  };

  const handleDispute = async (i: number) => {
    setLoading(true);
    try {
      alert(`Dispute milestone ${i + 1} (wired to contract soon)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Job Dashboard</h1>
        {!address ? (
          <p className="text-center text-gray-500">Connect your wallet to view your jobs</p>
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-8">
            <div className="border border-gray-800 rounded-xl bg-gray-900 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-lg">Job #{job?.id.slice(0, 8)}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {job?.funded ? "✅ Funded" : "🔒 Not funded"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400">Client</p>
                  <p className="font-mono">{job?.client}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400">Freelancer</p>
                  <p className="font-mono">{job?.freelancer}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400">Arbiter</p>
                  <p className="font-mono">{job?.arbiter}</p>
                </div>
              </div>
              <div className="space-y-4">
                {job?.milestones.map((m) => (
                  <MilestoneCard
                    key={m.index}
                    milestone={m}
                    isClient={isClient}
                    isFreelancer={isFreelancer}
                    onMarkDelivered={handleMarkDelivered}
                    onApprove={handleApprove}
                    onDispute={handleDispute}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
