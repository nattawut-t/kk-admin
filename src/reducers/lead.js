import Immutable, { Record } from 'immutable';
import moment from 'moment';
import {
  ACCEPT_AGREEMENT_SUCCESS,
  COMPLETE_PERSONAL_INFO_SUCCESS,
  COMPLETE_LOAN_INFO_SUCCESS,
  COMPLETE_ADDITIONAL_INFO_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  NOTIFY,
  LOAD_NEXT_PAGE_SUCCESS,
  SEARCH_SUCCESS,
  SET_LOADING,
  //
  acceptAgreementSuccess,
  completePersonalInfoSuccess,
  completeLoanInfoSuccess,
  completeAdditionalInfoSuccess,
  uploadDocumentSuccess,
  notify,
  //
  setLoading,
  cancelSelection,
  loadNextPageSuccess,
  searchSuccess,
  setSearchInfo,
  editSuccess,
  saveSuccess,
  loadDocumentsSuccess,
  selectDataSuccess,
  //
  EDIT_SUCCESS,
  SAVE_SUCCESS,
  LOAD_DOCUMENTS_SUCCESS,
  SELECT_DATA_SUCCESS,
  CANCEL_SELECTION,
} from '../actions/lead';
import {
  portalUrl,
  // adminUrl,
  postForm,
  postJson,
  putJson,
  getJson,
} from '../libs/request';
import {
  pageSize,
  loadingTime,
  // dateFormat,
  isAdmin,
} from '../libs/config';
import { parseLeadIn as parseIn, split } from '../libs/lead';
import { parseLeadsIn } from '../libs/leads';
import personalInfo from '../libs/personalInfo';
import loanInfo from '../libs/loanInfo';
import additionalInfo from '../libs/additionalInfo';

// const { NODE_ENV } = process.env;
// let personalInfo;
// let loanInfo;
// let additionalInfo;

// if (NODE_ENV === 'test') {
//   personalInfo = {
//     dateReq: new Date(),
//     prefixTH: 'นางสาว',
//     firstNameTH: 'ณัฐ',
//     firstNameTHmsg: '',
//     lastNameTH: 'ธรรม',
//     lastNameTHmsg: '',
//     prefixEN: 'Mr.',
//     firstNameEN: 'Natt',
//     firstNameENmsg: '',
//     lastNameEN: 'Tamm',
//     lastNameENmsg: '',
//     idCard: '1720900004217',
//     idCardmsg: '',
//     idCardValid: true,
//     dateExp: new Date(2010, 1, 1),
//     dateExpmsg: '',
//     status: 'โสด',
//     department: 'IT',
//     departmentmsg: '',
//     position: 'SE',
//     positionmsg: '',
//     workTel2: '0627609997',
//     workTel2Valid: false,
//     workTel2msg: '',
//     homeTel2: '0350001111',
//     homeTel2msg: '',
//     homeTel2Valid: false,
//     detailRent: 'ของตนเอง',
//     workTel: '020001111',
//     workTelmsg: '',
//     workTelValid: false,
//     telExtension: '02',
//     number: '88/46',
//     moo: '5',
//     village: 'Apple Condo',
//     soi: 'Bearing 34/2',
//     road: 'Sukhumvit 107',
//     province: '00001',
//     amphurCode: '00036',
//     tambolCode: '',
//     provinceName: '',
//     amphurCodeName: '',
//     tambolCodeName: '',
//     zipCode: '10270',
//     number2: '',
//     moo2: '',
//     village2: '',
//     soi2: '',
//     road2: '',
//     province2: '',
//     amphurCode2: '',
//     tambolCode2: '',
//     province2Name: '',
//     amphurCode2Name: '',
//     tambolCode2Name: '',
//     zipCode2: '',
//     isSameAddress: false,
//     jobCompanyName: 'Paysbuy',
//     jobCompanyNamemsg: '',
//     valid: false,
//     rentalFee: '',
//     etc: '',
//     birthDate: new Date(1984, 5, 9),
//     birthDatemsg: '',
//     email: 'x@y.com',
//     emailmsg: '',
//     employmentDate: new Date(2017, 1, 1),
//     employmentDatemsg: '',
//     jobSalary: 100000,
//     jobSalarymsg: '',
//     //
//     officeNumber: '1203',
//     officeMoo: '5',
//     officeVillage: 'กัญญาเฮาส์',
//     officeSoi: '4',
//     officeRoad: 'รัชดาภิเษก',
//     officeProvince: '',
//     officeAmphurCode: '',
//     officeTambolCode: '',
//     officeProvinceName: '',
//     officeAmphurCodeName: '',
//     officeTambolCodeName: '',
//     officeZipCode: '72170',
//     //
//   };

