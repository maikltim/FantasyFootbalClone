import React from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { Player } from '../types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {myPlayersState} from '../atoms/MyTeam';
import { myFormationState } from '../atoms/MyTeam';


interface Props {
    player: Player;
}

const PlayerListItem = ({player}: Props) => {
    const [myPlayers, setMyPlayers] = useRecoilState(myPlayersState);
    const myFormation = useRecoilValue(myFormationState) 

    const numberOfPlayersOnPosition = myPlayers.filter(p => p.position === player.position).length
    

    const onPress = () => {
        setMyPlayers((curPlayers) => {
            if(curPlayers.some((p: Player) => p.id === player.id)) {
                return curPlayers.filter(p => p.id !== player.id )
            }

            if(numberOfPlayersOnPosition < myFormation[player.position]) {
                return [...curPlayers, player]
            }
            return curPlayers
        })
    }

    const isSelected = myPlayers.some((p: Player) => p.id === player.id);

    return (
        <Pressable onPress={onPress} style={[styles.container, {backgroundColor: isSelected ? '#d170db' : 'white'}]}>
            <Image source={{uri: `https://media.api-sports.io/football/players/${player.id}.png`}} style={styles.image} />
            <View style={{flexGrow: 1}}>
                <Text style={styles.name} >{player.name}</Text>
                <Text>{player.match}</Text>
            </View>

            <View style={styles.colContainer}> 
                <Text style={styles.name} >${(player.price / 1000000).toFixed(1)}m</Text>
                <Text>{player.position}</Text>
            </View>

            <Text style={styles.points} >{player.totalPoints}</Text>

        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#eee'
    },
    colContainer: {
        marginHorizontal: 15,
        alignItems: 'flex-end',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold'
    },
    points: {
        fontWeight: 'bold'
    }
})

export default PlayerListItem
