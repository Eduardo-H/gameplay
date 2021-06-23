import React from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../Guild';
import { ListDivider } from '../ListDivider';

import { styles } from './styles';

type GuildsProps = {
  handleGuildSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelected }: GuildsProps) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true
    },
    {
      id: '2',
      name: 'NEW F3AR',
      icon: null,
      owner: true
    }
  ]
  
  return (
   <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Guild 
            data={item}
            onPress={() => handleGuildSelected(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.guilds}
      />
   </View> 
  );
}