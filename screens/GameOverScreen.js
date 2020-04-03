import React from 'react'
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return(
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} 
                        source={require('../assets/success.png')} 
                        //    source={{uri: 'https://npinopunintended.files.wordpress.com/2012/05/game-over-1.jpeg'}}
                        //    // fade duration only applies to the first load, it's cached after that
                        //    fadeDuration={1000}
                        resizeMode='cover'/>
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds 
                    to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
                    <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        // unlike most components in react native, <text> nested inside of <text> will inherit
        // style from its parent
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
})

export default GameOverScreen