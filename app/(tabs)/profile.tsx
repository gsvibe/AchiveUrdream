import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Crown, Gift, Settings, CreditCard, Share, Trophy, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileCard = ({ icon: Icon, title, value, color }) => (
  <View style={styles.profileCard}>
    <Icon size={24} color={color} />
    <View style={styles.profileCardContent}>
      <Text style={styles.profileCardTitle}>{title}</Text>
      <Text style={styles.profileCardValue}>{value}</Text>
    </View>
  </View>
);

const MenuOption = ({ icon: Icon, title, subtitle, onPress, rightElement }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <Icon size={24} color="#6366f1" />
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [referralCode] = useState('STUDY2024');

  const handleSubscribe = () => {
    Alert.alert(
      'Premium Subscription',
      'Subscribe to Premium for ₹499/month?\n\nBenefits:\n• Unlimited AI tutoring\n• All mock tests\n• Video summaries\n• Premium badge\n• Ad-free experience',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: () => {
            Alert.alert('Payment', 'Redirecting to payment gateway...');
            // Here you would integrate with Razorpay
          }
        }
      ]
    );
  };

  const handleReferral = () => {
    Alert.alert(
      'Referral Program',
      `Your referral code: ${referralCode}\n\nShare this code with friends and earn ₹25 for every friend who makes a payment!`,
      [
        { text: 'Copy Code', onPress: () => Alert.alert('Copied!', 'Referral code copied to clipboard') },
        { text: 'Share', onPress: () => Alert.alert('Share', 'Opening share options...') }
      ]
    );
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings page will be available soon!');
  };

  const handlePaymentHistory = () => {
    Alert.alert('Payment History', 'Payment history will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            <User size={48} color="#ffffff" />
          </View>
          <Text style={styles.userName}>Rahul Sharma</Text>
          <Text style={styles.userEmail}>rahul.sharma@email.com</Text>
          {isSubscribed && (
            <View style={styles.premiumBadge}>
              <Crown size={16} color="#fbbf24" />
              <Text style={styles.premiumText}>Premium Member</Text>
            </View>
          )}
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <ProfileCard
            icon={Trophy}
            title="Rank"
            value="#3"
            color="#f59e0b"
          />
          <ProfileCard
            icon={Star}
            title="Points"
            value="2,350"
            color="#6366f1"
          />
        </View>

        {/* Subscription Section */}
        {!isSubscribed && (
          <TouchableOpacity style={styles.subscriptionCard} onPress={handleSubscribe}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.subscriptionGradient}
            >
              <Crown size={32} color="#ffffff" />
              <View style={styles.subscriptionContent}>
                <Text style={styles.subscriptionTitle}>Upgrade to Premium</Text>
                <Text style={styles.subscriptionSubtitle}>
                  Unlimited access to all features
                </Text>
                <Text style={styles.subscriptionPrice}>₹499/month</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <MenuOption
            icon={Gift}
            title="Referral Program"
            subtitle={`Your code: ${referralCode} • Earn ₹25 per referral`}
            onPress={handleReferral}
            rightElement={<Share size={20} color="#6b7280" />}
          />
          
          <MenuOption
            icon={CreditCard}
            title="Payment History"
            subtitle="View your subscription and purchase history"
            onPress={handlePaymentHistory}
          />
          
          <MenuOption
            icon={Settings}
            title="Settings"
            subtitle="Notifications, privacy, and more"
            onPress={handleSettings}
          />
        </View>

        {/* Study Progress */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Progress</Text>
          
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>This Week</Text>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>12</Text>
                <Text style={styles.progressLabel}>Quizzes</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>45</Text>
                <Text style={styles.progressLabel}>Questions</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>8h</Text>
                <Text style={styles.progressLabel}>Study Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Course Packs Owned */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>My Course Packs</Text>
          
          <View style={styles.coursePackCard}>
            <Text style={styles.coursePackTitle}>NEET Biology Pack</Text>
            <Text style={styles.coursePackProgress}>Progress: 65% Complete</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>
          
          <TouchableOpacity style={styles.buyMoreButton}>
            <Text style={styles.buyMoreText}>Browse More Course Packs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
    paddingBottom: 40,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 12,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  premiumText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fbbf24',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileCardContent: {
    alignItems: 'center',
    marginTop: 8,
  },
  profileCardTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  profileCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subscriptionCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscriptionGradient: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  subscriptionContent: {
    marginLeft: 16,
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subscriptionSubtitle: {
    fontSize: 14,
    color: '#fef3c7',
    marginBottom: 8,
  },
  subscriptionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  coursePackCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  coursePackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  coursePackProgress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  buyMoreButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
});