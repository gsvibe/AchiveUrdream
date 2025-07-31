import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Video, Upload, BookOpen, Star, Download } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ToolCard = ({ icon: Icon, title, description, premium = false, onPress }) => (
  <TouchableOpacity style={styles.toolCard} onPress={onPress}>
    <View style={styles.toolHeader}>
      <LinearGradient
        colors={premium ? ['#8b5cf6', '#6366f1'] : ['#3b82f6', '#1d4ed8']}
        style={styles.toolIcon}
      >
        <Icon size={24} color="#ffffff" />
        {premium && <Star size={12} color="#fbbf24" style={styles.premiumBadge} />}
      </LinearGradient>
      <View style={styles.toolContent}>
        <Text style={styles.toolTitle}>{title}</Text>
        <Text style={styles.toolDescription}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const GeneratedNote = ({ title, content, onDownload }) => (
  <View style={styles.noteCard}>
    <View style={styles.noteHeader}>
      <Text style={styles.noteTitle}>{title}</Text>
      <TouchableOpacity onPress={onDownload}>
        <Download size={20} color="#6366f1" />
      </TouchableOpacity>
    </View>
    <Text style={styles.noteContent} numberOfLines={3}>
      {content}
    </Text>
  </View>
);

export default function ToolsScreen() {
  const [activeTab, setActiveTab] = useState('tools');
  const [inputText, setInputText] = useState('');
  const [topic, setTopic] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState([
    {
      id: 1,
      title: "Photosynthesis Overview",
      content: "Introduction: Photosynthesis is the process by which plants convert light energy into chemical energy...\n\nKey Points:\n1. Light-dependent reactions\n2. Calvin cycle\n3. Chloroplast structure\n\nSummary: Essential process for life on Earth..."
    },
    {
      id: 2,
      title: "Calculus Derivatives",
      content: "Introduction: Derivatives measure the rate of change of functions...\n\nKey Concepts:\n1. Limit definition\n2. Power rule\n3. Chain rule\n\nApplications: Physics, optimization problems..."
    }
  ]);

  const handleMCQGenerate = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to generate MCQs');
      return;
    }
    
    Alert.alert(
      'MCQ Generated!',
      'Successfully generated 5 MCQs from your text with explanations.',
      [{ text: 'View MCQs', onPress: () => {} }]
    );
  };

  const handleNotesGenerate = () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a topic to generate notes');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: topic,
      content: `Introduction: Comprehensive overview of ${topic}...\n\nKey Points:\n1. Fundamental concepts\n2. Important formulas\n3. Real-world applications\n\nSummary: Essential knowledge for exam preparation...`
    };

    setGeneratedNotes(prev => [newNote, ...prev]);
    setTopic('');
    Alert.alert('Success', 'Notes generated successfully!');
  };

  const handleVideoSummarize = () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    Alert.alert(
      'Video Summarized!',
      'Successfully extracted key points and generated notes from the video.',
      [{ text: 'View Summary', onPress: () => {} }]
    );
  };

  const handleDocumentUpload = () => {
    Alert.alert(
      'Upload Document',
      'Choose upload method:',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera feature will open soon') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery feature will open soon') },
        { text: 'Files', onPress: () => Alert.alert('Files', 'File picker will open soon') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderTools = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Tools</Text>
        
        <ToolCard
          icon={FileText}
          title="MCQ Generator"
          description="Generate multiple-choice questions from any text or topic"
          onPress={() => setActiveTab('mcq')}
        />
        
        <ToolCard
          icon={BookOpen}
          title="Notes Generator"
          description="Create structured study notes from any topic"
          onPress={() => setActiveTab('notes')}
          premium
        />
        
        <ToolCard
          icon={Video}
          title="Video Summarizer"
          description="Get key points and notes from YouTube videos"
          onPress={() => setActiveTab('video')}
          premium
        />
        
        <ToolCard
          icon={Upload}
          title="Document Chat"
          description="Upload PDFs or photos and ask questions about them"
          onPress={handleDocumentUpload}
          premium
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Packs</Text>
        
        <TouchableOpacity style={styles.courseCard}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.courseGradient}
          >
            <Text style={styles.courseTitle}>NEET Biology Pack</Text>
            <Text style={styles.courseDescription}>Complete biology preparation with 500+ MCQs</Text>
            <Text style={styles.coursePrice}>₹299</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.courseCard}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={styles.courseGradient}
          >
            <Text style={styles.courseTitle}>JEE Math Practice</Text>
            <Text style={styles.courseDescription}>Advanced math problems with detailed solutions</Text>
            <Text style={styles.coursePrice}>₹399</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMCQGenerator = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.generatorContainer}>
        <Text style={styles.generatorTitle}>MCQ Generator</Text>
        <Text style={styles.generatorSubtitle}>Enter text, topic, or paste content to generate MCQs</Text>
        
        <TextInput
          style={styles.multilineInput}
          placeholder="Enter your text or topic here..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        
        <TouchableOpacity style={styles.generateButton} onPress={handleMCQGenerate}>
          <Text style={styles.generateButtonText}>Generate MCQs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderNotesGenerator = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.generatorContainer}>
        <Text style={styles.generatorTitle}>AI Notes Generator</Text>
        <Text style={styles.generatorSubtitle}>Enter a topic to generate structured study notes</Text>
        
        <TextInput
          style={styles.singleLineInput}
          placeholder="e.g., Photosynthesis, Calculus, World War 2"
          value={topic}
          onChangeText={setTopic}
        />
        
        <TouchableOpacity style={styles.generateButton} onPress={handleNotesGenerate}>
          <Text style={styles.generateButtonText}>Generate Notes</Text>
        </TouchableOpacity>
        
        <View style={styles.notesSection}>
          <Text style={styles.notesSectionTitle}>Generated Notes</Text>
          {generatedNotes.map((note) => (
            <GeneratedNote
              key={note.id}
              title={note.title}
              content={note.content}
              onDownload={() => Alert.alert('Download', `Downloading ${note.title}...`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderVideoSummarizer = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.generatorContainer}>
        <Text style={styles.generatorTitle}>YouTube Video Summarizer</Text>
        <Text style={styles.generatorSubtitle}>Paste a YouTube URL to get key points and notes</Text>
        
        <TextInput
          style={styles.singleLineInput}
          placeholder="https://youtube.com/watch?v=..."
          value={youtubeUrl}
          onChangeText={setYoutubeUrl}
          keyboardType="url"
        />
        
        <TouchableOpacity style={styles.generateButton} onPress={handleVideoSummarize}>
          <Text style={styles.generateButtonText}>Summarize Video</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>AchieveUrDream Tools</Text>
        <Text style={styles.headerSubtitle}>Powerful tools to accelerate your learning</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      {activeTab !== 'tools' && (
        <View style={styles.backContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setActiveTab('tools')}
          >
            <Text style={styles.backButtonText}>← Back to Tools</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'tools' && renderTools()}
        {activeTab === 'mcq' && renderMCQGenerator()}
        {activeTab === 'notes' && renderNotesGenerator()}
        {activeTab === 'video' && renderVideoSummarizer()}
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
  backContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  toolCard: {
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
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  courseCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  courseGradient: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 12,
  },
  coursePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  generatorContainer: {
    flex: 1,
  },
  generatorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  generatorSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  multilineInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
    minHeight: 120,
  },
  singleLineInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  notesSection: {
    marginTop: 8,
  },
  notesSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  noteContent: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});