"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send, CheckCircle2, TrendingUp } from "lucide-react";

interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  keySkills: string[];
}

interface ChatMessage {
  type: "user" | "bot" | "results";
  content: string;
  recommendations?: CareerRecommendation[];
}

export default function CareerChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      content: "Welcome! I'm your AI Career Path Advisor. Share your interests, skills, and personality traits to get personalized career recommendations.",
    },
  ]);
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [personality, setPersonality] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!interests.trim() || !skills.trim() || !personality.trim()) {
      return;
    }

    // Add user message
    const userMessage = `Interests: ${interests}\nSkills: ${skills}\nPersonality: ${personality}`;
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);

    setLoading(true);

    try {
      const response = await fetch("/api/career-recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests,
          skills,
          personality,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            type: "results",
            content: data.message,
            recommendations: data.recommendations,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Sorry, I couldn't process your request. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "An error occurred. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setInterests("");
      setSkills("");
      setPersonality("");
    }
  };

  const handleReset = () => {
    setMessages([
      {
        type: "bot",
        content: "Welcome! I'm your AI Career Path Advisor. Share your interests, skills, and personality traits to get personalized career recommendations.",
      },
    ]);
    setInterests("");
    setSkills("");
    setPersonality("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Chat Messages */}
      <div className="space-y-4 min-h-[300px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } animate-fade-in-up`}
          >
            {message.type === "results" && message.recommendations ? (
              <div className="w-full space-y-4">
                <Card className="bg-primary text-primary-foreground border-0 shadow-sm">
                  <CardContent className="p-4">
                    <p className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
                <div className="grid gap-4">
                  {message.recommendations.map((rec, recIndex) => (
                    <Card
                      key={recIndex}
                      className="hover-card bg-card border shadow-sm"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-card-foreground">
                              {rec.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-muted-foreground">
                              {rec.description}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-2xl font-bold">{rec.matchScore}%</span>
                            <span className="text-xs">Match</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-card-foreground">Key Skills Required:</p>
                          <div className="flex flex-wrap gap-2">
                            {rec.keySkills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium border"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-accent rounded-full"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <Card
                className={`max-w-[80%] shadow-sm border ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-card text-card-foreground"
                }`}
              >
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-fade-in-up">
            <Card className="bg-card border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Analyzing your profile...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Input Form */}
      {!loading && messages[messages.length - 1]?.type !== "results" && (
        <Card className="bg-card border shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Your Interests in AI <span className="text-destructive">*</span>
                </label>
                <Textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., machine learning, data analysis, computer vision, natural language processing..."
                  className="resize-none bg-background"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Your Technical Skills <span className="text-destructive">*</span>
                </label>
                <Textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., Python, TensorFlow, statistics, programming, mathematics..."
                  className="resize-none bg-background"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">
                  Your Personality Traits <span className="text-destructive">*</span>
                </label>
                <Input
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="e.g., analytical, creative, problem-solver, team player..."
                  className="bg-background"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-11 font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}