//   loanInfo = {
//     loanAmount: 100000,
//     loanAmountMsg: '',
//     installmentNumber: '12',
//     installmentNumberMsg: '',
//     beneficiary: 'others',
//     loanBeneficiaryName: 'Panit',
//     loanBeneficiaryNameMsg: '',
//     accumulateDebt: 10000,
//     accumulateDebtMsg: '',
//     creditCardTotal: 10000,
//     creditCardTotalMsg: '',
//     paymentHistoryExists: '1',
//     pLoanApplicationHositoryExists: '0',
//     overdueDebtExists: '1',
//     bankAccountNo: '',
//     bankAccountNoMsg: '',
//     bankAccountName: '',
//     bankAccountNameMsg: '',
//     bankCode: '',
//     bankCodeMsg: '',
//     bankName: '',
//     bankBranchName: '',
//     valid: false,
//   };

//   additionalInfo = {
//     ref1Prefix: 'MR',
//     ref1PrefixMsg: '',
//     ref1Firstname: 'Panit',
//     ref1FirstnameMsg: '',
//     ref1Lastname: 'Tamm',
//     ref1LastnameMsg: '',
//     ref1Relationship: 'คู่สมรส',
//     ref1Mobile: '0627609997',
//     ref1MobileMsg: '',
//     ref1WorkTelephone: '021112222',
//     ref1WorkTelephoneMsg: '',
//     ref1HomeTelephone: '020001111',
//     ref1HomeTelephoneMsg: '',
//     ref2Prefix: 'MRS',
//     ref2PrefixMsg: '',
//     ref2Firstname: 'Jira',
//     ref2FirstnameMsg: '',
//     ref2Lastname: 'Tamm',
//     ref2LastnameMsg: '',
//     ref2Relationship: 'พี่น้อง',
//     ref2Mobile: '0840001111',
//     ref2MobileMsg: '',
//     ref2WorkTelephone: '021112222',
//     ref2WorkTelephoneMsg: '',
//     ref2HomeTelephone: '022223333',
//     ref2HomeTelephoneMsg: '',
//     conjugalPrefix: '',
//     conjugalPrefixMsg: '',
//     conjugalFirstname: '',
//     conjugalFirstnameMsg: '',
//     conjugalLastname: '',
//     conjugalLastnameMsg: '',
//     conjugalOccupation: '',
//     conjugalOccupationMsg: '',
//     conjugalIncome: '',
//     conjugalIncomeMsg: '',
//     children: '',
//     childrenMsg: '',
//     isConsent2: false,
//     shippingHouseNo: '',
//     shippingMoo: '',
//     shippingVillage: '',
//     shippingFloor: '',
//     shippingSoi: '',
//     shippingRoad: '',
//     shippingPostalCode: '',
//     shippingProvinceCode: '',
//     shippingAmphurCode: '',
//     shippingTambolCode: '',
//     shippingProvinceCodeName: '',
//     shippingAmphurCodeName: '',
//     shippingTambolCodeName: '',
//     //
//     files: [],
//     // not to send
//     fileName0: '',
//     fileName1: '',
//     filename2: '',
//     fileName3: '',
//     fileName4: '',
//     filename5: '',
//     fileName6: '',
//     //
//     identity: null,
//     account: null,
//     household_registration: null,
//     payslip: null,
//     statement_1: null,
//     statement_2: null,
//     statement_3: null,
//     //
//     shippingAddress: 'current',
//     valid: false,
//     // not to send
//   };
// } else {
//   personalInfo = {
//     dateReq: new Date(),
//   };

