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
        let {access_link} = this.state.data;
        if(Linking.canOpenURL(access_link)){
            Linking.openURL(access_link);
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

   /* addFavoris(){
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
    }*/

    render() {

        let {cover_url, title, description,
            contact_name, contact_phone} = this.state.data;
        let {short_description, isFavoris} = this.state;


        return (
            <ScrollView style={styles.container}>

                <ImageBackground style={styles.headerImage} source={{uri: cover_url}}></ImageBackground>

                <View style={styles.body}>
                    <Title title={title}/>

                    <View>
                        {/*Badges de catégories*/}
                    </View>

                    {/*Box icon*/}

                    <View>
                        {/*Info du calendrier*/}
                    </View>

                    <Text>A propos</Text>
                    <Text onPress={() => this.openDescription()}>{short_description}</Text>

                    <Text>Organisateur</Text>
                    <Text>{contact_name}</Text>
                    <Text>{contact_phone}</Text>


                    {/*Event similaires*/}


                    <Button title={isFavoris ? "Supprimer des favoris" : "Ajouter aux favoris"} onPress={() => this.addOrDeleteFavoris()}/>

                    {/*{
                        isFavoris ? <Button title={"Supprimer des favoris"} onPress={() => this.deleteFavoris()}/> :
                            <Button title={"Ajouter aux favoris"} onPress={() => this.addFavoris()}/>
                    }*/}


                    {/*Bouton Link vers la réservation */}
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
