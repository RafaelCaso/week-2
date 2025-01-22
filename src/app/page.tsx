"use client";

import { useState } from "react";
import { Project } from "@/agents/types";

export default function Home() {
  const [submissions, setSubmissions] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      // call agent coordinator
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Hackathon Judges Table</h1>
    </main>
  );
}
