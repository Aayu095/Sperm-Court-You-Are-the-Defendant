"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Info, Trophy, Target, Zap, Award } from "lucide-react";
import SpermBackground from "@/components/SpermBackground";

// 3D Sperm Character with Judge Wig
function SpermCharacter({ shake }: { shake: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const [shakeOffset, setShakeOffset] = useState(0);

  useFrame((state) => {
    if (tailRef.current) {
      // Animate tail wiggle
      tailRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      tailRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 2) * 0.2;
    }

    if (groupRef.current) {
      // Idle bobbing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Shake animation when objection is pressed
      if (shake) {
        setShakeOffset(Math.sin(state.clock.elapsedTime * 50) * 0.3);
        groupRef.current.rotation.z = shakeOffset;
      } else {
        groupRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Sperm Head - Sphere */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 0.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 0.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Judge Wig - White Curly Top */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Wig Curls - Left */}
      <mesh position={[-0.5, 0.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      <mesh position={[-0.6, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Wig Curls - Right */}
      <mesh position={[0.5, 0.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Sperm Tail - Cylinder */}
      <mesh ref={tailRef} position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.05, 2, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Defendant Data - Based on VISEM-style motility analysis
const defendants = [
  {
    id: 1,
    charge: "Loitering in Seminal Fluid",
    alibi: "Tired from the epididymis commute!",
    motility: 15,
    morphology: "Normal",
    velocity: "15 μm/s (Asthenozoospermia)",
    healthNote: "Progressive motility <32% indicates reduced fertility potential",
    judgeReaction: "Pathetic! This sperm couldn't swim through pudding!"
  },
  {
    id: 2,
    charge: "Reckless Swimming in a No-Swim Zone",
    alibi: "GPS was broken, following hyperactivation protocol!",
    motility: 85,
    morphology: "Normal",
    velocity: "85 μm/s (Excellent)",
    healthNote: "Progressive motility >40% indicates healthy sperm function",
    judgeReaction: "Now THIS is a champion swimmer! Olympic material!"
  },
  {
    id: 3,
    charge: "Attempted Fertilization Without a License",
    alibi: "I thought capacitation was optional!",
    motility: 45,
    morphology: "Normal",
    velocity: "45 μm/s (Moderate)",
    healthNote: "Motility 32-40% is borderline, lifestyle changes recommended",
    judgeReaction: "Mediocre at best. Could go either way..."
  },
  {
    id: 4,
    charge: "Obstruction of Reproductive Justice",
    alibi: "I was following the non-progressive crowd!",
    motility: 30,
    morphology: "Abnormal Head",
    velocity: "30 μm/s (Low-Normal)",
    healthNote: "Combined motility + morphology defects significantly reduce fertility",
    judgeReaction: "Following the crowd? Not a valid legal defense!"
  },
  {
    id: 5,
    charge: "Grand Theft Ovum",
    alibi: "It was consensual fertilization, Your Honor!",
    motility: 92,
    morphology: "Normal",
    velocity: "92 μm/s (Peak Performance)",
    healthNote: "Elite motility! This specimen demonstrates optimal reproductive health",
    judgeReaction: "Guilty of being TOO good! A true fertility legend!"
  },
];

// Achievement system
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// Intro Screen Component
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a] flex items-center justify-center p-4 relative">
      {/* Animated Sperm Background */}
      <SpermBackground />
      
      <div className="bg-gradient-to-b from-[#3d2817] to-[#2d1810] border-4 border-[#8b6f47] rounded-lg p-6 md:p-10 max-w-3xl w-full shadow-2xl relative z-10">
        {/* Branding Header */}
        <div className="text-center mb-6 pb-6 border-b-2 border-[#8b6f47]">
          <div className="inline-block bg-[#1a0f0a] px-6 py-3 rounded-lg border-2 border-[#8b6f47] mb-4">
            <p className="text-xs md:text-sm text-[#d4b896] font-semibold tracking-wider">
              POWERED BY
            </p>
            <p className="text-lg md:text-2xl font-bold text-[#f4e4c1]">
              🏁 SPERM RACING KIT
            </p>
            <p className="text-xs md:text-sm text-[#d4b896] italic">
              The Sport Behind Men&apos;s Health
            </p>
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-center text-[#f4e4c1] mb-6">
          🎓 Welcome to Sperm Court
        </h1>
        
        <div className="space-y-4 text-[#d4b896] text-sm md:text-base">
          <div className="bg-[#1a0f0a] border-2 border-[#8b6f47] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#f4e4c1] mb-2">🏆 Congratulations, Racer!</p>
                <p className="text-sm">
                  You&apos;ve completed your sperm race using the Sperm Racing take-home kit. 
                  Your sample has been analyzed using VISEM (Video Sperm Motion Analysis) technology.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a0f0a] border-2 border-[#8b6f47] rounded-lg p-4">
            <p className="font-semibold text-[#f4e4c1] mb-2">⚖️ What is Sperm Court?</p>
            <p className="text-sm">
              Based on your race results, each of your sperm specimens is now on trial! 
              Using real motility data (progressive movement %), morphology analysis, and velocity measurements, 
              you&apos;ll determine which swimmers had legitimate excuses for their performance... and which ones are just lazy.
            </p>
          </div>

          <div className="bg-[#1a0f0a] border-2 border-[#8b6f47] rounded-lg p-4">
            <p className="font-semibold text-[#f4e4c1] mb-2">🔬 The Science Behind the Humor</p>
            <ul className="text-sm space-y-1 ml-4 list-disc">
              <li><strong>Progressive Motility:</strong> Measures forward-swimming ability (healthy range: &gt;40%)</li>
              <li><strong>Velocity (VAP):</strong> Average path velocity in micrometers per second</li>
              <li><strong>Morphology:</strong> Structural abnormalities affecting fertility</li>
              <li><strong>WHO Standards:</strong> Based on World Health Organization semen analysis guidelines</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-4">
            <p className="text-yellow-200 text-xs italic text-center">
              💡 This gamified experience makes learning about reproductive health fun, memorable, 
              and conversation-worthy. Your real race data determines each defendant&apos;s charges and verdicts.
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full mt-6 bg-[#8b6f47] hover:bg-[#a68958] text-[#1a0f0a] font-bold py-4 px-6 rounded-lg text-xl md:text-2xl transition-colors shadow-lg"
        >
          ⚡ ENTER THE COURTROOM ⚡
        </button>

        <p className="text-center text-xs text-[#d4b896] mt-4">
          Visit <span className="text-[#f4e4c1] font-semibold">spermracing.com</span> to get your own take-home kit
        </p>
      </div>
    </div>
  );
}

export default function SpermCourtroom() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentDefendant, setCurrentDefendant] = useState(0);
  const [shake, setShake] = useState(false);
  const [showObjection, setShowObjection] = useState(false);
  const [guiltyCount, setGuiltyCount] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const [showHealthInfo, setShowHealthInfo] = useState(false);
  const [objectionCount, setObjectionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showJudgeReaction, setShowJudgeReaction] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "first_objection", name: "First Objection!", description: "Used the objection button", icon: "⚡", unlocked: false },
    { id: "perfect_judge", name: "Perfect Judge", description: "All verdicts match health data", icon: "⚖️", unlocked: false },
    { id: "harsh_judge", name: "Harsh Judge", description: "Found all defendants guilty", icon: "🔨", unlocked: false },
    { id: "merciful_judge", name: "Merciful Judge", description: "Found all defendants innocent", icon: "💚", unlocked: false },
    { id: "objection_master", name: "Objection Master", description: "Used objection 10+ times", icon: "🎯", unlocked: false },
  ]);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  const defendant = defendants[currentDefendant];

  const unlockAchievement = (id: string) => {
    const achievement = achievements.find(a => a.id === id && !a.unlocked);
    if (achievement) {
      setAchievements(prev => 
        prev.map(a => a.id === id ? { ...a, unlocked: true } : a)
      );
      setUnlockedAchievement(achievement);
      setScore(prev => prev + 100);
      
      setTimeout(() => {
        setUnlockedAchievement(null);
      }, 3000);
    }
  };

  const handleObjection = () => {
    setShake(true);
    setShowObjection(true);
    setObjectionCount(prev => prev + 1);
    setScore(prev => prev + 10);
    
    if (objectionCount === 0) {
      unlockAchievement("first_objection");
    }
    
    if (objectionCount + 1 >= 10) {
      unlockAchievement("objection_master");
    }
    
    setTimeout(() => {
      setShake(false);
    }, 500);

    setTimeout(() => {
      setShowObjection(false);
    }, 1500);
  };

  const handleNextDefendant = (guilty: boolean) => {
    // Calculate if verdict matches health data
    const shouldBeGuilty = defendant.motility < 40 || defendant.morphology !== "Normal";
    if (guilty === shouldBeGuilty) {
      setScore(prev => prev + 50);
    }

    if (guilty) {
      setGuiltyCount(guiltyCount + 1);
    }

    // Show judge reaction
    setShowJudgeReaction(true);
    setTimeout(() => {
      setShowJudgeReaction(false);
    }, 2500);

    setTimeout(() => {
      if (currentDefendant < defendants.length - 1) {
        setCurrentDefendant(currentDefendant + 1);
        setShowHealthInfo(false);
      } else {
        // Check achievements
        if (guiltyCount + (guilty ? 1 : 0) === 0) {
          unlockAchievement("merciful_judge");
        }
        if (guiltyCount + (guilty ? 1 : 0) === defendants.length) {
          unlockAchievement("harsh_judge");
        }
        
        // Check perfect judge
        let perfectJudge = true;
        defendants.forEach((def, idx) => {
          const wasGuilty = idx < currentDefendant 
            ? (idx < guiltyCount) 
            : (idx === currentDefendant && guilty);
          const shouldBeGuilty = def.motility < 40 || def.morphology !== "Normal";
          if (wasGuilty !== shouldBeGuilty) perfectJudge = false;
        });
        if (perfectJudge) {
          unlockAchievement("perfect_judge");
        }
        
        setShowVerdict(true);
      }
    }, 2500);
  };

  const getSentence = () => {
    const sentences = [
      "Life in the left testicle without parole.",
      "Sentenced to eternal swimming in circles.",
      "Banished to the vas deferens for 1000 laps.",
      "Community service: 500 hours of tail-wagging therapy.",
      "Frozen in cryogenic storage indefinitely.",
    ];
    return sentences[guiltyCount % sentences.length];
  };

  const getHealthVerdict = () => {
    const percentage = ((defendants.length - guiltyCount) / defendants.length) * 100;
    if (percentage >= 80) return {
      grade: "EXCELLENT",
      color: "text-green-400",
      message: "Your sperm motility is in the optimal range! Elite swimmers detected. 🏆"
    };
    if (percentage >= 60) return {
      grade: "GOOD",
      color: "text-blue-400",
      message: "Your sperm motility is healthy. Most swimmers showing strong performance. 💪"
    };
    if (percentage >= 40) return {
      grade: "FAIR",
      color: "text-yellow-400",
      message: "Your sperm motility is borderline. Consider lifestyle improvements. 🔄"
    };
    return {
      grade: "NEEDS IMPROVEMENT",
      color: "text-red-400",
      message: "Low motility detected. Consult a healthcare provider about fertility optimization. 🏥"
    };
  };

  const getShareText = () => {
    const healthVerdict = getHealthVerdict();
    return `🏛️ SPERM COURT™ VERDICT 🏛️\n\n⚖️ ${guiltyCount} GUILTY | ${defendants.length - guiltyCount} INNOCENT\n📊 Health Grade: ${healthVerdict.grade}\n🎯 Score: ${score} points\n🏆 Achievements: ${achievements.filter(a => a.unlocked).length}/${achievements.length}\n\n⚡ ${objectionCount} objections raised!\n\nPowered by Sperm Racing Kit 🏁\nspermracing.com`;
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  if (showVerdict) {
    const healthVerdict = getHealthVerdict();
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a] flex items-center justify-center p-4 relative">
        {/* Animated Sperm Background */}
        <SpermBackground />
        
        <div className="bg-gradient-to-b from-[#3d2817] to-[#2d1810] border-4 border-[#8b6f47] rounded-lg p-6 md:p-12 max-w-2xl w-full shadow-2xl relative z-10">
          {/* Branding */}
          <div className="text-center mb-4 pb-4 border-b border-[#8b6f47]/50">
            <p className="text-xs text-[#d4b896]">POWERED BY SPERM RACING KIT</p>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-center text-[#f4e4c1] mb-6">
            ⚖️ FINAL VERDICT ⚖️
          </h1>
          
          <div className="text-center space-y-6">
            {/* Score Display */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500 rounded-lg p-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-[#d4b896]">Final Score</p>
                  <p className="text-3xl font-bold text-yellow-400">{score} pts</p>
                </div>
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
            </div>

            <div className="bg-[#1a0f0a] border-2 border-[#8b6f47] rounded-lg p-6">
              <p className="text-xl md:text-2xl text-[#d4b896] mb-2">Court Decision:</p>
              <p className="text-3xl md:text-4xl text-red-400 font-bold">
                {guiltyCount} GUILTY
              </p>
              <p className="text-xl md:text-2xl text-[#d4b896] mt-2">
                {defendants.length - guiltyCount} INNOCENT
              </p>
              <p className="text-sm text-[#d4b896] mt-3">
                ⚡ {objectionCount} objections raised
              </p>
            </div>

            <div className="bg-[#1a0f0a] border-2 border-[#8b6f47] rounded p-6">
              <p className="text-lg text-[#f4e4c1] font-semibold mb-3">
                Sentence:
              </p>
              <p className="text-xl md:text-2xl text-red-400 font-bold">
                {getSentence()}
              </p>
            </div>

            <div className={`bg-gradient-to-br from-[#1a0f0a] to-[#2d1810] border-2 border-[#8b6f47] rounded-lg p-6`}>
              <p className="text-sm text-[#d4b896] mb-2">📊 YOUR SPERM HEALTH ANALYSIS</p>
              <p className={`text-2xl md:text-3xl font-bold ${healthVerdict.color} mb-3`}>
                {healthVerdict.grade}
              </p>
              <p className="text-sm text-[#d4b896]">
                {healthVerdict.message}
              </p>
              <div className="mt-4 pt-4 border-t border-[#8b6f47]/50">
                <p className="text-xs text-[#d4b896]">
                  Innocent Rate: {((defendants.length - guiltyCount) / defendants.length * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-[#d4b896] mt-1">
                  (Based on progressive motility analysis)
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Award className="w-5 h-5 text-purple-400" />
                <p className="text-lg font-bold text-purple-300">
                  Achievements Unlocked: {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-2 rounded border ${
                      achievement.unlocked 
                        ? 'bg-purple-500/20 border-purple-400' 
                        : 'bg-gray-800/50 border-gray-600 opacity-50'
                    }`}
                  >
                    <div className="text-2xl text-center">{achievement.icon}</div>
                    <p className="text-xs text-center text-[#d4b896] mt-1">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4">
              <p className="text-sm text-blue-200 mb-2">📋 Share Your Results:</p>
              <textarea
                readOnly
                value={getShareText()}
                className="w-full bg-[#1a0f0a] text-[#d4b896] p-3 rounded text-xs border border-[#8b6f47] font-mono"
                rows={8}
                onClick={(e) => e.currentTarget.select()}
              />
              <p className="text-xs text-blue-300 mt-2 italic">Click to select and copy!</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setCurrentDefendant(0);
                  setGuiltyCount(0);
                  setShowVerdict(false);
                  setShowHealthInfo(false);
                  setObjectionCount(0);
                  setScore(0);
                  setAchievements(prev => prev.map(a => ({ ...a, unlocked: false })));
                }}
                className="flex-1 bg-[#8b6f47] hover:bg-[#a68958] text-[#1a0f0a] font-bold py-3 px-6 rounded-lg text-lg transition-colors"
              >
                🔄 Retry Trial
              </button>
              <button
                onClick={() => {
                  setShowIntro(true);
                  setCurrentDefendant(0);
                  setGuiltyCount(0);
                  setShowVerdict(false);
                  setShowHealthInfo(false);
                  setObjectionCount(0);
                  setScore(0);
                  setAchievements(prev => prev.map(a => ({ ...a, unlocked: false })));
                }}
                className="flex-1 bg-[#2d1810] hover:bg-[#3d2817] border-2 border-[#8b6f47] text-[#f4e4c1] font-bold py-3 px-6 rounded-lg text-lg transition-colors"
              >
                📖 Learn More
              </button>
            </div>

            <p className="text-xs text-[#d4b896] pt-4 border-t border-[#8b6f47]/30">
              Get your real results at <span className="text-[#f4e4c1] font-semibold">spermracing.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a] relative overflow-hidden">
      {/* Animated Sperm Background */}
      <SpermBackground />
      
      {/* Dramatic Lighting Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#2d1810]/50 to-[#1a0f0a] pointer-events-none" />
      
      {/* Objection Explosion Overlay */}
      {showObjection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-pulse">
          <div className="text-3xl md:text-5xl font-bold text-red-500 animate-bounce drop-shadow-2xl">
            ⚡ OBJECTION! ⚡
          </div>
        </div>
      )}

      {/* Judge Reaction Overlay */}
      {showJudgeReaction && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
          <div className="bg-purple-500/90 border-4 border-purple-300 rounded-lg px-6 py-4 shadow-2xl max-w-md">
            <p className="text-white text-lg md:text-xl font-bold text-center italic">
              &quot;{defendant.judgeReaction}&quot;
            </p>
            <p className="text-purple-200 text-sm text-center mt-1">- The Judge</p>
          </div>
        </div>
      )}

      {/* Achievement Unlock Notification */}
      {unlockedAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 border-2 border-yellow-300 rounded-lg px-6 py-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold">Achievement Unlocked!</p>
                <p className="text-yellow-100 text-sm">{unlockedAchievement.icon} {unlockedAchievement.name}</p>
                <p className="text-yellow-200 text-xs">+100 pts</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Header with Branding and Score */}
      <div className="relative z-10 text-center pt-4 pb-4 border-b border-[#8b6f47]/30">
        <div className="text-xs md:text-sm text-[#d4b896] mb-1">
          POWERED BY 🏁 SPERM RACING KIT
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-[#f4e4c1] tracking-wider drop-shadow-lg">
          ⚖️ SPERM COURT™ ⚖️
        </h1>
        <p className="text-xs md:text-sm text-[#d4b896] mt-1">
          Where Science Meets Justice
        </p>
        
        {/* Score Tracker */}
        <div className="flex justify-center items-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-[#1a0f0a] px-4 py-2 rounded-lg border border-[#8b6f47]">
            <Target className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{score} pts</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1a0f0a] px-4 py-2 rounded-lg border border-[#8b6f47]">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">{objectionCount} objections</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-4 md:gap-8 px-4 py-6 max-w-7xl mx-auto">
        {/* 3D Defendant Box */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <div className="bg-gradient-to-b from-[#3d2817] to-[#2d1810] border-4 border-[#8b6f47] rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-[#8b6f47] text-center py-2">
              <h2 className="text-lg md:text-xl font-bold text-[#1a0f0a]">DEFENDANT BOX</h2>
            </div>
            <div className="h-[300px] md:h-[400px] bg-gradient-to-b from-[#4a3425] to-[#3d2817]">
              <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffd700" />
                <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ff6600" />
                <SpermCharacter shake={shake} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Trial Info Panel */}
        <div className="w-full lg:w-1/2 max-w-xl space-y-3 md:space-y-4">
          {/* Defendant Info */}
          <div className="bg-gradient-to-b from-[#3d2817] to-[#2d1810] border-4 border-[#8b6f47] rounded-lg p-4 md:p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-[#f4e4c1]">
                Defendant #{defendant.id}
              </h3>
              <button
                onClick={() => setShowHealthInfo(!showHealthInfo)}
                className="text-[#d4b896] hover:text-[#f4e4c1] transition-colors"
                title="Toggle health info"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-[#d4b896] text-sm font-semibold">Charged with:</span>
                <p className="text-red-400 text-base md:text-lg font-bold">{defendant.charge}</p>
              </div>
              <div>
                <span className="text-[#d4b896] text-sm font-semibold">Alibi:</span>
                <p className="text-[#f4e4c1] text-base md:text-lg italic">&quot;{defendant.alibi}&quot;</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#8b6f47]/30">
                <div>
                  <span className="text-[#d4b896] text-xs">Morphology:</span>
                  <p className="text-[#f4e4c1] text-sm">{defendant.morphology}</p>
                </div>
                <div>
                  <span className="text-[#d4b896] text-xs">Velocity:</span>
                  <p className="text-[#f4e4c1] text-sm">{defendant.velocity.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Info (Collapsible) */}
          {showHealthInfo && (
            <div className="bg-blue-500/10 border-2 border-blue-500 rounded-lg p-4 shadow-lg animate-fade-in">
              <p className="text-xs text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{defendant.healthNote}</span>
              </p>
            </div>
          )}

          {/* Motility Speed Bar */}
          <div className="bg-gradient-to-b from-[#3d2817] to-[#2d1810] border-4 border-[#8b6f47] rounded-lg p-4 md:p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#d4b896] text-sm font-semibold">Progressive Motility:</span>
              <span className="text-[#f4e4c1] text-lg md:text-xl font-bold">{defendant.motility}%</span>
            </div>
            <div className="w-full bg-[#1a0f0a] rounded-full h-5 md:h-6 border-2 border-[#8b6f47] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
                style={{ width: `${defendant.motility}%` }}
              />
            </div>
            <p className="text-xs text-[#d4b896] mt-2 text-center">
              {defendant.motility < 32 ? "⚠️ Below WHO Standard (40%)" : defendant.motility < 40 ? "⚠️ Borderline" : "✅ Healthy Range"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleObjection}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 md:py-4 px-6 rounded-lg text-xl md:text-2xl shadow-lg transform transition-transform hover:scale-105 active:scale-95"
            >
              ⚡ OBJECTION! ⚡
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => handleNextDefendant(true)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 md:px-6 rounded-lg text-lg md:text-xl shadow-lg transition-colors"
              >
                GUILTY
              </button>
              <button
                onClick={() => handleNextDefendant(false)}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 md:px-6 rounded-lg text-lg md:text-xl shadow-lg transition-colors"
              >
                INNOCENT
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="text-center text-[#d4b896] text-sm">
            Case {currentDefendant + 1} of {defendants.length} • Guilty Verdicts: {guiltyCount}
          </div>
        </div>
      </div>
    </div>
  );
}