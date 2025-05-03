'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';

interface Scenario {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    question: "You&apos;re walking home from school and a stranger offers you candy. What should you do?",
    options: [
      {
        text: "Take the candy and say thank you",
        isCorrect: false,
        feedback: "Remember, never take anything from strangers! Let&apos;s try again!"
      },
      {
        text: "Say 'No thank you' and walk away",
        isCorrect: true,
        feedback: "Great job! It&apos;s important to say no to strangers and walk away."
      },
      {
        text: "Ask them to follow you home",
        isCorrect: false,
        feedback: "Never invite strangers to follow you! Let&apos;s try again!"
      }
    ]
  },
  {
    id: 2,
    question: "You&apos;re playing in the park and someone you don&apos;t know asks you to help find their lost puppy. What should you do?",
    options: [
      {
        text: "Help them look for the puppy",
        isCorrect: false,
        feedback: "Remember, never go anywhere with strangers! Let&apos;s try again!"
      },
      {
        text: "Tell a trusted adult about it",
        isCorrect: true,
        feedback: "Excellent! Always tell a trusted adult if a stranger asks for help."
      },
      {
        text: "Ignore them and keep playing",
        isCorrect: false,
        feedback: "It&apos;s good to be cautious, but we should tell an adult about suspicious situations."
      }
    ]
  },
  {
    id: 3,
    question: "You&apos;re at a friend&apos;s house and they want to play with matches. What should you do?",
    options: [
      {
        text: "Join them in playing with matches",
        isCorrect: false,
        feedback: "Matches are dangerous! Never play with fire. Let&apos;s try again!"
      },
      {
        text: "Tell them it&apos;s dangerous and suggest a different game",
        isCorrect: true,
        feedback: "Great thinking! Always choose safe activities and help others make safe choices too."
      },
      {
        text: "Watch them play with matches",
        isCorrect: false,
        feedback: "Even watching can be dangerous. Always stay away from fire. Let&apos;s try again!"
      }
    ]
  },
  {
    id: 4,
    question: "You&apos;re at the pool and your friends want to play a game of pushing each other in. What should you do?",
    options: [
      {
        text: "Join in the pushing game",
        isCorrect: false,
        feedback: "Pushing games near water can be very dangerous! Let&apos;s try again!"
      },
      {
        text: "Tell them it&apos;s not safe and suggest a different game",
        isCorrect: true,
        feedback: "Excellent! Always choose safe water activities and help others stay safe too."
      },
      {
        text: "Stand back and watch them play",
        isCorrect: false,
        feedback: "Even watching unsafe activities can encourage others. Always speak up about safety!"
      }
    ]
  },
  {
    id: 5,
    question: "You&apos;re crossing the street and the light turns yellow. What should you do?",
    options: [
      {
        text: "Run across quickly",
        isCorrect: false,
        feedback: "Running across the street is dangerous! Let&apos;s try again!"
      },
      {
        text: "Stop and wait for the next green light",
        isCorrect: true,
        feedback: "Perfect! Always wait for a fresh green light to cross safely."
      },
      {
        text: "Walk slowly while looking at your phone",
        isCorrect: false,
        feedback: "Never use your phone while crossing the street! Always pay attention to traffic."
      }
    ]
  },
  {
    id: 6,
    question: "You&apos;re at home alone and someone rings the doorbell. What should you do?",
    options: [
      {
        text: "Open the door to see who it is",
        isCorrect: false,
        feedback: "Never open the door when you&apos;re home alone! Let&apos;s try again!"
      },
      {
        text: "Look through the peephole and don&apos;t open if you don&apos;t know them",
        isCorrect: true,
        feedback: "Great job! Always check who&apos;s at the door and never open it to strangers."
      },
      {
        text: "Yell through the door to ask who it is",
        isCorrect: false,
        feedback: "It&apos;s better to stay quiet and not let strangers know you&apos;re home alone."
      }
    ]
  },
  {
    id: 7,
    question: "You&apos;re playing with your friends and one of them falls and gets hurt. What should you do?",
    options: [
      {
        text: "Keep playing and ignore them",
        isCorrect: false,
        feedback: "We should always help others when they&apos;re hurt. Let&apos;s try again!"
      },
      {
        text: "Tell an adult immediately",
        isCorrect: true,
        feedback: "Excellent! Always get help from an adult when someone is hurt."
      },
      {
        text: "Try to fix it yourself",
        isCorrect: false,
        feedback: "It&apos;s important to get help from an adult for injuries. Let&apos;s try again!"
      }
    ]
  },
  {
    id: 8,
    question: "You&apos;re at a friend&apos;s house and they want to play with their parent&apos;s medicine. What should you do?",
    options: [
      {
        text: "Join them in playing with the medicine",
        isCorrect: false,
        feedback: "Medicine is not a toy! It can be very dangerous. Let&apos;s try again!"
      },
      {
        text: "Tell them it&apos;s dangerous and suggest a different game",
        isCorrect: true,
        feedback: "Perfect! Always stay away from medicine and help others make safe choices."
      },
      {
        text: "Watch them play with the medicine",
        isCorrect: false,
        feedback: "Even watching can be dangerous. Always tell an adult about unsafe situations."
      }
    ]
  },
  {
    id: 9,
    question: "You&apos;re walking to school and see a dog you don&apos;t know. What should you do?",
    options: [
      {
        text: "Run up to pet the dog",
        isCorrect: false,
        feedback: "Never approach an unknown dog! Let&apos;s try again!"
      },
      {
        text: "Stay calm, don&apos;t make eye contact, and walk away slowly",
        isCorrect: true,
        feedback: "Great thinking! Always be cautious around unknown animals."
      },
      {
        text: "Try to scare the dog away",
        isCorrect: false,
        feedback: "Making sudden movements or loud noises can make a dog more dangerous."
      }
    ]
  },
  {
    id: 10,
    question: "You&apos;re playing outside and see a storm coming. What should you do?",
    options: [
      {
        text: "Keep playing until it starts raining",
        isCorrect: false,
        feedback: "It&apos;s important to go inside before the storm gets close! Let&apos;s try again!"
      },
      {
        text: "Go inside immediately and tell an adult",
        isCorrect: true,
        feedback: "Excellent! Always seek shelter when you see a storm coming."
      },
      {
        text: "Hide under a tree",
        isCorrect: false,
        feedback: "Never hide under trees during storms - they can attract lightning!"
      }
    ]
  }
];

