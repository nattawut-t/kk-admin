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
  let entry = JSON.parse(Data) || {};
  const { prefixTH, firstNameTH, lastNameTH } = entry;
  const nameTH = `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim();

  entry = Object.assign({
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
    entry,
    { nameTH },
  );

  return entry;
};
