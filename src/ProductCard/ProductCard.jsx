export default function ProductCard({product}) {
  return (
    <>
      <div className="col-md-4">
        <div className="border border-secandary rounded-2 p-4">
          <img src={product.imageCover} alt={product.title} className="w-100"/>
          <h5>{product.category.name}</h5>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          
          <div>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star text-warning"></i>
            <i className="fa-solid fa-star-half-stroke text-warning"></i>
            <span>({product.ratingsAverage})</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>{product.price}</span>
            <i className="fa-solid fa-circle-plus fs-3 text-success"></i>
          </div>
        </div>
      </div>
    </>
  )
}