//   loanInfo = {
//     loanAmount: 0,
//     loanAmountMsg: '',
//     installmentNumber: 0,
//     installmentNumberMsg: '',
//     beneficiary: 'myself',
//     loanBeneficiaryName: '',
//     loanBeneficiaryNameMsg: '',
//     accumulateDebt: 0,
//     accumulateDebtMsg: '',
//     creditCardTotal: 0,
//     creditCardTotalMsg: '',
//     paymentHistoryExists: '0',
//     pLoanApplicationHositoryExists: '0',
//     overdueDebtExists: '0',
//     bankAccountNo: '',
//     bankAccountNoMsg: '',
//     bankAccountName: '',
//     bankAccountNameMsg: '',
//     bankCode: '',
//     bankCodeMsg: '',
//     bankName: '',
//     bankBranchName: '',
//     valid: false,
//   };

//   additionalInfo = {
//     ref1Prefix: '',
//     ref1PrefixMsg: '',
//     ref1Firstname: '',
//     ref1FirstnameMsg: '',
//     ref1Lastname: '',
//     ref1LastnameMsg: '',
//     ref1Relationship: '',
//     ref1Mobile: '',
//     ref1MobileMsg: '',
//     ref1WorkTelephone: '',
//     ref1WorkTelephoneMsg: '',
//     ref1HomeTelephone: '',
//     ref1HomeTelephoneMsg: '',
//     ref2Prefix: '',
//     ref2PrefixMsg: '',
//     ref2Firstname: '',
//     ref2FirstnameMsg: '',
//     ref2Lastname: '',
//     ref2LastnameMsg: '',
//     ref2Relationship: '',
//     ref2Mobile: '',
//     ref2MobileMsg: '',
//     ref2WorkTelephone: '',
//     ref2WorkTelephoneMsg: '',
//     ref2HomeTelephone: '',
//     ref2HomeTelephoneMsg: '',
//     conjugalPrefix: '',
//     conjugalPrefixMsg: '',
//     conjugalFirstname: '',
//     conjugalFirstnameMsg: '',
//     conjugalLastname: '',
//     conjugalLastnameMsg: '',
//     conjugalOccupation: '',
//     conjugalOccupationMsg: '',
//     conjugalIncome: '',
//     conjugalIncomeMsg: '',
//     children: '',
//     childrenMsg: '',
//     isConsent2: false,
//     shippingHouseNo: '',
//     shippingMoo: '',
//     shippingVillage: '',
//     shippingFloor: '',
//     shippingSoi: '',
//     shippingRoad: '',
//     shippingPostalCode: '',
//     shippingProvinceCode: '',
//     shippingAmphurCode: '',
//     shippingTambolCode: '',
//     shippingProvinceCodeName: '',
//     shippingAmphurCodeName: '',
//     shippingTambolCodeName: '',
//     //
//     files: [],
//     // not to send
//     fileName0: '',
//     fileName1: '',
//     filename2: '',
//     fileName3: '',
//     fileName4: '',
//     filename5: '',
//     fileName6: '',
//     //
//     identity: null,
//     account: null,
//     household_registration: null,
//     payslip: null,
//     statement_1: null,
//     statement_2: null,
//     statement_3: null,
//     //
//     shippingAddress: 'current',
//     valid: false,
//     // not to send
//   };
// }

const State = Record({
  id: 0,
  isConsent: false,
  //
  personalInfo: personalInfo.data(),
  loanInfo: loanInfo.data(),
  additionalInfo: additionalInfo.data(),
  //
  lead: null,
  data: null,
  notify: false,
  message: '',
  loading: false,
  identity: {},
  account: {},
  statement_1: {},
  statement_2: {},
  statement_3: {},
  //
  dataList: [],
  total: 0,
  pages: 0,
  page: 0,
  //
  documents: [],
  //
  editing: false,
});
const initialState = new State();
// const endpoint = '/admin/leads';
const searchUrl = (page = 1) => portalUrl(`/api/work/leads?page=${page}`);
const uploadUrl = () => portalUrl('/api/work/leads/doc');
const saveUrl = () => portalUrl('/api/work/leads');
const saveAdminUrl = id => portalUrl(`/admin/leads/${id}`);

function _loadNextPage(currentPage = 1, nextPage = 2) {
  console.log('>>> _loadNextPage: ', nextPage);

  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const state = getState().admin;
    const total = state.get('total') || 0;

    if ((currentPage * pageSize) < total) {
      // const _endpoint = searchUrl();
      const url = searchUrl(nextPage);
      const promise = getJson(url);

      console.log('>>> url: ', url);

      setTimeout(() =>
        promise.then(response => {
          const { data } = response;

          console.log('>>> data: ', data);
          const dataList = data ? parseLeadsIn(data) : [];

          dispatch(loadNextPageSuccess(dataList, 0, 0, 0));
          return dispatch(setLoading(false));
        })
          .catch(error => {
            console.log('>>> error: ', error);
            dispatch(setLoading(false));
          })
        , loadingTime);
    }

    dispatch(setLoading(false));
  };
}

