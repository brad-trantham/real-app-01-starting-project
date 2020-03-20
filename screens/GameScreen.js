import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, props.userChoice))
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(99)

    // object destructuring, just to save some typing (no need for props.X later)
    const {userChoice, onGameOver} = props

    // by default, this function will run after every render cycle
    // if you declare dependencies then its re-run when any of its declared dependencies changes
    useEffect(() => {
        if(currentGuess === props.userChoice) {
            props.onGameOver(rounds)
        }
    },
    // you don't want to just declare props as a dependency because then this is rerun
    // anytime the parent changes at all
    [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if(("LOWER" === direction && currentGuess < props.userChoice) ||
           ("HIGHER" === direction && currentGuess > props.userChoice)) {
              Alert.alert('Nice try', 'No cheating', [{text: 'Try again', style: 'cancel'}])
              return
           }
        if("LOWER" === direction) {
            currentHigh.current = currentGuess
        }
        if("HIGHER" === direction) {
            currentLow.current = currentGuess
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNum)
        setRounds(currentRounds => currentRounds + 1)
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'LOWER')}><Ionicons name='ios-arrow-down' size={24} color='white'/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'HIGHER')}><Ionicons name='ios-arrow-up' size={24} color='white'/></MainButton>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems: 'center'
   },
   buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       marginTop: 20,
       width: 400,
       maxWidth: '90%'
   }
})

export default GameScreen