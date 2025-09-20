import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return <View style={[styles.card, style]}>{children}</View>;
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
});