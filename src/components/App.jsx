import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response });
    } catch (error) {
      console.error(error);
    }
  }
  // selectBreed = option => {
  //   console.log(option.value);
  // };
  selectBreed = async option => {
    try {
      const response = await axios.get('/images/search', {
        params: { breed_id: option.value },
      });
      this.setState({ dog: response.data[0] });
    } catch (error) {
      console.error(error);
    }
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };
  render() {
    const options = this.buildSelectOptions;
    return <Select options={options} onChange={this.selectBreed} />;
  }
}
