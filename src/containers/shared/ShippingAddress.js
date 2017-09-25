import { connect } from 'react-redux';
import Component from '../../components/shared/Address';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = data ? data.toJS() : null;

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

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id') || '',
  data: transform(admin, 'data'),
});

export default connect(
  mapStateToProps,
)(Component);
