import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Mic, Volume2, BookOpen, Calculator, Atom, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SubjectButton = ({ icon: Icon, title, color, onPress }) => (
  <TouchableOpacity style={[styles.subjectButton, { backgroundColor: color }]} onPress={onPress}>
    <Icon size={24} color="#ffffff" />
    <Text style={styles.subjectButtonText}>{title}</Text>
  </TouchableOpacity>
);

const MessageBubble = ({ message, isUser, timestamp }) => (
  <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.aiMessage]}>
    <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
      {message}
    </Text>
    <Text style={styles.timestamp}>{timestamp}</Text>
  </View>
);

export default function TutorScreen() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hi! I'm your AI tutor. Ask me anything about JEE, NEET, UPSC, or IELTS. I can help with Math, Physics, Chemistry, Biology, History, and more!",
      isUser: false,
      timestamp: "Just now"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      id: Date.now(),
      message: question,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        message: `Great question! Let me break this down step by step:\n\n1. First, understand the core concept\n2. Apply the relevant formula or principle\n3. Work through the calculation\n4. Verify the answer\n\nFor ${question.toLowerCase().includes('math') ? 'mathematics' : question.toLowerCase().includes('physics') ? 'physics' : 'this topic'}, remember to always check your units and consider the physical meaning of your result.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    Alert.alert('Voice Input', 'Voice input feature will be available soon!');
  };

  const handleTextToSpeech = () => {
    Alert.alert('Text to Speech', 'Text-to-speech feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AchieveUrDream AI Tutor</Text>
        <Text style={styles.headerSubtitle}>Ask anything, get instant expert answers</Text>
      </LinearGradient>

      {/* Subject Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectContainer}>
        <SubjectButton icon={Calculator} title="Math" color="#3b82f6" onPress={() => setQuestion('Help me with calculus')} />
        <SubjectButton icon={Atom} title="Physics" color="#10b981" onPress={() => setQuestion('Explain quantum mechanics')} />
        <SubjectButton icon={BookOpen} title="Chemistry" color="#f59e0b" onPress={() => setQuestion('Organic chemistry reactions')} />
        <SubjectButton icon={Globe} title="Biology" color="#ef4444" onPress={() => setQuestion('Cell division process')} />
      </ScrollView>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask your question here..."
            value={question}
            onChangeText={setQuestion}
            multiline
            maxLength={500}
          />
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleVoiceInput}>
              <Mic size={20} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleTextToSpeech}>
              <Volume2 size={20} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, !question.trim() && styles.sendButtonDisabled]}
              onPress={handleSendQuestion}
              disabled={!question.trim() || isLoading}
            >
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  subjectContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  subjectButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  userMessage: {
    backgroundColor: '#6366f1',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 8,
  },
  aiMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#1f2937',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'right',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 8,
    marginBottom: 12,
  },
  loadingText: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    color: '#1f2937',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginRight: 4,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    padding: 10,
    borderRadius: 20,
    marginLeft: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
});