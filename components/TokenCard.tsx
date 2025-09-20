import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Token } from '@/context/WalletContext';
import { Card } from './Card';
import { TrendingUp } from 'lucide-react-native';

interface TokenCardProps {
  token: Token;
  showBalance: boolean;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, showBalance }) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const totalValue = token.balance * token.price;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.tokenInfo}>
          <View style={styles.tokenIcon}>
            <Text style={styles.tokenIconText}>{token.symbol[0]}</Text>
          </View>
          <View>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            <Text style={styles.tokenName}>{token.name}</Text>
          </View>
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>${token.price.toFixed(2)}</Text>
          <View style={styles.changeIndicator}>
            <TrendingUp size={12} color={colors.success} />
          </View>
        </View>
      </View>
      
      <View style={styles.balance}>
        <Text style={styles.balanceAmount}>
          {showBalance ? token.balance.toFixed(4) : '••••'} {token.symbol}
        </Text>
        <Text style={styles.balanceValue}>
          {showBalance ? `$${totalValue.toFixed(2)}` : '••••'}
        </Text>
      </View>
    </Card>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tokenName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  changeIndicator: {
    marginTop: 2,
  },
  balance: {
    alignItems: 'center',
    gap: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  balanceValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});