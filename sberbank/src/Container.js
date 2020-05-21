import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "./Components/Table";
import {
  fetchData,
  setLoading,
  toggleFav,
  setError,
} from "./features/songsSlice";
import data from "./songs.json";
import { ErrorIndicator } from "./Components/ErrorIndicator";

class Container extends Component {
  
  componentDidMount() {
    this.props.setLoading();
    const fetchedData = Math.random() > 0.9 ? "Some unvalid data" : data;
    //some async stuff like axios.get(url).then(data) =>
    if (fetchedData.length === 0 || Array.isArray(fetchedData) === false) {
      this.props.setError();
    } else {
      this.props.fetchSongs(fetchedData);
    }
  }

  render() {
    const { songs, loading, toggleFav, error } = this.props;
    if (error) {
      return <ErrorIndicator />
    }
    return (
      <div className="container mt-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table songs={songs} toggleFav={toggleFav} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.songs.songs,
  loading: state.songs.loading,
  error: state.songs.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongs: (data) => dispatch(fetchData(data)),
    setLoading: () => dispatch(setLoading()),
    setError: () => dispatch(setError()),
    toggleFav: (id) => dispatch(toggleFav(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
