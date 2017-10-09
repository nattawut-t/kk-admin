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

import FileManager from '../../containers/shared/FileManager';

class List extends Component {

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

  handleDocumentClick = id => {
    const { loadDocuments } = this.props;
    if (loadDocuments) {
      loadDocuments(id);
    }
  };

  handleViewClick = id => {
    const { selectData } = this.props;
    // console.log('handleViewClick: ', id, selectData);
    if (selectData) {
      selectData(id, () => { });
    }
  };

  handleEditClick = id => {
    const { edit, history } = this.props;
    // console.log('handleViewClick: ', id, selectData);
    if (edit) {
      edit(id, () => history.push('/personal-info'));
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
    // const { sortField, sortDesc } = this.state;
    // const sortDirection = sortDesc => (!sortDesc)
    //   ? <i className="material-icons">expand_less</i>
    //   : <i className="material-icons">expand_more</i>;

    return (
      <div>
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
                const { id, label } = col;
                let { widthPercentage } = col;
                widthPercentage = widthPercentage || 100;
                return (
                  <TableHeaderColumn key={id} style={{ width: `${widthPercentage}%`, textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }} >
                      <span>{label}</span>
                    </div>
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

                return (
                  <TableRow key={id}>
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
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => this.handleDocumentClick(id)}
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
                      <IconButton
                        tooltip="แก้ไข"
                        style={{ color: '#8B8C8D' }}
                        onClick={() => this.handleEditClick(id)}
                      >
                        <i className="material-icons">mode_edit</i>
                      </IconButton>
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
  loadData: PropTypes.func,
  sortData: PropTypes.func,
  dataList: PropTypes.any,
  selectData: PropTypes.func,
  edit: PropTypes.func,
  loadDocuments: PropTypes.func,
  tableSchemas: PropTypes.array,
  history: PropTypes.object.isRequired,
};

List.defaultProps = {
  loadData: null,
  sortData: null,
  dataList: [],
  tableSchemas: [],
  selectData: null,
  edit: null,
  loadDocuments: null,
};

export default withRouter(List);
