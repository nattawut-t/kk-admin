import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Document extends Component {

  componentWillMount() {
    const { id, load } = this.props;
    if (id && load) {
      load(id);
    }
  }

  componentDidMount() {
    const { documents } = this.props;
    this.setState({ documents });
  }

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

    const { documents } = this.state;

    return (
      <Table
        fixedHeader
        fixedFooter
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow style={{ width: '100%' }}>
            <TableHeaderColumn style={{ width: '20%', textAlign: 'center' }}>รหัส</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '30%', textAlign: 'center' }}>ชื่อ</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '30%', textAlign: 'center' }}>ประเภท</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%', textAlign: 'center' }}>ดู</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%', textAlign: 'center' }}>ลบ</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway
          showRowHover
          stripedRows={false}
        >
          {documents.map(({ ID, Filename, DocType }) =>
            <TableRow key={ID} style={{ width: '100%' }}>
              <TableRowColumn
                style={{ width: '20%', textAlign: 'center' }}
              >
                {ID}
              </TableRowColumn>
              <TableRowColumn
                style={{ width: '30%', textAlign: 'center' }}
              >
                {Filename}
              </TableRowColumn>
              <TableRowColumn
                style={{ width: '30%', textAlign: 'center' }}
              >
                {DocType}
              </TableRowColumn>
              <TableRowColumn
                style={{ width: '10%', textAlign: 'center' }}
              >
                <IconButton
                  tooltip="เปิด"
                  style={{ color: '#8B8C8D' }}
                  onClick={() => this.handleDocumentViewClick(ID)}
                >
                  <i className="material-icons">visibility</i>
                </IconButton>
              </TableRowColumn>
              <TableRowColumn
                style={{ width: '10%', textAlign: 'center' }}
              >
                <IconButton
                  tooltip="ลบ"
                  style={{ color: '#8B8C8D' }}
                  onClick={() => this.handleDocumentDeleteClick(ID)}
                >
                  <i className="material-icons">delete</i>
                </IconButton>
              </TableRowColumn>
            </TableRow>,
          )}
        </TableBody>
      </Table>
    );
  }
}

Document.propTypes = {
  id: PropTypes.string.isRequired,
  documents: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
};

export default Document;
