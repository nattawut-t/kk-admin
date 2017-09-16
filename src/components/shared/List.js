import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List as ImmList } from 'immutable';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class List extends Component {
  static propTypes = {
    loadData: PropTypes.func,
    sortData: PropTypes.func,
    dataList: PropTypes.any,
    selectData: PropTypes.func,
    tableSchemas: PropTypes.array,
  };

  static defaultProps = {
    loadData: null,
    sortData: null,
    dataList: [],
    tableSchemas: [],
    selectData: null,
  };

  state = {
    sortField: '',
    sortDesc: true,
  };

  componentWillMount() {
    const { loadData } = this.props;
    if (loadData) {
      loadData();
    }
  }

  handleCellClick = e => {
    const { selectData } = this.props;
    if (selectData) {
      const rowIndex = Number.parseInt(e, 10);
      selectData(rowIndex);
    }
  };

  handleHeaderClick = field => {
    const { sortField, sortDesc } = this.state;
    this.setState({
      sortDesc: (sortField !== field) ? false : !sortDesc,
      sortField: field,
    }, this.sortData);
  };

  sortData = () => {
    const { sortField, sortDesc } = this.state;
    const { sortData } = this.props;
    sortData(sortField, sortDesc);
  };

  render() {
    const { dataList, tableSchemas } = this.props;
    const { sortField, sortDesc } = this.state;
    const sortDirection = sortDesc => (!sortDesc)
      ? <i className="material-icons">expand_less</i>
      : <i className="material-icons">expand_more</i>;
    return (
      <div>
        <Table
          height="450px"
          fixedHeader
          fixedFooter
          onCellClick={e => this.handleCellClick(e)}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: '20px' }}>No.</TableHeaderColumn>
              {tableSchemas.map(col => {
                const { id, name, label } = col;
                let { width } = col;
                width = width || 100;
                return (
                  <TableHeaderColumn key={id} style={{ width: `${width}px` }}>
                    <div
                      style={{ display: 'inline-block' }}
                    >
                      <span>{label}</span>
                      <IconButton
                        tooltip={`Sort by ${label}`}
                        onClick={() => this.handleHeaderClick(name)}
                      >
                        {(sortField === name)
                          ? sortDirection(sortDesc)
                          : <i className="material-icons">more_vert</i>
                        }
                      </IconButton>
                    </div>
                  </TableHeaderColumn>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(dataList instanceof ImmList)
              ? dataList.map((data, index) => {
                const id = data.get('id');
                return (
                  <TableRow key={id}>
                    <TableRowColumn style={{ width: '20px' }}>
                      {index + 1}
                    </TableRowColumn>
                    {tableSchemas.map(col => {
                      const { id, name } = col;
                      let { width } = col;
                      width = width || 100;
                      return (
                        <TableRowColumn key={id} style={{ width: `${width}px` }} >
                          {data.get(name)}
                        </TableRowColumn>
                      );
                    })}
                  </TableRow>
                );
              })
              : <TableRow />
            }
          </TableBody>
        </Table>
      </div >
    );
  }
}

export default List;
