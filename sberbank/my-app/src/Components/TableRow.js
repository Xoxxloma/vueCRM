import React, { Component } from "react";
import { connect } from "react-redux";

export class TableRow extends Component {
  render() {
    const { item, toggleFav, fav } = this.props;

    const show = fav.includes(item);
    return (
      <tr onClick={() => toggleFav(item)}>
        <th scope="row">{item.id}</th>
        <td>
          {item.band} - {item.name}{" "}
          {show && <i className="fa fa-eye float-right" title="in favorites" />}
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  fav: state.songs.fav,
});

export default connect(mapStateToProps)(TableRow);
