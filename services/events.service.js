import Helpers from "../helpers/Helpers";
import data from "../data/data.json";

const ApartData = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=airbnb-listings&q=&lang=fr&rows=20&facet=city&facet=country&facet=property_type&facet=room_type&facet=bed_type&facet=amenities&timezone=Europe%2FParis";


class EventsService{

    /**
     * Liste des events
     *
     * @param rows
     * @returns {Promise<*>}
     */
    static async list(){
        let init = {method: "GET"};
        let call = await fetch(`${ApartData}`, init);
        let response = await call.json();
        return response.records;
    }

    static async getCheapApartment(){
        let init = {method: "GET"};

        let q = `price<100`;

        let call = await fetch(`${ApartData}&q=${q}`, init);
        let response = await call.json();
        return response.records;
    }

    static async getApartmentFor2(){
        let init = {method: "GET"};

        let q = `accomodates=2`;

        let call = await fetch(`${ApartData}&q=${q}`, init);
        let response = await call.json();
        return response.records;
    }
}

export default EventsService;
