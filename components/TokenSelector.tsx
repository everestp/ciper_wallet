import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Token } from '@/context/WalletContext';
import { Check } from 'lucide-react-native';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token;
  onTokenChange: (token: Token) => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  tokens,
  selectedToken,
  onTokenChange,
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {tokens.map((token) => {
          const isSelected = token.symbol === selectedToken.symbol;
          return (
            <Pressable
              key={token.symbol}
              style={[
                styles.tokenOption,
                isSelected && styles.selectedOption,
              ]}
              onPress={() => onTokenChange(token)}
            >
              <View style={styles.tokenInfo}>
                <View style={[styles.tokenIcon, isSelected && styles.selectedIcon]}>
                  <Text style={styles.tokenIconText}>{token.symbol[0]}</Text>
                </View>
                <View style={styles.tokenDetails}>
                  <Text style={[styles.tokenSymbol, isSelected && styles.selectedText]}>
                    {token.symbol}
                  </Text>
                  <Text style={styles.tokenBalance}>
                    {token.balance.toFixed(4)}
                  </Text>
                </View>
              </View>
              {isSelected && (
                <View style={styles.checkIcon}>
                  <Check size={16} color={colors.primary} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  tokenOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
    minWidth: 140,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenIcon: {
    width: 32,
    height: 32,
    backgroundColor: colors.textSecondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    backgroundColor: colors.primary,
  },
  tokenIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  tokenDetails: {
    gap: 2,
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
  },
  tokenBalance: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkIcon: {
    marginLeft: 8,
  },
});