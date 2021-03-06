import React, {Suspense, useRef} from 'react';
import { StyleSheet, SafeAreaView, Pressable, Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import Field from '../components/Field';
import TeamStats from '../components/TeamStats';
import BottomSheet from '@gorhom/bottom-sheet';
import Filters from '../components/Filters'
import PlayersList from '../components/PlayersList';






export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const playersBottomSheet = useRef<BottomSheet>(null)
  const filtersBottomSheet = useRef<BottomSheet>(null);

  const viewPlayers = () => {
    playersBottomSheet.current?.expand()
  }
  
  const snapPoints = ["1%", '50%'];


  return (
    <SafeAreaView style={styles.container}>
      <TeamStats />
      <Field />


      <Pressable 
      onPress={viewPlayers} 
      style={styles.buttonContainer} >
        <Text>View players</Text>
      </Pressable>

      <BottomSheet ref={playersBottomSheet} index={0} snapPoints={snapPoints} >
      <Pressable
      onPress={() => filtersBottomSheet.current?.expand()} 
      style={[styles.buttonContainer, {marginTop: 25}]} >
        <Text>filters</Text>
        </Pressable>
        <Suspense fallback={<Text>Loading...</Text>}>
          <PlayersList />
        </Suspense>
          <PlayersList />
      </BottomSheet>

      <BottomSheet ref={filtersBottomSheet} index={0} snapPoints={snapPoints} >
          <Filters />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#72CC5E"
  },
  buttonContainer: {
    backgroundColor: 'orange', 
    width: '90%', 
    margin: 20, 
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 'auto',
    
  },
  contentContainer: {},
});
