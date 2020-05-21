import React, { Component } from "react";
import _ from "lodash";
import { TableHeader } from "./TableHeader";
import TableRow from "./TableRow";

export class Table extends Component {
  sortedSongs() {
    const { songs, toggleFav } = this.props;

    return _.orderBy(songs, "id", "asc").map((item) => (
      <TableRow key={item.id} item={item} toggleFav={toggleFav} />
    ));
  }
  
  render() {
    return (
      <table className="table table-striped">
        <TableHeader />
        <tbody>{this.sortedSongs()}</tbody>
      </table>
    );
  }
}
