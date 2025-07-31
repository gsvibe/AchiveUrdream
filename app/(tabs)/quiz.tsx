import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Clock, Users, Star, Zap, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LeaderboardItem = ({ rank, name, score, isCurrentUser = false }) => (
  <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
    <View style={styles.rankBadge}>
      <Text style={styles.rankText}>{rank}</Text>
    </View>
    <Text style={styles.playerName}>{name}</Text>
    <View style={styles.scoreContainer}>
      <Star size={16} color="#fbbf24" />
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  </View>
);

const QuizOption = ({ option, isSelected, isCorrect, isWrong, onPress }) => (
  <TouchableOpacity
    style={[
      styles.quizOption,
      isSelected && styles.selectedOption,
      isCorrect && styles.correctOption,
      isWrong && styles.wrongOption,
    ]}
    onPress={onPress}
    disabled={isCorrect || isWrong}
  >
    <Text style={[
      styles.optionText,
      (isCorrect || isWrong) && styles.answeredOptionText
    ]}>
      {option}
    </Text>
    {isCorrect && <CheckCircle size={20} color="#10b981" />}
    {isWrong && <XCircle size={20} color="#ef4444" />}
  </TouchableOpacity>
);

export default function QuizScreen() {
  const [activeTab, setActiveTab] = useState('daily');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const sampleQuestions = [
    {
      question: "What is the derivative of x² + 3x + 2?",
      options: ["2x + 3", "x² + 3", "2x + 2", "3x + 2"],
      correct: 0,
      explanation: "The derivative of x² is 2x, derivative of 3x is 3, and derivative of a constant is 0."
    },
    {
      question: "Which of the following is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Helium", "Carbon"],
      correct: 2,
      explanation: "Helium is a noble gas with completely filled outer electron shell."
    }
  ];

  const leaderboardData = [
    { rank: 1, name: "Rajesh Kumar", score: 2450 },
    { rank: 2, name: "Priya Singh", score: 2380 },
    { rank: 3, name: "You", score: 2350, isCurrentUser: true },
    { rank: 4, name: "Amit Sharma", score: 2320 },
    { rank: 5, name: "Sneha Patel", score: 2290 },
  ];

  useEffect(() => {
    if (timeLeft > 0 && activeTab === 'daily' && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, activeTab, showResult]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      setShowResult(true);
      if (answerIndex === sampleQuestions[currentQuestion].correct) {
        setScore(score + 10);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      Alert.alert('Quiz Complete!', `Your final score: ${score}/20`);
    }
  };

  const handleExtraQuiz = () => {
    Alert.alert(
      'Extra Quiz',
      'Purchase extra quiz for ₹5?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Buy Now', onPress: () => Alert.alert('Payment', 'Redirecting to payment...') }
      ]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderDailyQuiz = () => (
    <View style={styles.quizContainer}>
      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <View style={styles.quizInfo}>
          <Text style={styles.questionCounter}>
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </Text>
          <View style={styles.timerContainer}>
            <Clock size={16} color="#ef4444" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreLabel}>Score: {score}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {sampleQuestions[currentQuestion].question}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {sampleQuestions[currentQuestion].options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            isSelected={selectedAnswer === index}
            isCorrect={showResult && index === sampleQuestions[currentQuestion].correct}
            isWrong={showResult && selectedAnswer === index && index !== sampleQuestions[currentQuestion].correct}
            onPress={() => !showResult && handleAnswerSelect(index)}
          />
        ))}
      </View>

      {/* Explanation */}
      {showResult && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>
            {sampleQuestions[currentQuestion].explanation}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderLeaderboard = () => (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.leaderboardTitle}>🏆 Weekly Leaderboard</Text>
      {leaderboardData.map((player) => (
        <LeaderboardItem key={player.rank} {...player} />
      ))}
      
      <TouchableOpacity style={styles.extraQuizButton} onPress={handleExtraQuiz}>
        <LinearGradient
          colors={['#f59e0b', '#d97706']}
          style={styles.extraQuizGradient}
        >
          <Zap size={20} color="#ffffff" />
          <Text style={styles.extraQuizText}>Extra Quiz - ₹5</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Daily Quiz</Text>
        <Text style={styles.headerSubtitle}>Challenge yourself and compete with others</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
            Daily Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'daily' ? renderDailyQuiz() : renderLeaderboard()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  quizContainer: {
    flex: 1,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quizInfo: {
    flex: 1,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 4,
  },
  scoreDisplay: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  quizOption: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  correctOption: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
  wrongOption: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  answeredOptionText: {
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  leaderboardContainer: {
    flex: 1,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentUserItem: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  rankBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 4,
  },
  extraQuizButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  extraQuizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  extraQuizText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
});