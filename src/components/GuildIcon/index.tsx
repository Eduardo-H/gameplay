import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://i.pinimg.com/originals/8c/c4/92/8cc492be438c76b99371d691d23cff8f.jpg';

  return (
    <Image 
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}