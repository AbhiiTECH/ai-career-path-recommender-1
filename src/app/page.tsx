"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CareerChatbot from "@/components/CareerChatbot";
import Navbar from "@/components/Navbar";
import { Brain, Target, Users, Zap, ArrowRight, TrendingUp, Sparkles, CheckCircle, BarChart, Shield } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your unique profile to provide accurate career matches"
    },
    {
      icon: Target,
      title: "Personalized Matches",
      description: "Get tailored career recommendations based on your interests, skills, and personality traits"
    },
    {
      icon: BarChart,
      title: "Match Scoring",
      description: "See detailed match percentages and understand why each career path suits you"
    },
    {
      icon: Shield,
      title: "Expert Insights",
      description: "Access comprehensive career information including required skills and growth potential"
    }
  ];

  const stats = [
    { value: "10+", label: "AI Career Paths" },
    { value: "95%", label: "Match Accuracy" },
    { value: "1000+", label: "Students Helped" },
    { value: "3", label: "Top Recommendations" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="bg-white border-b pt-16">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Discover Your AI Career Path
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Find Your Perfect
              <span className="text-primary block mt-2">AI Career Match</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leverage AI technology to discover personalized career recommendations based on your unique skills, interests, and personality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={() => scrollToSection("chatbot")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("features")}
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-accent rounded-full px-10 h-14 text-lg font-semibold"
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help you make informed career decisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover-card bg-card border text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Objective Section */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                The Challenge We Solve
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Addressing the real problems students face in AI career planning
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-card bg-card border">
                <CardHeader>
                  <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-destructive" />
                  </div>
                  <CardTitle className="text-2xl text-card-foreground">The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                    Students struggle to navigate the complex AI career landscape due to:
                  </CardDescription>
                  <ul className="space-y-3">
                    {[
                      "Lack of personalized career guidance",
                      "Overwhelming number of AI specializations",
                      "Unclear career progression paths",
                      "Difficulty matching skills to opportunities"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-card-foreground">
                        <div className="w-5 h-5 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-destructive rounded-full" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-card bg-card border">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-card-foreground">Our Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                    An intelligent AI chatbot that provides:
                  </CardDescription>
                  <ul className="space-y-3">
                    {[
                      "Deep analysis of interests and skills",
                      "Personality trait evaluation",
                      "Smart career path matching",
                      "Top 3 personalized recommendations"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-card-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* System Flow Section */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A simple three-step process to discover your ideal AI career
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  step: "Step 1",
                  title: "Share Your Profile",
                  description: "Tell us about your interests, technical skills, and personality traits through our interactive chatbot"
                },
                {
                  icon: Brain,
                  step: "Step 2",
                  title: "AI Analysis",
                  description: "Our advanced AI algorithms analyze your profile and match it with the best career paths in the AI field"
                },
                {
                  icon: TrendingUp,
                  step: "Step 3",
                  title: "Get Recommendations",
                  description: "Receive your top 3 personalized career matches with detailed insights, match scores, and required skills"
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="hover-card bg-card border text-center h-full">
                    <CardHeader>
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <item.icon className="w-10 h-10 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto left-0 right-0">
                          {index + 1}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-primary mb-2">{item.step}</div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Demo Section */}
      <section id="chatbot" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Start Your Career Discovery
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chat with our AI advisor and get personalized career recommendations in minutes
              </p>
            </div>

            <div className="animate-fade-in-up">
              <CareerChatbot />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">AI Career Advisor</span>
              </div>
              <p className="text-muted-foreground">
                Empowering students to make informed career decisions in the AI industry through intelligent recommendations.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                {["Home", "Features", "How It Works", "Try Now"].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item === "Try Now" ? "chatbot" : item.toLowerCase().replace(/\s+/g, "-"))}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">About</h3>
              <p className="text-muted-foreground text-sm">
                This AI Career Path Recommender System helps students navigate their career journey in artificial intelligence with personalized guidance.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center">
            <p className="text-muted-foreground">
              © 2025 AI Career Path Recommender | Designed by Abhishek Kumar and Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}