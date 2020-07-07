import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    Button,
    TouchableOpacity,
    StyleSheet,
    Linking
} from 'react-native';
import Title from "../components/Title";
import {updateFavoris} from "../actions/favoris.actions";
import {connect} from 'react-redux';
import PriceBox from '../components/PriceBox';


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params.data,
            short_description: null,
            description: null,
            isFavoris: false
        }
    }

    componentDidMount() {
        let {description} = this.state.data;
        let short_description = description.replace(/(<([^>]+)>)/ig, '').substr(0,300) + "...";
        description = description.replace(/(<([^>]+)>)/ig, '');

        let isFavoris = false;
        let {favoris} = this.props;
        let {data} = this.state;

        favoris.includes(data.id) ? isFavoris = true : isFavoris = false;
        this.setState({short_description, description, isFavoris});
    }

    openDescription(){
        this.setState({short_description: this.state.description});
    }

    goToLink(){
        let {listing_url} = this.state.data;
        if(Linking.canOpenURL(listing_url)){
            Linking.openURL(listing_url);
        }
    }


    addOrDeleteFavoris(){
        let {favoris} = this.props;
        let {id} = this.state.data;

        favoris.includes(id) ? favoris.splice(favoris.indexOf(id), 1) : favoris.push(id);
        this.props.updateFavoris(favoris);
        console.log(this.props.favoris);
        this.setState({ isFavoris : !!favoris.includes(id) })
    }

    addFavoris(){
        let {favoris} = this.props;
        let {id} = this.state.data;

        if(!favoris.includes(id)){
            favoris.push(id);
            this.props.updateFavoris(favoris);
            this.setState({isFavoris: true});
        }
    }

    deleteFavoris(){
        let {favoris} = this.props;
        let {id} = this.state.data;

        favoris.splice(favoris.indexOf(id), 1);
        this.props.updateFavoris(favoris);
        this.setState({isFavoris: false});
    }

    render() {

        let {xl_picture_url,
             title,
             description,
             review_scores_accuracy,
             accommodates,
             price
            } = this.state.data;
        let {short_description, isFavoris} = this.state;


        return (
            <ScrollView style={styles.container}>

                <ImageBackground style={styles.headerImage} source={{uri: xl_picture_url}}></ImageBackground>
                <PriceBox style={styles.dateBox} price={price} />
                <View style={styles.body}>
                    <Title title={title}/>
                    <Text>Note: {review_scores_accuracy} / 10</Text>
                    <Text>Peut accueillir jusqu'à {accommodates} personnes.</Text>
                    <Text>Description:</Text>
                    <Text onPress={() => this.openDescription()}>{short_description}</Text>

                    <Button title={isFavoris ? "Supprimer des favoris" : "Ajouter aux favoris"} onPress={() => this.addOrDeleteFavoris()}/>

                    <Button title={"Réservation"} onPress={() => this.goToLink()}/>

                </View>

            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    headerImage: {
        height: 300
    },
    body: {

    }
});

const mapStateToProps = state => {
    return {
        favoris: state.favoris
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateFavoris: favoris => {dispatch(updateFavoris(favoris))},
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Details);
