import React from 'react';
import { View, ScrollView } from 'react-native';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type CategorySelectProps = {
  categorySelected: string;
  hasCheckbox?: boolean;
  setCategory: (category: string) => void;
}

export function CategorySelect({ 
  categorySelected, 
  hasCheckbox = false,
  setCategory 
}: CategorySelectProps) {
  return (
    <ScrollView 
      horizontal  
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        categories.map(category => (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
            hasCheckbox={hasCheckbox}
          />
        ))
      }
    </ScrollView>
  );
}