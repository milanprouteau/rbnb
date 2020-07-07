import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class PriceBox extends Component{

    render() {

        let {price, style} = this.props;

        return(
            <View  style={[styles.container, {...style}]}>
                <Text style={styles.price}>{price}€ / jour</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8D0243",
        paddingHorizontal: 20,
        paddingVertical: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    price: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold"
    },



});

export default PriceBox;
