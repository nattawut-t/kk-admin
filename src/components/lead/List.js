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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import uuid from 'uuid/v1';

import FileManager from '../../containers/shared/FileManager';

const sortIcon = sortType => (sortType === 'asc')
  ? <i className="material-icons">expand_less</i>
  : <i className="material-icons">expand_more</i>;

class List extends Component {

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
    const { orderBy, orderType, handleChange, searchData } = this.props;
    const _switch = type => type === 'asc' ? 'desc' : 'asc';
    const _orderType = (orderBy !== key) ? 'asc' : _switch(orderType);

    handleChange('orderType', _orderType);
    handleChange('orderBy', key);
    searchData();
  };

  render() {
    const {
      dataList,
      tableSchemas,
      loading,
      orderBy,
      orderType,
    } = this.props;

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
                          {(orderBy === sortKey)
                            ? sortIcon(orderType)
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
              <TableHeaderColumn style={{ width: '7%', textAlign: 'center' }} />
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
                // const Status = data.get('Status');

                // console.log(id, Status);

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
                      <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                      >
                        <MenuItem
                          primaryText="เอกสาร"
                          onClick={() => this.handleDocumentClick(id)}
                          data-toggle="modal"
                          data-target="#exampleModal"
                        />
                        <MenuItem
                          primaryText="อนุมัติ / ปฏิเสธ"
                          onClick={() => this.handleViewClick(id)}
                        />
                        <MenuItem
                          primaryText="แก้ไข"
                          onClick={() => this.handleEditClick(id)}
                        />
                      </IconMenu>
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
                  <h5 className="modal-title" id="exampleModalLabel">Documents</h5>
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
  orderBy: PropTypes.string.isRequired,
  orderType: PropTypes.string.isRequired,
  searchData: PropTypes.func,
  selectData: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
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
