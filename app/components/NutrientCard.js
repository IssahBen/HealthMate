import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const NutrientCard = ({ nutrient }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'vitamin': return { bg: '#DCFCE7', text: '#16A34A' };
      case 'mineral': return { bg: '#DBEAFE', text: '#2563EB' };
      case 'fatty-acid': return { bg: '#FEF3C7', text: '#D97706' };
      case 'amino-acid': return { bg: '#FCE7F3', text: '#DB2777' };
      default: return { bg: '#F3E8FF', text: '#7C3AED' };
    }
  };

  const categoryColors = getCategoryColor(nutrient.category);

  const renderList = (items, icon, title, iconColor) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name={icon} size={18} color={iconColor} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {items.map((item, index) => (
        <Text key={index} style={styles.listItem}>• {item}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColors.bg }]}>
            <Text style={[styles.categoryText, { color: categoryColors.text }]}>
              {nutrient.category.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.title}>{nutrient.name}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bookmark" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {renderList(nutrient.benefits, 'heart', 'Benefits', '#EF4444')}
      {renderList(nutrient.deficiencySymptoms, 'droplet', 'Deficiency Symptoms', '#3B82F6')}
      {renderList(nutrient.sources, 'coffee', 'Food Sources', '#10B981')}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="clock" size={18} color="#F59E0B" />
          <Text style={styles.sectionTitle}>Recommended Daily Dosage</Text>
        </View>
        <Text style={styles.dosage}>
          <Text style={styles.dosageValue}>{nutrient.dailyDosage}</Text> {nutrient.unit} per day
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  listItem: {
    marginLeft: 26,
    marginBottom: 4,
    color: '#6B7280',
    fontSize: 14,
  },
  dosage: {
    marginLeft: 26,
    color: '#6B7280',
    fontSize: 14,
  },
  dosageValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
});

export default NutrientCard;