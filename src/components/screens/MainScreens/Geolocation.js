import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const App = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('Moscow');

    const encodedAddress = encodeURIComponent(address);
    fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=18e0ef3c-65f2-4193-8487-cbf9451dd7a2&format=json&geocode=${encodedAddress}`)

    useEffect(() => {
        fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=18e0ef3c-65f2-4193-8487-cbf9451dd7a2&format=json&geocode=${address}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.response.GeoObjectCollection.featureMember[0]);
                // const location = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                // setLocation({latitude: location[1], longitude: location[0]});
            })
            .catch(error => console.log(error));
    }, [address]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {location ? <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text> : <Text>Locating...</Text>}
        </View>
    );
};

export default App;