function _searchData(page = 1) {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(cancelSelection());

    const url = searchUrl(page);
    const promise = getJson(url);

    console.log(url);

    setTimeout(() =>
      promise.then(response => {
        const { data } = response;
        const dataList = data ? parseLeadsIn(data) : [];

        console.log('data: ', data, dataList);

        dispatch(searchSuccess(dataList, 0, 0, 0));
        return dispatch(setLoading(false));
      })
        .catch(error => {
          console.log('>>> searchData.error: ', error);
          dispatch(setLoading(false));
        })
      , loadingTime);
  };
}

export function searchData(keyword) {
  return dispatch => {
    dispatch(setSearchInfo(keyword));
    return dispatch(_searchData());
  };
}

export function loadNextPage() {
  return (dispatch, getState) => {
    const state = getState().lead;
    const loading = state.get('loading');

    if (!loading) {
      const page = state.get('page') || 1;
      return dispatch(_loadNextPage(page, page + 1));
    }

    return dispatch(setLoading(false));
  };
}

export function save(callback) {
  return (dispatch, getState) => {
    const _state = getState().lead;

    const id = _state.get('id') || 0;
    const editing = _state.get('editing') || false;
    const personalInfo = _state.get('personalInfo').toJS();
    const loanInfo = _state.get('loanInfo').toJS();
    const additionalInfo = _state.get('additionalInfo').toJS();

    const data = Object.assign(personalInfo, loanInfo, additionalInfo);

    const _dateReq = moment(data.dateReq, 'DD/MM/YYYY').toDate();
    data.dateReq = moment(_dateReq).format();
    data.birthDate = moment(data.birthDate).format();
    data.dateExp = moment(data.dateExp).format();
    data.employmentDate = moment(data.employmentDate).format();

    let url = saveUrl();
    let request = postJson;

    if (editing) {
      url = saveAdminUrl(id);
      request = putJson;
    }

    // console.log('data: ', url, request, data);

    request(url, data)
      .then(() => {
        // const { data } = response;

        dispatch(notify('บันทึกข้อมูลเสร็จสมบูรณ์'));
        dispatch(saveSuccess());

        setTimeout(() => {
          dispatch(notify(''));

          if (callback) {
            callback();
          }
        }, loadingTime);
      })
      .catch(error => {
        console.log('>>> save.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), loadingTime);
      });
  };
}

export function saveDraft(callback) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));

    const _state = getState().lead;

    let personalInfo = _state.get('personalInfo') || {};
    let loanInfo = _state.get('loanInfo') || {};
    let additionalInfo = _state.get('additionalInfo') || {};

    console.log('saveDraft.ai: ', additionalInfo);

    if (personalInfo && typeof personalInfo.toJS === 'function') {
      personalInfo = personalInfo.toJS();
    }

    if (loanInfo && typeof loanInfo.toJS === 'function') {
      loanInfo = loanInfo.toJS();
    }

    if (additionalInfo && typeof additionalInfo.toJS === 'function') {
      additionalInfo = additionalInfo.toJS();
    }

    const data = Object.assign(personalInfo, loanInfo, additionalInfo);
    const url = saveUrl();

    console.log('saveDraft.data: ', data);

    putJson(url, data)
      .then(response => {
        console.log('>>> saveDraft.response: ', response);

        dispatch(notify('บันทึกข้อมูลแบบร่างแล้ว'));
        setTimeout(() => {
          dispatch(notify(''));

          if (callback) {
            callback();
          }

          dispatch(setLoading(false));
        }, loadingTime);
      })
      .catch(error => {
        console.log('>>> saveDraft.error: ', error);
        setTimeout(() => {
          dispatch(notify(''));
          dispatch(setLoading(false));
        }, loadingTime);
      });
  };
}

