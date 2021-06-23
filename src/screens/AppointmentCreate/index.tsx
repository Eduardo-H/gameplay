import React, { useState } from 'react';
import { 
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { ModalView } from '../../components/ModalView';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Guilds } from '../../components/Guilds';
import { GuildProps } from '../../components/Guild';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleOpenGuildsModal() {
    setOpenGuildsModal(true);
  }

  function handleGuildSelected(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Header 
          title="Agendar partida"
        />

        <Text style={[
          styles.label, 
          { marginLeft: 24, marginTop:36, marginBottom: 18 }
        ]}>
          Categorias
        </Text>

        <CategorySelect
          hasCheckbox
          setCategory={handleCategorySelect}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuildsModal}>
            <View style={styles.select}>
              
              {
                guild.icon 
                ? <GuildIcon/> 
                : <View style={styles.image} />
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  { guild.name ? guild.name : 'Selecion um servidor'}
                </Text>
              </View>

              <Feather 
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
              />
            
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>
                Data
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>
                Horário
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.caractersLimit}>
              Max 100 caracteres
            </Text>
          </View>
          
          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
          />

          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
        </View>
      </ScrollView>

      <ModalView visible={openGuildsModal}>
        <Guilds handleGuildSelected={handleGuildSelected} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}