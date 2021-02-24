import React, { useEffect, useState } from "react";
import { connect } from 'umi';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface IBook {
  _id: string;
  name?: string;
  sellPrice?: Number;
  purchasedPrice?: Number;
}

interface IProps {
  BooksList: IBook[] ;
  getBooks: () => void;
  deleteBook:(arg:string)=>void;
  addBook:(args:any)=>void;
}

function BookList(props: IProps) {
  const { BooksList = [],...restProps } = props;

  const [fields, setFields]=useState({name:'', purchasedPrice:0, sellPrice:0})

  const handleBookDelete=(id:string)=>{
   props.deleteBook(id)
  }
  const handleOnChange=(e:any)=>{
    setFields({...fields,[e.target.name]:e.target.value});

  }
const handleAddOnClick=()=>{
  props.addBook(fields);
}
  useEffect(() => {
    props.getBooks();
  }, []);

  if (!props.BooksList) return null;
  return (
    <div className="container justify-content-center">
      <h2>Books</h2>

        <div className='row'>
          <div className='col-2'>
            <div>
              Name
              <input name='name' value={fields.name} onChange={handleOnChange}/>
              PurchasePrice
              <input  name='purchasedPrice' value={fields.purchasedPrice} onChange={handleOnChange}/>
              SellPrice
              <input  name='sellPrice' value={fields.sellPrice} onChange={handleOnChange}/>
              <button className='btn btn-link' onClick={handleAddOnClick}>Add New Book</button>
            </div>
          </div>
          <div className='col-10'>
            <ul className="list-group">
              {props.BooksList.map((el) => (
                <li className="list-group-item" key={el._id}>
                  {el.name} -${el.sellPrice}
                  <button className='btn btn-link' onClick={()=>handleBookDelete(el._id)}>Delete Book</button>
                </li>
              ))}
            </ul>
          </div>

      </div>


    </div>
  );
}

const mapStateToProps = (state: any) => ({
  BooksList: state.Book.booksList,
});

const mapDispatchToProps = (dispatch: any) => ({
  getBooks: () => dispatch({ type: 'Book/getBooks' }),
  deleteBook: (id:string) => dispatch({ type: 'Book/deleteById', payload: { _id:id } }),
  addBook: (book:any) => dispatch({ type: 'Book/create', payload: book}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