export function getDraft(callback) {
  console.log('getDraft');

  return dispatch => {
    const url = saveUrl();

    putJson(url, {})
      .then(response => {
        const { data: { data } } = response;
        const draft = data ? JSON.parse(data) : {};

        const _personalInfo = personalInfo.data(draft);
        const _loanInfo = loanInfo.data(draft);
        const _additionalInfo = additionalInfo.data(draft);

        console.log('getDraft.data: ', _personalInfo, _loanInfo, _additionalInfo);

        dispatch(editSuccess('', _personalInfo, _loanInfo, _additionalInfo));

        if (callback) {
          callback();
        }

        dispatch(notify('โหลดข้อมูลแบบร่างแล้ว'));
        setTimeout(() => dispatch(notify('')), loadingTime);
      })
      .catch(error => {
        console.log('>>> getDraft.error: ', error);
        setTimeout(() => dispatch(notify('')), loadingTime);
      });
  };
}

export function acceptAgreement(isConsent = false) {
  return dispatch => dispatch(acceptAgreementSuccess(isConsent));
}

export function savePersonalInfo(data, callback) {
  return dispatch => {
    dispatch(completePersonalInfoSuccess(data));

    if (!isAdmin()) {
      return dispatch(saveDraft(callback));
    }

    return callback();
  };
}

export function saveLoanInfo(data, callback) {
  return dispatch => {
    dispatch(completeLoanInfoSuccess(data));

    if (!isAdmin()) {
      return dispatch(saveDraft(callback));
    }

    return callback();
  };
}

export function saveAdditionalInfo(data, callback) {
  console.log('reducer.lead.completeAdditionalInfo');
  return dispatch => {
    dispatch(completeAdditionalInfoSuccess(data));

    console.log(1);
    if (!isAdmin()) {
      console.log(2);
      return dispatch(saveDraft(callback));
    }

    return callback();
  };
}

