// import moment from 'moment';
import agreement from './agreement';
import personalInfo from './personalInfo';
import loanInfo from './loanInfo';
import additionalInfo from './additionalInfo';

export const parseLeadIn = ({
  ID,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  UserID,
  Email,
  IDCard,
  MobileNo,
  BirthDate,
  TicketID,
  Status,
  ReferenceID,
  Data,
}) => {
  const data = JSON.parse(Data) || {};
  const merged = Object.assign(
    agreement.data(data),
    personalInfo.data(data),
    loanInfo.data(data),
    additionalInfo.data(data),
  );

  const _data = Object.assign({
    ID,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    UserID,
    Email,
    IDCard,
    MobileNo,
    BirthDate,
    TicketID,
    Status,
    ReferenceID,
  },
    merged,
  );

  return _data;
};

export const split = data => ({
  agreement: agreement.data(data),
  personalInfo: personalInfo.data(data),
  loanInfo: loanInfo.data(data),
  additionalInfo: additionalInfo.data(data),
});
