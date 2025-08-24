"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageSquare,
  Brain,
  BookOpen,
  Zap,
  Users,
  Star,
  Clock,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  HelpCircle,
  Sparkles,
  Filter,
  X
} from "lucide-react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState(new Set());
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });

  const categories = [
    { id: "all", name: "All Questions", icon: <HelpCircle className="w-5 h-5" />, count: 16 },
    { id: "getting-started", name: "Getting Started", icon: <Sparkles className="w-5 h-5" />, count: 4 },
    { id: "features", name: "Features", icon: <Brain className="w-5 h-5" />, count: 5 },
    { id: "pricing", name: "Pricing", icon: <CreditCard className="w-5 h-5" />, count: 3 },
    { id: "technical", name: "Technical", icon: <Zap className="w-5 h-5" />, count: 4 }
  ];

  const faqData = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with AI-LMS?",
      answer: "Getting started is simple! Just click 'Start Learning Now' on our homepage, create your free account, choose your learning topic, and our AI will instantly generate a personalized curriculum with study materials, flashcards, and quizzes tailored to your skill level.",
      popular: true
    },
    {
      id: 2,
      category: "features",
      question: "What makes AI-LMS different from other learning platforms?",
      answer: "AI-LMS uses advanced AI to create personalized learning experiences. Unlike traditional platforms with static content, our system generates fresh study materials, adapts to your learning pace, and creates interactive content specifically for your chosen topics and skill level.",
      popular: true
    },
    {
      id: 3,
      category: "pricing",
      question: "Is AI-LMS really free to get started?",
      answer: "Yes! You can start learning immediately with our free tier, which includes basic AI-generated study materials and limited quiz access. Upgrade to our premium plans for unlimited content generation, advanced features, and priority support.",
      popular: true
    },
    {
      id: 4,
      category: "technical",
      question: "How accurate is the AI-generated content?",
      answer: "Our AI is trained on high-quality educational resources and continuously updated. The content accuracy is over 95%, and we have built-in fact-checking mechanisms. Users can also report any inaccuracies, which helps us improve the system continuously.",
      popular: false
    },
    {
      id: 5,
      category: "features",
      question: "Can I customize the difficulty level of my learning materials?",
      answer: "Absolutely! AI-LMS offers three difficulty levels: Easy, Moderate, and Hard. You can switch between levels at any time, and our AI will adapt the content complexity, question difficulty, and explanation depth accordingly.",
      popular: false
    },
    {
      id: 6,
      category: "getting-started",
      question: "What subjects and topics can I learn with AI-LMS?",
      answer: "AI-LMS supports a vast range of subjects including programming, data science, mathematics, science, business, languages, and more. Simply enter any topic you want to learn, and our AI will create comprehensive study materials for it.",
      popular: true
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqData.filter(faq => faq.popular);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleFormSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.question) {
      alert("Please fill in all fields");
      return;
    }
    // Simulate form submission
    alert(`Thank you, ${formData.name}! We've received your question and will get back to you soon.`);
    setFormData({ name: "", email: "", question: "" });
    setShowContactForm(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-gray-700 mb-8 shadow-xl">
            <HelpCircle className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">Frequently Asked Questions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Got Questions?
            </span>
            <br />
            <span className="text-white">We Have Answers</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about AI-LMS, or ask our AI assistant for instant help.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/60 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 border border-gray-700"
                }`}
              >
                {category.icon}
                <span className="ml-2 mr-1">{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-4">No results found</h3>
              <p className="text-gray-500 mb-8">Try adjusting your search or browse our categories above.</p>
              <Button 
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                Ask a Question
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-800/40 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-200"
                  >
                    <div className="flex items-center flex-1">
                      {faq.popular && <Star className="w-5 h-5 text-yellow-400 mr-3" />}
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    </div>
                    <div className="ml-4 p-2">
                      {openItems.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-blue-400 transform transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-400 transform transition-transform duration-200" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.has(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ask a Question
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
                  placeholder="What would you like to know?"
                />
              </div>
              
              <Button 
                onClick={handleFormSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 font-semibold"
              >
                Send Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is here to help you succeed with AI-LMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 text-lg font-semibold"
            >
              <MessageSquare className="mr-3 w-5 h-5" />
              Ask a Question
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-gray-600 hover:border-blue-400 px-8 py-4 text-lg font-semibold text-white bg-black/20 backdrop-blur-sm"
            >
              <Clock className="mr-3 w-5 h-5" />
              24/7 Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 p-8 text-center">
        <p>© 2025 AI-LMS. All rights reserved.</p>
        <p className="mt-2">Made with ❤️ by Karan</p>
      </footer>
    </div>
  );
}