export function uploadDocument(field, path, name, data, docType, callback) {
  return dispatch => {
    const _url = uploadUrl();

    postForm(_url, data, false)
      .then(response => {
        const { data } = response;
        const { id, filename } = data;

        // {
        //   filename: "Free Fall Desktop Wallpapers - HD Wallpapers.jpg"
        //   id: 1087
        //   docType,
        //   path,
        // }

        console.log(data, path);

        dispatch(uploadDocumentSuccess(field, path, filename, docType));

        if (callback) {
          callback({
            id,
            filename,
            docType,
            path,
          });
        }

        dispatch(notify('อัพโหลดเอกสารแล้ว'));
        setTimeout(() => dispatch(notify('')), loadingTime);
      })
      .catch(error => {
        console.log('>>> uploadFile.error: ', error);
        dispatch(notify('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        setTimeout(() => dispatch(notify('')), loadingTime);
      });
  };
}

export function edit(id, callback) {
  return dispatch => {
    dispatch(setLoading(true));

    const url = portalUrl(`/admin/leads/${id}`);
    const promise = getJson(url);

    setTimeout(() =>
      promise.then(response => {
        const { data } = response;
        const lead = parseIn(data);
        const { personalInfo, loanInfo, additionalInfo } = split(lead);

        dispatch(editSuccess(id, personalInfo, loanInfo, additionalInfo));

        if (callback) {
          callback();
        }

        dispatch(setLoading(false));
      })
        .catch(error => {
          console.log('>>> edit.error: ', error);
          dispatch(setLoading(false));
        })
      , loadingTime);
  };
}

export function loadDocuments(id, callback) {
  return dispatch => {
    dispatch(setLoading(true));

    const url = portalUrl(`/admin/leads/${id}/media`);

    getJson(url)
      .then(response => {
        const { data } = response;

        dispatch(loadDocumentsSuccess(data));
        if (callback) {
          callback();
        }
        setTimeout(() => dispatch(setLoading(false)), loadingTime);
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(setLoading(false));
      });
  };
}

export function loadDocument(id, callback) {
  return dispatch => {
    dispatch(setLoading(true));

    const url = portalUrl(`/admin/media/${id}`);
    console.log('url: ', url);

    getJson(url)
      .then(response => {
        const { data } = response;

        console.log('document: ', data);

        // const contentType = headers['x-content-type'];
        // const mediaSrc = window.URL.createObjectURL(new Blob([data], { type: contentType }));

        // dispatch(loadDocumentSuccess(data));
        if (callback) {
          callback({});
        }
        // setTimeout(() => dispatch(setLoading(false)), loadingTime);
        dispatch(setLoading(false));
      })
      .catch(error => {
        console.log('>>> edit.error: ', error);
        dispatch(setLoading(false));
      });
  };
}

export function selectData(rowIndex) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));

    const state = getState().lead;
    const oldId = state.get('id');
    const dataList = state.get('dataList') || [];

    if (dataList) {
      const data = dataList.get(rowIndex);

      if (data) {
        const newId = `${data.get('ID') || ''}`;

        if (newId !== oldId) {
          const _endpoint = `/api/work/leads/${newId}`;
          const url = portalUrl(_endpoint);
          const promise = getJson(url);

          setTimeout(() =>
            promise.then(response => {
              const { data } = response;

              const {
                ID,
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
                birthDate,
                status,
                //
                jobCompanyName,
                department,
                position,
                employmentDate,
                jobSalary,
                workTel,
                telExtension,
                officeNumber,
                officeMoo,
                officeVillage,
                officeSoi,
                officeRoad,
                officeProvinceName,
                officeAmphurCodeName,
                officeTambolCodeName,
                officeZipCode,
                //
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
                workTel2,
                homeTel2,
                email,
                detailRent,
                //
                loanAmount,
                installmentNumber,
                beneficiary,
                loanBeneficiaryName,
                accumulateDebt,
                creditCardTotal,
                paymentHistoryExists,
                pLoanApplicationHositoryExists,
                overdueDebtExists,
                bankAccountNo,
                bankAccountName,
                bankCode,
                bankName,
                bankBranchName,
                //
                ref1Prefix,
                ref1Firstname,
                ref1Lastname,
                ref1Relationship,
                ref1Mobile,
                ref1WorkTelephone,
                ref1HomeTelephone,
                //
                ref2Prefix,
                ref2Firstname,
                ref2Lastname,
                ref2Relationship,
                ref2Mobile,
                ref2WorkTelephone,
                ref2HomeTelephone,
                //
                shippingHouseNo,
                shippingMoo,
                shippingVillage,
                shippingFloor,
                shippingSoi,
                shippingRoad,
                shippingProvinceCodeName,
                shippingAmphurCodeName,
                shippingTambolCodeName,
                shippingPostalCode,
                //
                fileName0,
                fileName1,
                fileName2,
                fileName3,
                fileName4,
                fileName5,
                fileName6,
              } = parseIn(data);

              const entry = {
                id: ID,
                status: Status,
                //
                dateReq: dateReq ? moment(dateReq).toDate() : null,
                nameTH: `${prefixTH || ''} ${firstNameTH || ''} ${lastNameTH || ''}`.trim(),
                nameEN: `${prefixEN || ''} ${firstNameEN || ''} ${lastNameEN || ''}`.trim(),
                idcardNo: idCard,
                idcardExpiry: dateExp ? moment(dateExp).toDate() : null,
                birthDate: birthDate ? moment(birthDate).toDate() : null,
                maritalStatus: status,
                //
                companyName: jobCompanyName,
                department,
                position,
                employmentDate: employmentDate ? moment(employmentDate).toDate() : null,
                salary: jobSalary,
                //
                officeTel: workTel,
                officeTelExt: telExtension,
                officeNumber,
                officeMoo,
                officeVillage,
                officeSoi,
                officeRoad,
                officeProvinceName,
                officeAmphurCodeName,
                officeTambolCodeName,
                officeZipCode,
                //
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
                workTel2,
                homeTel2,
                email,
                detailRent,
                //
                loanAmount,
                installmentNumber,
                beneficiary: (beneficiary === 'others') ? loanBeneficiaryName : beneficiary,
                loanBeneficiaryName,
                accumulateDebt,
                creditCardTotal,
                paymentHistoryExists,
                pLoanApplicationHositoryExists,
                overdueDebtExists,
                bankAccountNo,
                bankAccountName,
                bankCode,
                bankName,
                bankBranchName,
                //
                ref1Prefix,
                ref1Firstname,
                ref1Lastname,
                ref1Relationship,
                ref1Mobile,
                ref1WorkTelephone,
                ref1HomeTelephone,
                //
                ref2Prefix,
                ref2Firstname,
                ref2Lastname,
                ref2Relationship,
                ref2Mobile,
                ref2WorkTelephone,
                ref2HomeTelephone,
                //
                shippingHouseNo,
                shippingMoo,
                shippingVillage,
                shippingFloor,
                shippingSoi,
                shippingRoad,
                shippingProvinceCodeName,
                shippingAmphurCodeName,
                shippingTambolCodeName,
                shippingPostalCode,
                //
                fileName0,
                fileName1,
                fileName2,
                fileName3,
                fileName4,
                fileName5,
                fileName6,
              };

              console.log('entry: ', entry);

              dispatch(selectDataSuccess(`${ID}`, entry));
              return dispatch(setLoading(false));
            })
              .catch(error => {
                console.log('>>> selectData.error: ', error);
                dispatch(setLoading(false));
              })
            , loadingTime);
        } else {
          dispatch(cancelSelection());
        }
      }
    }
  };
}

