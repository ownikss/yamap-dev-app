import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { BLACK } from '../assets';
import { YaMap, Geocoder, Point, RouteInfo, Circle } from '../../react-native-yamap/src';

YaMap.init('');

const center = {
  lat: 55.754215,
  lon: 37.622504,
};

const KEY = '';
Geocoder.init(KEY);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface State {
  showUserPosition: boolean;
  routes: RouteInfo<any>[];
}
export default class MapWithMarkers extends React.Component {
  state: State = {
    routes: [],
    showUserPosition: true,
    key: true,
    visible: true,
  };

  start?: Point;

  end?: Point;

  map = React.createRef<YaMap>();

  findRoutes = () => {
    if (this.map.current && this.start && this.end) {
      this.map.current.findDrivingRoutes([this.start, this.end], (event) => {
        this.setState({ routes: event.nativeEvent.routes });
      });
    }
    this.setState({ visible: true });
  };

  async getCoords(addr: string) {
    try {
      return await Geocoder.addressToGeo(addr);
    } catch (e) {}
    return undefined;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <TextInput
            defaultValue='Нижний Новгород Гагарина 32'
            onChangeText={async (text) => {
              this.start = await this.getCoords(text);
            }}
            placeholder='Отправление'
          />
          <TextInput
            defaultValue='Нижний Новгород Кулибина 3'
            onChangeText={async (text) => {
              this.end = await this.getCoords(text);
            }}
            placeholder='Назначение'
          />
          <Text
            onPress={() =>
              // this.findRoutes()
              this.map.current!.setCenter({...center, zoom: 14})
              // this.setState({ showUserPosition: !this.state.showUserPosition })
            }
          >
            Найти маршруты
          </Text>
          {this.state.routes.map(i => (
            <Text key={i.id}>
              {i.id} ({i.sections.length})
            </Text>
            ))}
        </ScrollView>
        <YaMap
          ref={this.map}
          showUserPosition={false}
          style={styles.container}
          userLocationIcon={BLACK}
        >
          {!this.state.visible &&<Circle
            center={center}
            fillColor='red'
            onPress={() => this.setState({ visible: false })}
            radius={100000}
            strokeColor='green'
            strokeWidth={30}
          />}
        </YaMap>
      </View>
    );
  }
}
