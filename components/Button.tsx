import React, { useContext } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#FFFFFF' : colors.primary}
          />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 4,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});