import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Card } from './Card';
import { CircleCheck as CheckCircle, Star } from 'lucide-react-native';

interface Merchant {
  id: string;
  name: string;
  category: string;
  verified: boolean;
  rating: number;
  description: string;
}

interface MerchantCardProps {
  merchant: Merchant;
}

export const MerchantCard: React.FC<MerchantCardProps> = ({ merchant }) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          color={i < merchant.rating ? colors.warning : colors.border}
          fill={i < merchant.rating ? colors.warning : 'transparent'}
        />
      );
    }
    return stars;
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.merchantInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.merchantName}>{merchant.name}</Text>
            {merchant.verified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle size={16} color={colors.success} />
              </View>
            )}
          </View>
          <Text style={styles.category}>{merchant.category}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStars()}
          </View>
          <Text style={styles.ratingText}>{merchant.rating.toFixed(1)}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{merchant.description}</Text>
    </Card>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  merchantInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  verifiedBadge: {
    backgroundColor: colors.successLight,
    borderRadius: 10,
    padding: 2,
  },
  category: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});