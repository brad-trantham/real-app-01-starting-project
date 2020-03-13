import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    // putting props.style second ensures that it overwrites anything in styles.card
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        // borderradius gives rounded corners
        borderRadius: 10,
        // shadow props are ios only
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // elevation does the same for android
        elevation: 5
    }
})

export default Card;