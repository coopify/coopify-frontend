
/* @flow */
import PropTypes from 'prop-types';
import { Input } from 'react-bootstrap';

const dropDown = () => {
  propTypes = {
    label: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
  };

  render() {
    const { label, field, values } = this.props;

    return (
      <Input type="select" label={label} {...field}>
        {values.map(value => <option key={value} value={value}>{value}</option>)}
      </Input>
    );
  };
}

export default DropDown;
