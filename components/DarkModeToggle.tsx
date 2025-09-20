import React, { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react-native';

export const DarkModeToggle: React.FC = () => {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon size={24} color={colors.text} />
      ) : (
        <Sun size={24} color={colors.text} />
      )}
    </Pressable>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});