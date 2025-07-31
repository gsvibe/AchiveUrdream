import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, Target, BookOpen, Users, Star, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';

const FeatureCard = ({ icon: Icon, title, description, onPress, premium = false }) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress}>
    <LinearGradient
      colors={premium ? ['#8b5cf6', '#6366f1'] : ['#3b82f6', '#1d4ed8']}
      style={styles.featureGradient}
    >
      <Icon size={32} color="#ffffff" />
      {premium && <Star size={16} color="#fbbf24" style={styles.premiumBadge} />}
    </LinearGradient>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const StatCard = ({ value, label, color }) => (
  <View style={styles.statCard}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#d946ef']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroTitle}>AchieveUrDream</Text>
          <Text style={styles.heroSubtitle}>Master JEE, NEET, UPSC & IELTS with AI-powered learning</Text>
          <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/tutor')}>
            <Text style={styles.heroButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <StatCard value="50K+" label="Students" color="#6366f1" />
          <StatCard value="98%" label="Success Rate" color="#10b981" />
          <StatCard value="24/7" label="AI Support" color="#f59e0b" />
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Features</Text>
          
          <FeatureCard
            icon={Brain}
            title="AI Tutor"
            description="Get instant answers to any question with step-by-step explanations"
            onPress={() => router.push('/tutor')}
          />
          
          <FeatureCard
            icon={Target}
            title="Daily Quiz"
            description="Test your knowledge with AI-generated questions from past papers"
            onPress={() => router.push('/quiz')}
          />
          
          <FeatureCard
            icon={BookOpen}
            title="Smart Notes"
            description="Generate structured notes from any topic or chapter"
            onPress={() => router.push('/tools')}
            premium
          />
          
          <FeatureCard
            icon={Users}
            title="Leaderboard"
            description="Compete with friends and track your progress"
            onPress={() => router.push('/quiz')}
          />
        </View>

        {/* Study Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Categories</Text>
          <View style={styles.categoryGrid}>
            {['JEE Main', 'JEE Advanced', 'NEET', 'UPSC', 'IELTS', 'Class 12'].map((category) => (
              <TouchableOpacity key={category} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subscription CTA */}
        <TouchableOpacity style={styles.subscriptionCTA} onPress={() => router.push('/profile')}>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.subscriptionGradient}
          >
            <TrendingUp size={24} color="#ffffff" />
            <View style={styles.subscriptionContent}>
              <Text style={styles.subscriptionTitle}>Upgrade to Premium</Text>
              <Text style={styles.subscriptionSubtitle}>Unlimited access to all features for ₹499/month</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroSection: {
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureGradient: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  subscriptionCTA: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscriptionGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  subscriptionContent: {
    marginLeft: 16,
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subscriptionSubtitle: {
    fontSize: 14,
    color: '#fef3c7',
  },
});