export default function SafetyGames() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (scenarios[currentScenario].options[optionIndex].isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setProgress(((currentScenario + 1) / scenarios.length) * 100);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 p-8">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            Safety Adventure Game
          </h1>
          <p className="text-xl text-purple-600">Learn safety while having fun!</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-purple-700">Progress</span>
            <span className="text-lg font-semibold text-purple-700">{Math.round(progress)}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-6 bg-purple-100 border-2 border-purple-200 rounded-full overflow-hidden"
            />
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                background: `linear-gradient(90deg, #4F46E5 ${progress}%, #EC4899 ${progress}%)`,
                transition: 'background 0.3s ease'
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-2 border-purple-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-purple-700 mb-6">
                  {scenarios[currentScenario].question}
                </h2>
              </div>

              <div className="space-y-4">
                {scenarios[currentScenario].options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={selectedOption === index ? (option.isCorrect ? "secondary" : "destructive") : "default"}
                      className={`w-full text-xl py-7 rounded-xl transition-all duration-200 text-black ${
                        selectedOption === index 
                          ? option.isCorrect 
                            ? 'bg-green-50 hover:bg-green-100' 
                            : 'bg-red-50 hover:bg-red-100'
                          : 'bg-white hover:bg-purple-50'
                      }`}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showFeedback}
                    >
                      {option.text}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {showFeedback && selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-6 rounded-xl text-center ${
                    scenarios[currentScenario].options[selectedOption].isCorrect
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-red-50 border-2 border-red-200'
                  }`}
                >
                  <p className="text-xl font-medium text-black">
                    {scenarios[currentScenario].options[selectedOption].feedback}
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl shadow-lg">
            <p className="text-2xl font-bold text-purple-700">
              Score: {score} / {scenarios.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}