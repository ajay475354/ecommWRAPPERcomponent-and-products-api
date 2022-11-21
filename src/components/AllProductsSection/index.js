import {Component} from 'react'
import Loder from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoder: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/products'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.products.map(product => ({
        id: product.id,
        brand: product.brand,
        imageUrl: product.image_url,
        price: product.price,
        rating: product.rating,
        titel: product.titel,
      }))
      this.setState({productsList: updatedData, isLoder: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoder} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {isLoder ? (
            <Loder type="TailSpin" color="#00bfff" height={50} width={50} />
          ) : (
            productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
