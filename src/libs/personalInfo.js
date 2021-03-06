import moment from 'moment';

export const data = (raw = {}) => {
  const {
    Status,
    //
    dateReq,
    prefixTH,
    firstNameTH,
    lastNameTH,
    prefixEN,
    firstNameEN,
    lastNameEN,
    idCard,
    dateExp,
    status,
    department,
    position,
    workTel2,
    homeTel2,
    detailRent,
    workTel,
    // workTelValid,
    telExtension,
    number,
    moo,
    village,
    soi,
    road,
    province,
    amphurCode,
    tambolCode,
    provinceName,
    amphurCodeName,
    tambolCodeName,
    zipCode,
    //
    number2,
    moo2,
    village2,
    soi2,
    road2,
    province2,
    amphurCode2,
    tambolCode2,
    province2Name,
    amphurCode2Name,
    tambolCode2Name,
    zipCode2,
    //
    isSameAddress,
    jobCompanyName,
    birthDate,
    email,
    employmentDate,
    jobSalary,
    ot,
    //
    officeNumber,
    officeMoo,
    officeVillage,
    officeFloor,
    officeSoi,
    officeRoad,
    officeProvince,
    officeAmphurCode,
    officeTambolCode,
    officeProvinceName,
    officeAmphurCodeName,
    officeTambolCodeName,
    officeZipCode,
    //
    rentalFee,
    etc,
  } = raw;

  const dateReqValid = Date.parse(dateReq);
  const dateExpValid = Date.parse(dateExp);
  const birthDateValid = Date.parse(birthDate);
  const employmentDateValid = Date.parse(employmentDate);
  const env = process.env.NODE_ENV;

  if (env === 'test') {
    return {
      dateReq: dateReqValid ? moment(dateReq).toDate() : new Date(),
      dateExp: dateExpValid ? moment(dateExp).toDate() : new Date(2020, 1, 1),
      birthDate: birthDateValid ? moment(birthDate).toDate() : new Date(1984, 5, 9),
      employmentDate: employmentDateValid ? moment(employmentDate).toDate() : new Date(2017, 1, 1),
      //
      Status,
      //
      prefixTH: prefixTH || 'นาย',
      firstNameTH: firstNameTH || 'ณัฐวุฒิ',
      lastNameTH: lastNameTH || 'ธรรมรัตน์เมธี',
      nameTH: `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim(),
      //
      prefixEN: prefixEN || 'Mr.',
      firstNameEN: firstNameEN || 'Nattawut',
      lastNameEN: lastNameEN || 'Tammaratmetee',
      //
      idCard: idCard || '1720900004217',
      status: status || 'โสด',
      //
      department: department || 'IT',
      position: position || 'Programmer',
      workTel2: workTel2 || '0627609997',
      homeTel2: homeTel2 || '020000000',
      detailRent: detailRent || '',
      workTel: workTel || '020000000',
      telExtension: telExtension || '02',
      //
      number: number || '88/46',
      moo: moo || '5',
      village: village || 'Apple Condo',
      soi: soi || 'แบริ่ง 34/2',
      road: road || 'สุขุมวิท 107',
      province: province || '00001',
      amphurCode: amphurCode || '',
      tambolCode: tambolCode || '',
      provinceName: provinceName || '',
      amphurCodeName: amphurCodeName || '',
      tambolCodeName: tambolCodeName || '',
      zipCode: zipCode || '10270',
      //
      number2: number2 || '1203',
      moo2: moo2 || '5',
      village2: village2 || 'ดอนเจดีย์',
      soi2: soi2 || '1',
      road2: road2 || '2',
      province2: province2 || '00001',
      amphurCode2: amphurCode2 || '',
      tambolCode2: tambolCode2 || '',
      province2Name: province2Name || '',
      amphurCode2Name: amphurCode2Name || '',
      tambolCode2Name: tambolCode2Name || '',
      zipCode2: zipCode2 || '72170',
      //
      isSameAddress: isSameAddress || false,
      jobCompanyName: jobCompanyName || 'Paysbuy',
      email: email || '1203ball@gmail.com',
      jobSalary: jobSalary || 100000,
      ot: ot || 1000,
      //
      officeNumber: officeNumber || '1',
      officeMoo: officeMoo || '2',
      officeVillage: officeVillage || 'CTW',
      officeFloor: officeFloor || 17,
      officeSoi: officeSoi || '3',
      officeRoad: officeRoad || 'Bangna',
      officeProvince: officeProvince || '00001',
      officeAmphurCode: officeAmphurCode || '',
      officeTambolCode: officeTambolCode || '',
      officeProvinceName: officeProvinceName || '',
      officeAmphurCodeName: officeAmphurCodeName || '',
      officeTambolCodeName: officeTambolCodeName || '',
      officeZipCode: officeZipCode || '10210',
      //
      rentalFee: rentalFee || 3000,
      etc: etc || 'จำนอง',
    };
  }
  return {
    dateReq: dateReqValid ? moment(dateReq).toDate() : null,
    dateExp: dateExpValid ? moment(dateExp).toDate() : null,
    birthDate: birthDateValid ? moment(birthDate).toDate() : null,
    employmentDate: employmentDateValid ? moment(employmentDate).toDate() : null,
    //
    Status,
    //
    prefixTH: prefixTH || '',
    firstNameTH: firstNameTH || '',
    lastNameTH: lastNameTH || '',
    nameTH: `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim(),
    //
    prefixEN: prefixEN || '',
    firstNameEN: firstNameEN || '',
    lastNameEN: lastNameEN || '',
    //
    idCard: idCard || '',
    status: status || '',
    //
    department: department || '',
    position: position || '',
    workTel2: workTel2 || '',
    homeTel2: homeTel2 || '',
    detailRent: detailRent || '',
    workTel: workTel || '',
    telExtension: telExtension || '',
    //
    number: number || '',
    moo: moo || '',
    village: village || '',
    soi: soi || '',
    road: road || '',
    province: province || '',
    amphurCode: amphurCode || '',
    tambolCode: tambolCode || '',
    provinceName: provinceName || '',
    amphurCodeName: amphurCodeName || '',
    tambolCodeName: tambolCodeName || '',
    zipCode: zipCode || '',
    //
    number2: number2 || '',
    moo2: moo2 || '',
    village2: village2 || '',
    soi2: soi2 || '',
    road2: road2 || '',
    zipCode2: zipCode2 || '',
    province2: province2 || '',
    amphurCode2: amphurCode2 || '',
    tambolCode2: tambolCode2 || '',
    province2Name: province2Name || '',
    amphurCode2Name: amphurCode2Name || '',
    tambolCode2Name: tambolCode2Name || '',
    //
    isSameAddress: isSameAddress || false,
    jobCompanyName: jobCompanyName || '',
    email: email || '',
    jobSalary: jobSalary || 0,
    ot: ot || 0,
    //
    officeNumber: officeNumber || '',
    officeMoo: officeMoo || '',
    officeVillage: officeVillage || '',
    officeFloor: officeFloor || 1,
    officeSoi: officeSoi || '',
    officeRoad: officeRoad || '',
    officeProvince: officeProvince || '',
    officeAmphurCode: officeAmphurCode || '',
    officeTambolCode: officeTambolCode || '',
    officeProvinceName: officeProvinceName || '',
    officeAmphurCodeName: officeAmphurCodeName || '',
    officeTambolCodeName: officeTambolCodeName || '',
    officeZipCode: officeZipCode || '',
    //
    rentalFee: rentalFee || 0,
    etc: etc || '',
  };
};

export default {
  data,
};
