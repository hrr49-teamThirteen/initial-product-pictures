import React from 'react';

function Price({ price }) {
  return (
    <div style={{ align: 'right' }}>
      {/* ${this.priceDefined()}.00 */}
      <a> price: {Math.round(price)} </a>
    </div>
  );
}
export default Price;
