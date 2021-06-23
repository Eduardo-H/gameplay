import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment } from '../../components/Appointment';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails');
  }

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da MD10'
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da MD10'
    }
  ];

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      <View style={styles.content}>
        <ListHeader
          title="Partidas agendadas"
          subtitle="Total 6"
        />

        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment 
              data={item}
              onPress={handleAppointmentDetails} 
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}