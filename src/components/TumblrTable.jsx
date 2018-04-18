import React from 'react'

const TumblrTable = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>TF</th>
          <th>CF</th>
          <th>UR</th>
          <th>Ref Domains</th>
          <th>Main Category</th>
          <th>Sub Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {props.cart.map((item, ind) => {
        return (
          <tr key={item._id}>
            <td className='light-gray'>{ind+1}</td>
            <td>{item.tf}</td>
            <td>{item.cf}</td>
            <td>{item.ur}</td>
            <td>{item.ref_domains}</td>
            <td>{item.category}</td>
            <td>{item.sub_category}</td>
            <td>${item.price}</td>
          </tr>
        )
      })}

        <tr className="blank-row">
          <td colSpan='8'></td>
        </tr>
        <tr className="subtotal-row">
          <td colSpan='5'></td>
          <td className='pull-right'><b>Subtotal:</b></td>
          <td>${props.subTotal}</td>
          <td></td>
        </tr>
        <tr className={isActive()}>
          <td colSpan='5'></td>
          <td className='pull-right'><b>Discount:</b></td>
          <td>
            <div className='discount-box'>
              <i className="fa fa-minus" aria-hidden="true"></i>${props.promo_discount}
            </div>
          </td>
          <td></td>
        </tr>
        <tr className='last-row'>
          <td colSpan='5'></td>
          <td className='pull-right'><b>Total:</b></td>
          <td>
          ${props.calculateTotalCost()}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
}