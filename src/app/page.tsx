"use client";

import { useState } from "react";
import { Project, ConsensusResult } from "@/agents/types";
import { AgentCoordinator } from "@/agents/coordinator";

export default function Home() {
  const [submissions, setSubmissions] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<ConsensusResult[]>(
    []
  );
  const [formData, setFormData] = useState<Omit<Project, "submission_time">>({
    address: "",
    network: "",
    project_url: "",
    github_url: "",
    demo_url: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.address || !formData.project_url || !formData.github_url) {
      setError("Please fill in all required fields");
      return;
    }

    const existingSubmission = submissions.find(
      (sub) => sub.address.toLowerCase() === formData.address.toLowerCase()
    );

    if (existingSubmission) {
      setSubmissions(
        submissions.map((sub) =>
          sub.address.toLowerCase() === formData.address.toLowerCase()
            ? { ...formData, submission_time: new Date() }
            : sub
        )
      );
    } else {
      setSubmissions([
        ...submissions,
        { ...formData, submission_time: new Date() },
      ]);
    }

    setFormData({
      address: "",
      network: "",
      project_url: "",
      github_url: "",
      demo_url: "",
    });
  };

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissions),
      });

      const { results, explanation } = await response.json();
      if (!response.ok) throw new Error(results.error);

      setEvaluationResults(results);
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Evaluation failed:", error);
      alert("Failed to evaluate submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hackathon Judges Table</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Wallet Address *
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="0x..."
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Network
            <input
              type="text"
              value={formData.network}
              onChange={(e) =>
                setFormData({ ...formData, network: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter network name"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Project URL *
            <input
              type="url"
              value={formData.project_url}
              onChange={(e) =>
                setFormData({ ...formData, project_url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="https://..."
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            GitHub URL *
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) =>
                setFormData({ ...formData, github_url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="https://github.com/..."
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Demo URL
            <input
              type="url"
              value={formData.demo_url}
              onChange={(e) =>
                setFormData({ ...formData, demo_url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="https://youtube.com/..."
            />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Submissions ({submissions.length})
          </h2>
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div
                key={submission.address + submission.submission_time?.getTime()}
                className="border rounded p-4"
              >
                <p className="font-bold">Submission #{index + 1}</p>
                <p>Address: {submission.address}</p>
                <p>Network: {submission.network}</p>
                <p>
                  Project:{" "}
                  <a
                    href={submission.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {submission.project_url}
                  </a>
                </p>
                <p>Submitted: {submission.submission_time?.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleEvaluate}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Evaluating..." : "Evaluate All Submissions"}
          </button>
        </div>
      )}

      {evaluationResults.length > 0 && (
        <div id="results" className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Evaluation Results</h2>
          <div className="space-y-6">
            {evaluationResults.map((result) => (
              <div
                key={result.project.address}
                className="border rounded-lg p-6 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Rank #{result.rank} - Score: {result.final_score}
                  </h3>
                  <span className="text-gray-500">
                    {result.project.network}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Project Details</h4>
                    <p>Address: {result.project.address}</p>
                    <p>
                      Project:{" "}
                      <a
                        href={result.project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Project
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Consensus Evaluation</h4>
                    <p className="text-gray-700 mb-2">{result.reasoning}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Key Strengths</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {result.unified_strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Areas for Improvement</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {result.unified_improvements.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">
                    Individual Agent Evaluations
                  </h4>
                  <div className="space-y-2">
                    {result.evaluations.map((evaluation, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">
                          {evaluation.agent_name} - Score: {evaluation.score}
                        </p>
                        <p className="text-gray-600">{evaluation.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
