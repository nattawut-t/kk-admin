import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
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
import uuid from 'uuid/v1';

import FileManager from '../../containers/shared/FileManager';

const sortIcon = sortType => (sortType === 'asc')
  ? <i className="material-icons">expand_less</i>
  : <i className="material-icons">expand_more</i>;

class List extends Component {

  state = {
    keyword: '',
    sortBy: 'id',
    sortType: 'desc',
  };

  componentWillMount() {
    const { searchData } = this.props;
    if (searchData) {
      searchData();
    }
  }

  handleDocumentClick = id => {
    const { setId } = this.props;
    if (setId) {
      setId(`${id}`);
    }
  };

  handleViewClick = id => {
    const { selectData } = this.props;
    if (selectData) {
      selectData(id, () => { });
    }
  };

  handleEditClick = id => {
    const { edit, history } = this.props;
    if (edit) {
      edit(id, () => history.push('/personal-info'));
    }
  };

  handleSortClick = key => {
    const { sortBy, sortType } = this.state;
    const _switch = type => type === 'asc' ? 'desc' : 'asc';

    this.setState({
      sortType: (sortBy !== key) ? 'asc' : _switch(sortType),
      sortBy: key,
    }, () => {
      const { searchData } = this.props;
      const { keyword, sortBy, sortType } = this.state;

      console.log('handleSortClick: ', keyword, sortBy, sortType);

      searchData(keyword, sortBy, sortType);
    });
  };

  render() {
    // const { loading } = this.props;
    // if (loading) {
    //   return <div className="loader" />;
    // }

    const { dataList, tableSchemas, loading } = this.props;
    const { sortBy, sortType } = this.state;

    return (
      <div>
        <div className={loading ? 'loader' : ''} />
        <Table
          height="450px"
          fixedHeader
          fixedFooter
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: '5%', textAlign: 'center' }}>#</TableHeaderColumn>
              {tableSchemas.map(col => {
                const { id, label, sortKey } = col;
                let { widthPercentage } = col;
                widthPercentage = widthPercentage || 100;

                return (
                  <TableHeaderColumn key={id} style={{ width: `${widthPercentage}%`, textAlign: 'center' }}>
                    {sortKey
                      ? <div style={{ display: 'inline-block' }} >
                        <span>{label}</span>
                        <IconButton
                          tooltip={`Sort by ${label}`}
                          onClick={() => this.handleSortClick(sortKey)}
                        >
                          {(sortBy === sortKey)
                            ? sortIcon(sortType)
                            : <i className="material-icons">more_vert</i>
                          }
                        </IconButton>
                      </div>
                      : <div style={{ display: 'inline-block' }} >
                        <span>{label}</span>
                      </div>
                    }
                  </TableHeaderColumn>
                );
              })}
              <TableHeaderColumn style={{ width: '7%', textAlign: 'center' }}>เอกสาร</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '7%', textAlign: 'center' }}>รายละเอียด</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '7%', textAlign: 'center' }}>แก้ไข</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway
            showRowHover
            stripedRows={false}
          >
            {(dataList instanceof ImmList)
              ? dataList.map((data, index) => {
                const id = data.get('ID');
                const Status = data.get('Status');

                return (
                  <TableRow key={uuid()}>
                    <TableRowColumn style={{ width: '5%', textAlign: 'center' }}>
                      {index + 1}
                    </TableRowColumn>
                    {tableSchemas.map(col => {
                      const { id, name, icon, format } = col;
                      const value = data.get(name);
                      let { widthPercentage } = col;

                      widthPercentage = widthPercentage || 10;

                      return (
                        <TableRowColumn
                          key={id}
                          style={{ width: `${widthPercentage}%`, textAlign: 'center' }}
                        >
                          {(typeof icon === 'function')
                            ? <IconButton
                              tooltip={value}
                              style={{ color: '#8B8C8D' }}
                            >
                              <i className="material-icons">{icon(value)}</i>
                            </IconButton>
                            : <span>{(typeof format === 'function') ? format(value) : value}</span>
                          }
                        </TableRowColumn>
                      );
                    })}
                    <TableRowColumn style={{ width: '7%', textAlign: 'center' }}>
                      <IconButton
                        tooltip="เอกสาร"
                        style={{ color: '#8B8C8D' }}
                        onClick={() => this.handleDocumentClick(id)}
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <i className="material-icons">description</i>
                      </IconButton>
                    </TableRowColumn>
                    <TableRowColumn style={{ width: '7%', textAlign: 'center' }}>
                      <IconButton
                        tooltip="รายละเอียด"
                        style={{ color: '#8B8C8D' }}
                        onClick={() => this.handleViewClick(id)}
                      >
                        <i className="material-icons">format_list_bulleted</i>
                      </IconButton>
                    </TableRowColumn>
                    <TableRowColumn style={{ width: '7%', textAlign: 'center' }}>
                      {Status === 'created'
                        ? <IconButton
                          tooltip="แก้ไข"
                          style={{ color: '#8B8C8D' }}
                          onClick={() => this.handleEditClick(id)}
                        >
                          <i className="material-icons">mode_edit</i>
                        </IconButton>
                        : <div />
                      }
                    </TableRowColumn>
                  </TableRow>
                );
              })
              : <TableRow />
            }
          </TableBody>
        </Table>

        <div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" style={{ top: '50px' }} role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">เอกสาร</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <FileManager />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

List.propTypes = {
  loading: PropTypes.bool,
  dataList: PropTypes.any,
  tableSchemas: PropTypes.array,
  searchData: PropTypes.func,
  selectData: PropTypes.func,
  edit: PropTypes.func,
  setId: PropTypes.func,
  history: PropTypes.object.isRequired,
};

List.defaultProps = {
  loading: false,
  searchData: null,
  selectData: null,
  edit: null,
  setId: null,
  dataList: [],
  tableSchemas: [],
};

export default withRouter(List);
