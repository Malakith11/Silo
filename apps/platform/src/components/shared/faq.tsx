"use client"

import { useState } from "react"

import { ChevronDown, ChevronUp, HelpCircle, Shield, Database, Users, ArrowRight } from "lucide-react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

// FAQ Data
const faqCategories = [
  {
    name: "Getting Started",
    icon: HelpCircle,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    faqs: [
      {
        question: "How does Silo create personalized supplement recommendations?",
        answer:
          "Silo uses advanced AI to analyze your health goals, lifestyle factors, and medical history against our comprehensive database of clinical research and user outcomes. We consider supplement interactions, optimal dosing, timing, and quality assessments to create evidence-based protocols tailored specifically to you.",
      },
      {
        question: "Do I need to have medical knowledge to use Silo?",
        answer:
          "Not at all! Silo is designed for everyone, from beginners to health experts. Our platform provides clear explanations, educational content, and step-by-step guidance. However, we always recommend consulting with healthcare providers before starting any new supplement regimen.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Results vary by individual and supplement type. Some users notice improvements in energy and sleep within days, while others may take weeks to see changes in areas like cognitive function or immune health. Our platform helps you track progress and adjust protocols based on your response.",
      },
    ],
  },
  {
    name: "Safety & Quality",
    icon: Shield,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    faqs: [
      {
        question: "How do you ensure supplement quality and safety?",
        answer:
          "We maintain a comprehensive quality database that evaluates supplements based on third-party testing, manufacturing standards (GMP), certifications (NSF, USP), ingredient purity, and label accuracy. We only recommend products that meet our strict quality criteria and regularly update our assessments.",
      },
      {
        question: "Do you check for supplement interactions?",
        answer:
          "Yes! Our AI system automatically screens for potential interactions between supplements, medications, and health conditions. We provide detailed interaction warnings and alternative recommendations when conflicts are detected. However, always consult your healthcare provider for personalized medical advice.",
      },
      {
        question: "Are your recommendations FDA approved?",
        answer:
          "Supplements are regulated differently than medications by the FDA. While supplements don't require FDA approval, we ensure all recommended products comply with FDA regulations and good manufacturing practices. Our recommendations are based on peer-reviewed research and clinical evidence.",
      },
    ],
  },
  {
    name: "Data & Privacy",
    icon: Database,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    faqs: [
      {
        question: "What data do you collect and how is it used?",
        answer:
          "We collect health goals, lifestyle information, and supplement responses to improve recommendations. All personal data is encrypted, anonymized for research, and never sold to third parties. You maintain full control over your data and can export or delete it at any time.",
      },
      {
        question: "How do you protect my privacy?",
        answer:
          "We use enterprise-grade encryption, secure data storage, and strict access controls. Personal information is separated from research data through anonymization. We comply with GDPR, CCPA, and other privacy regulations. Our privacy policy provides full transparency about data handling.",
      },
      {
        question: "Can I see what research backs your recommendations?",
        answer:
          "Transparency is core to our mission. Every recommendation includes links to supporting research, study summaries, and quality assessments. Our database section shows exactly what data powers our platform, including research sources and methodology.",
      },
    ],
  },
  {
    name: "Platform Features",
    icon: Users,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    faqs: [
      {
        question: "What's the difference between Stack Compass and Stack Lab?",
        answer:
          "Stack Compass is our discovery platform where you can browse expert-curated protocols, trending supplements, and community stacks. Stack Lab is our personalization engine where you build custom protocols with AI assistance, dosage optimization, and progress tracking.",
      },
      {
        question: "Can I integrate my wearable device data?",
        answer:
          "Yes! Our Data Sync feature connects with popular wearables and health apps to track biomarkers, sleep, activity, and other health metrics. This data helps optimize your protocols and measure supplement effectiveness over time.",
      },
      {
        question: "Do you offer mobile apps?",
        answer:
          "Yes, we have mobile apps for iOS and Android that sync with your web account. The apps include protocol tracking, reminder notifications, progress monitoring, and access to our full database of supplements and research.",
      },
    ],
  },
]

// Individual FAQ Item
function FAQItem({ faq, isOpen, onToggle }: { faq: any; isOpen: boolean; onToggle: () => void }) {
  return (
    <Card className="border-0 shadow-sm bg-card/80 border-border/20">
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between"
        >
          <span className="font-medium text-foreground pr-4">{faq.question}</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// FAQ Category Section
function FAQCategory({ category }: { category: any }) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-muted rounded-lg">
          <category.icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
        <Badge className={category.color}>{category.faqs.length} questions</Badge>
      </div>

      <div className="space-y-2">
        {category.faqs.map((faq: any, index: number) => (
          <FAQItem key={index} faq={faq} isOpen={openItems.includes(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </div>
  )
}

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [openFAQs, setOpenFAQs] = useState<number[]>([])

  const safeIndex = activeCategory >= 0 && activeCategory < faqCategories.length ? activeCategory : 0
  const activeCategoryData = faqCategories[safeIndex]
  const ActiveCategoryIcon = activeCategoryData.icon

  const toggleFAQ = (index: number) => {
    setOpenFAQs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section id="faq" className="relative bg-transparent py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              to Know
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about Silo's platform, safety measures, and how we help optimize your
            health.
          </p>
        </div>

        {/* FAQ Categories - Interactive File Organizer */}
        <div className="h-[700px] bg-card/30 backdrop-blur-lg rounded-2xl border border-border/20 shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-border/20 bg-muted/20">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                  activeCategory === index
                    ? "text-primary bg-card/50 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </div>
                <Badge className={`ml-2 text-xs ${category.color}`}>{category.faqs.length}</Badge>
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          <div className="h-full p-8 overflow-y-auto">
            <div className="w-full">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <ActiveCategoryIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">{activeCategoryData.name}</h3>
                </div>
                <p className="text-muted-foreground">
                  {safeIndex === 0 && "Learn the basics of getting started with Silo"}
                  {safeIndex === 1 && "Understand our safety measures and quality standards"}
                  {safeIndex === 2 && "Know how we handle your data and protect your privacy"}
                  {safeIndex === 3 && "Explore our platform features and capabilities"}
                </p>
              </div>

              {/* FAQ Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeCategoryData.faqs.map((faq, faqIndex) => (
                  <Card
                    key={faqIndex}
                    className="border-0 shadow-lg bg-card/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(faqIndex)}
                        className="w-full p-4 text-left hover:bg-muted/30 transition-all duration-200 flex items-start justify-between group"
                      >
                        <div className="flex-1 pr-3">
                          <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm">
                            {faq.question}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex-shrink-0">
                          {openFAQs.includes(faqIndex) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </button>
                      {openFAQs.includes(faqIndex) && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                          <div className="pt-3 border-t border-border/20">
                            <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 border border-border/30 shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">Our support team is here to help you get the most out of Silo</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                Browse Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
