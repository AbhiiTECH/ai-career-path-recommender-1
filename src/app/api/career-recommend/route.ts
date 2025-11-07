import { NextRequest, NextResponse } from 'next/server';

interface CareerRecommendationInput {
  interests: string;
  skills: string;
  personality: string;
}

interface CareerOption {
  title: string;
  description: string;
  matchScore: number;
  keySkills: string[];
}

// Career database with keywords and recommendations
const careerDatabase = [
  {
    title: "Machine Learning Engineer",
    description: "Design and develop ML models and systems. Work on creating algorithms that enable computers to learn from and make predictions based on data.",
    keywords: ["machine learning", "ml", "algorithms", "models", "python", "tensorflow", "pytorch", "data", "programming", "math"],
    personality: ["analytical", "problem-solving", "detail-oriented", "logical"],
    keySkills: ["Python", "TensorFlow/PyTorch", "Algorithm Design", "Data Processing"]
  },
  {
    title: "Data Scientist",
    description: "Extract insights from complex datasets using statistical analysis and ML techniques. Bridge the gap between data and business decisions.",
    keywords: ["data", "analysis", "statistics", "visualization", "python", "r", "sql", "insights", "analytics"],
    personality: ["analytical", "curious", "communicative", "creative"],
    keySkills: ["Statistics", "Python/R", "Data Visualization", "SQL"]
  },
  {
    title: "AI Researcher",
    description: "Push the boundaries of AI through cutting-edge research. Develop novel algorithms and contribute to academic and industrial research.",
    keywords: ["research", "ai", "innovation", "algorithms", "theory", "papers", "academic", "deep learning", "neural"],
    personality: ["curious", "innovative", "patient", "persistent"],
    keySkills: ["Research Methodology", "Deep Learning", "Mathematics", "Publishing"]
  },
  {
    title: "Natural Language Processing Engineer",
    description: "Build systems that understand and generate human language. Work on chatbots, translation systems, and text analysis tools.",
    keywords: ["nlp", "language", "text", "chatbot", "linguistics", "processing", "bert", "gpt", "transformers"],
    personality: ["detail-oriented", "communicative", "analytical"],
    keySkills: ["NLP Libraries", "Transformers", "Python", "Linguistics"]
  },
  {
    title: "Computer Vision Engineer",
    description: "Develop systems that can interpret and understand visual information. Work on image recognition, object detection, and video analysis.",
    keywords: ["vision", "image", "visual", "opencv", "detection", "recognition", "cnn", "video", "camera"],
    personality: ["visual", "innovative", "technical"],
    keySkills: ["OpenCV", "CNNs", "Image Processing", "Deep Learning"]
  },
  {
    title: "AI Product Manager",
    description: "Lead AI product development from concept to launch. Bridge technical teams and business stakeholders to create impactful AI solutions.",
    keywords: ["product", "management", "strategy", "business", "leadership", "planning", "roadmap", "stakeholder"],
    personality: ["leadership", "communicative", "strategic", "organized"],
    keySkills: ["Product Strategy", "AI Knowledge", "Communication", "Project Management"]
  },
  {
    title: "Robotics Engineer",
    description: "Design and build intelligent robots and autonomous systems. Combine AI, mechanical engineering, and software development.",
    keywords: ["robotics", "robot", "autonomous", "hardware", "sensors", "control", "automation", "mechanical"],
    personality: ["hands-on", "problem-solving", "innovative"],
    keySkills: ["ROS", "Control Systems", "AI Integration", "Hardware"]
  },
  {
    title: "AI Ethics Specialist",
    description: "Ensure AI systems are fair, transparent, and ethical. Work on bias detection, policy development, and responsible AI practices.",
    keywords: ["ethics", "fairness", "bias", "policy", "responsible", "governance", "trust", "transparency"],
    personality: ["thoughtful", "communicative", "ethical", "analytical"],
    keySkills: ["Ethics Framework", "AI Auditing", "Policy", "Communication"]
  },
  {
    title: "Deep Learning Engineer",
    description: "Specialize in neural networks and deep learning architectures. Build sophisticated models for complex AI applications.",
    keywords: ["deep learning", "neural", "network", "cnn", "rnn", "lstm", "gpu", "keras", "pytorch"],
    personality: ["technical", "patient", "detail-oriented"],
    keySkills: ["Neural Networks", "PyTorch/TensorFlow", "GPU Programming", "Model Optimization"]
  },
  {
    title: "AI Solutions Architect",
    description: "Design end-to-end AI system architectures. Work with cloud platforms and infrastructure to deploy scalable AI solutions.",
    keywords: ["architecture", "cloud", "infrastructure", "deployment", "scalability", "aws", "azure", "system"],
    personality: ["strategic", "technical", "organized"],
    keySkills: ["Cloud Platforms", "System Design", "MLOps", "Architecture"]
  }
];

function calculateMatch(career: typeof careerDatabase[0], input: CareerRecommendationInput): number {
  let score = 0;
  const interestsLower = input.interests.toLowerCase();
  const skillsLower = input.skills.toLowerCase();
  const personalityLower = input.personality.toLowerCase();

  // Check keywords in interests and skills
  career.keywords.forEach(keyword => {
    if (interestsLower.includes(keyword)) score += 3;
    if (skillsLower.includes(keyword)) score += 4;
  });

  // Check personality match
  career.personality.forEach(trait => {
    if (personalityLower.includes(trait)) score += 2;
  });

  return score;
}

export async function POST(request: NextRequest) {
  try {
    const body: CareerRecommendationInput = await request.json();

    if (!body.interests || !body.skills || !body.personality) {
      return NextResponse.json(
        { error: 'Please provide interests, skills, and personality traits' },
        { status: 400 }
      );
    }

    // Calculate match scores for all careers
    const rankedCareers = careerDatabase
      .map(career => ({
        ...career,
        matchScore: calculateMatch(career, body)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)
      .map(career => ({
        title: career.title,
        description: career.description,
        matchScore: Math.min(95, 65 + Math.floor(career.matchScore * 2)), // Normalize to 65-95%
        keySkills: career.keySkills
      }));

    // Ensure we have at least 3 recommendations
    const recommendations: CareerOption[] = rankedCareers.length >= 3 
      ? rankedCareers 
      : [
          ...rankedCareers,
          ...careerDatabase.slice(0, 3 - rankedCareers.length).map(career => ({
            title: career.title,
            description: career.description,
            matchScore: 70,
            keySkills: career.keySkills
          }))
        ];

    return NextResponse.json({
      success: true,
      recommendations: recommendations,
      message: "Based on your profile, here are your top AI career matches:"
    });

  } catch (error) {
    console.error('Error processing career recommendation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
