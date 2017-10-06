import { connect } from 'react-redux';
import Component from '../../components/shared/Address';
// import { isAdmin } from '../../libs/config';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = data ? data.toJS() : null;

    console.log('shippingAddress.container.data: ', data);

    if (data) {
      const {
        shippingHouseNo,
        shippingMoo,
        shippingVillage,
        shippingFloor,
        shippingSoi,
        shippingRoad,
        shippingPostalCode,
        shippingProvinceCodeName,
        shippingAmphurCodeName,
        shippingTambolCodeName,
      } = data;

      return {
        number: shippingHouseNo,
        moo: shippingMoo,
        village: shippingVillage,
        soi: shippingSoi,
        road: shippingRoad,
        floor: shippingFloor,
        provinceName: shippingProvinceCodeName,
        amphurName: shippingAmphurCodeName,
        tambolName: shippingTambolCodeName,
        zipCode: shippingPostalCode,
        useFloor: true,
      };
    }
  }
  return null;
};

const mapStateToProps = ({ lead }) => ({
  id: lead.get('id') || '',
  data: transform(lead, 'data'),
});

export default connect(
  mapStateToProps,
)(Component);
