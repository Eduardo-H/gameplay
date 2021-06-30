import React, { useState, useEffect } from 'react';
import { 
  View, 
  ImageBackground, 
  Text,
  FlatList, 
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { theme } from '../../global/styles/theme';

import BannerImg from '../../assets/banner.png';
import { styles } from './styles';

import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string | null;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;
  const navigation = useNavigation();

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

      if (response) {
        setWidget(response.data);
      } else {
        setWidget({
          id: '',
          name: guildSelected.guild.name,
          instant_invite: null,
          members: []
        })
      }
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o widget do servidor está habilitado?')
    } finally {
      setLoading(false);
    }
  }

  async function handleShareInvite() {
    Alert.alert('Remover', `Deseja remover a partida?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await deleteAppointment();
          } catch (error) {
            Alert.alert('Não foi possível remover');
          }
        }
      }
    ]);
    
  }

  function handleOpenGuild(){
    Linking.openURL(widget.instant_invite);
  }

  async function deleteAppointment() {
    const data = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments: AppointmentProps[] = data ? JSON.parse(data) : [];

    const index = appointments.findIndex((item, index) => {
      if (item.id === guildSelected.id) {
        return index;
      }
    });
    
    console.log(index);

    if (index >= 0){
      delete appointments[index];
      await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify(appointments));
      navigation.navigate('Home');
    } else {
      throw Error;
    }    
  }

  useEffect(() => {
    fetchGuildWidget();
  },[]);

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton onPress={handleShareInvite}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.colors.heading}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            { guildSelected.guild.name }
          </Text>

          <Text style={styles.subtitle}>
            { guildSelected.description }
          </Text>
        </View>
      </ImageBackground>

      {
        loading 
        ? 
          <Load /> 
        :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={
                `Total ${widget.members ? widget.members.length : 'desconhecido'}`
              }
            />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              contentContainerStyle={{ paddingBottom: 20 }}
              style={styles.members}
            />
          </>
      }

      {
        guildSelected.guild.owner &&
          <View style={styles.footer}>
            <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
          </View> 
      }
    </Background>
  );
}