const lead = (state = initialState, action) => {
  let _state;
  let personalInfo;
  let loanInfo;
  let additionalInfo;
  let data;
  let documents;
  // let lead;

  switch (action.type) {
    case CANCEL_SELECTION:

      _state = Immutable.fromJS({
        id: '',
        data: null,
      });
      return state.merge(_state);

    case SELECT_DATA_SUCCESS:

      _state = Immutable.fromJS({
        id: action.id,
        data: action.data,
      });
      return state.merge(_state);

    case LOAD_DOCUMENTS_SUCCESS:

      _state = Immutable.fromJS({
        documents: action.documents,
      });
      console.log('LOAD_DOCUMENTS_SUCCESS', action.documents);
      return state.merge(_state);

    case SAVE_SUCCESS:

      _state = Immutable.fromJS({
        editing: false,
        isConsent: false,
        id: 0,
        personalInfo: null,
        loanInfo: null,
        additionalInfo: null,
      });
      console.log('SAVE_SUCCESS', _state);
      return state.merge(_state);

    case EDIT_SUCCESS:

      _state = Immutable.fromJS({
        editing: true,
        isConsent: true,
        id: action.id,
        personalInfo: action.personalInfo,
        loanInfo: action.loanInfo,
        additionalInfo: action.additionalInfo,
      });
      console.log('EDIT_SUCCESS', action.personalInfo, action.loanInfo, action.additionalInfo);
      return state.merge(_state);

    case SEARCH_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        pages: action.pages,
        page: action.page,
        dataList: [
          ...action.dataList,
        ],
      });
      console.log('SEARCH_SUCCESS: ', action);
      return state.merge(_state);

    case LOAD_NEXT_PAGE_SUCCESS:

      _state = Immutable.fromJS({
        total: action.total,
        pages: action.pages,
        page: action.page,
        dataList: [
          ...state.dataList,
          ...action.dataList,
        ],
      });
      return state.merge(_state);

    case ACCEPT_AGREEMENT_SUCCESS:

      _state = Immutable.fromJS({
        isConsent: action.isConsent,
      });
      return state.merge(_state);

    case COMPLETE_PERSONAL_INFO_SUCCESS:

      _state = Immutable.fromJS({
        personalInfo: action.data,
      });
      return state.merge(_state);

    case COMPLETE_LOAN_INFO_SUCCESS:

      _state = Immutable.fromJS({
        loanInfo: action.data,
      });
      return state.merge(_state);

    case COMPLETE_ADDITIONAL_INFO_SUCCESS:

      personalInfo = state.get('personalInfo').toJS();
      loanInfo = state.get('loanInfo').toJS();
      additionalInfo = action.data;
      data = Object.assign(personalInfo, loanInfo, additionalInfo);

      console.log('COMPLETE_ADDITIONAL_INFO_SUCCESS: ', action.data);

      _state = Immutable.fromJS({
        additionalInfo,
        data,
      });

      return state.merge(_state);

    case UPLOAD_DOCUMENT_SUCCESS:

      documents = state.get('documents');
      documents = Object.assign(documents, {
        [action.docType]: {
          field: action.field,
          path: action.path,
          name: action.name,
        },
      });
      _state = Immutable.fromJS({ documents });

      return state.merge(_state);

    case NOTIFY:
      _state = Immutable.fromJS({
        // notify: action.notify,
        message: action.message,
      });

      return state.merge(_state);

    case SET_LOADING:
      _state = Immutable.fromJS({
        loading: action.loading,
      });
      return state.merge(_state);

    default:
      return state;
  }
};

export default lead;
